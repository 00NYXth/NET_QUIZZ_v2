/* ════════════════════════════════════════════════════════════
   NetQuiz – script.js  (Cookie-auth edition)
   ════════════════════════════════════════════════════════════ */

const LETTERS  = ['A', 'B', 'C', 'D', 'E'];
const EXAM_QS  = 43;
const EXAM_MAX = 1000;
const EXAM_PASS = 700;

/* ════════════════════════════════════════════════════════════
   PARTICLE SYSTEM
   ════════════════════════════════════════════════════════════ */
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;
  const particles = [];
  const COUNT = 60, MAX_DIST = 130;

  function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
  resize();
  addEventListener('resize', resize);

  class Particle {
    constructor() {
      this.x  = Math.random() * W; this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r  = Math.random() * 1.8 + 0.5;
      this.a  = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(124,92,252,${this.a})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  (function animate() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < MAX_DIST) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,212,255,${(1-d/MAX_DIST)*0.08})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  })();
})();

/* ════════════════════════════════════════════════════════════
   IN-MEMORY AUTH STATE  (no localStorage)
   ════════════════════════════════════════════════════════════ */
let AUTH = { email: null, role: null, status: null, name: null };
let ALL_QUESTIONS = [];   // populated from /api/questions after subject selection
let SELECTED_SUBJECT = null; // { _id, name, questionsCount }

/* ── Quiz state ─────────────────────────────────────────────── */
const S = {
  mode: 20, questions: [], current: 0, score: 0, ptsPerQ: 0,
  selected: new Set(), answered: false,
  stats: { correct: 0, wrong: 0, total: 0 },
  history: []
};

/* ── Helpers ────────────────────────────────────────────────── */
const $ = id => document.getElementById(id);
const qs = sel => document.querySelector(sel);

function shuffle(a) {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderQuestionHTML(text) {
  return text.replace(/__([^_]+)__/g, (_, w) => `<span class="underline-word">${escH(w)}</span>`);
}

function escH(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function isPractice() { return S.mode !== 'exam'; }

/* ── Fetch wrapper — always sends cookies ────────────────────── */
function api(url, opts = {}) {
  return fetch(url, {
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', ...opts.headers },
    ...opts
  });
}

/* ════════════════════════════════════════════════════════════
   PAGE LOAD — verify session via /api/auth/me
   ════════════════════════════════════════════════════════════ */
async function initApp() {
  try {
    const res = await api('/api/auth/me');
    if (!res.ok) {
      showScreen('screen-auth');
      return;
    }
    const user = await res.json();
    AUTH = { email: user.email, role: user.role, status: user.status, name: user.name || '' };

    if (user.status === 'pending') {
      $('pending-email-badge').textContent = user.email;
      showScreen('screen-pending');
      return;
    }

    if (user.status === 'rejected') {
      showAuthMsg('Cererea ta de acces a fost respinsă.', 'error');
      showScreen('screen-auth');
      return;
    }

    // Approved — show home
    updateUserBar();
    await loadSubjects();
    showScreen('screen-home');
  } catch (err) {
    showScreen('screen-auth');
  }
}

initApp();

/* ════════════════════════════════════════════════════════════
   USER BAR
   ════════════════════════════════════════════════════════════ */
function updateUserBar() {
  if (AUTH.email) {
    $('user-email-display').textContent = AUTH.name || AUTH.email;
    $('user-avatar').textContent = (AUTH.name || AUTH.email).charAt(0).toUpperCase();
  }
  const adminBtn = $('btn-admin-panel');
  if (adminBtn) adminBtn.style.display = AUTH.role === 'admin' ? 'inline-flex' : 'none';
}

/* ════════════════════════════════════════════════════════════
   AUTH HELPERS
   ════════════════════════════════════════════════════════════ */
function setAuthLoading(btnEl, loading) {
  const label   = btnEl.querySelector('.btn-label');
  const spinner = btnEl.querySelector('.btn-spinner');
  const arrow   = btnEl.querySelector('.btn-arrow');
  if (label)   label.style.display   = loading ? 'none'        : 'inline';
  if (spinner) spinner.style.display = loading ? 'inline-flex' : 'none';
  if (arrow)   arrow.style.display   = loading ? 'none'        : 'inline';
  btnEl.disabled = loading;
}

function showAuthMsg(text, type = 'error') {
  const el = $('auth-msg');
  el.textContent = text;
  el.className = 'auth-msg auth-msg--' + type;
  el.style.display = 'block';
}

function hideAuthMsg() { $('auth-msg').style.display = 'none'; }

/* ════════════════════════════════════════════════════════════
   PASSWORD TOGGLES
   ════════════════════════════════════════════════════════════ */
function setupPasswordToggle(toggleId, inputId) {
  const toggle = $(toggleId), input = $(inputId);
  if (!toggle || !input) return;
  toggle.addEventListener('click', () => {
    const isP = input.type === 'password';
    input.type = isP ? 'text' : 'password';
    toggle.querySelector('.eye-open').style.display  = isP ? 'none' : 'block';
    toggle.querySelector('.eye-closed').style.display = isP ? 'block' : 'none';
  });
}
setupPasswordToggle('pw-toggle-1', 'auth-password');
setupPasswordToggle('pw-toggle-2', 'auth-confirm-password');

/* ════════════════════════════════════════════════════════════
   AUTH SCREEN — tab switching
   ════════════════════════════════════════════════════════════ */
function switchTab(tab) {
  const isLogin = tab === 'login';
  $('tab-login').classList.toggle('active', isLogin);
  $('tab-register').classList.toggle('active', !isLogin);
  const ind = $('tab-indicator');
  if (ind) ind.classList.toggle('right', !isLogin);

  $('btn-login').style.display    = isLogin ? 'flex' : 'none';
  $('btn-register').style.display = isLogin ? 'none' : 'flex';

  const confirmGrp = $('confirm-pw-group');
  const nameGrp    = $('name-group');
  if (confirmGrp) confirmGrp.style.display = isLogin ? 'none' : 'block';
  if (nameGrp)    nameGrp.style.display    = isLogin ? 'none' : 'block';

  $('auth-password').autocomplete = isLogin ? 'current-password' : 'new-password';
  $('auth-subtitle-text').textContent = isLogin ? 'Platformă de pregătire examene IT' : 'Înregistrare cont nou';
  $('auth-footer-text').textContent   = isLogin ? 'Acces restricționat · Aprobare necesară' : 'Cererea va fi analizată de admin';
  hideAuthMsg();
}

$('tab-login').addEventListener('click', () => switchTab('login'));
$('tab-register').addEventListener('click', () => switchTab('register'));

/* ── Login ───────────────────────────────────────────────────── */
async function doLogin(email, password) {
  const btn = $('btn-login');
  setAuthLoading(btn, true);
  hideAuthMsg();

  try {
    const res  = await api('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (!res.ok) {
      if (data.status === 'pending') {
        AUTH = { email, role: 'user', status: 'pending', name: '' };
        $('pending-email-badge').textContent = email;
        showScreen('screen-pending');
        return;
      }
      showAuthMsg(data.error || 'Login eșuat. Verifică datele.');
      return;
    }

    AUTH = { email: data.email, role: data.role, status: data.status, name: data.name || '' };
    updateUserBar();
    await loadSubjects();
    showScreen('screen-home');
  } catch {
    showAuthMsg('Eroare de rețea. Încearcă din nou.');
  } finally {
    setAuthLoading(btn, false);
  }
}

/* ── Register ────────────────────────────────────────────────── */
async function doRegister(email, password, name) {
  const btn = $('btn-register');
  setAuthLoading(btn, true);
  hideAuthMsg();

  try {
    const res  = await api('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name })
    });
    const data = await res.json();

    if (!res.ok) {
      showAuthMsg(data.error || 'Înregistrare eșuată.');
      return;
    }

    // Show pending screen immediately after register
    AUTH = { email, role: 'user', status: 'pending', name };
    $('pending-email-badge').textContent = email;
    showScreen('screen-pending');
  } catch {
    showAuthMsg('Eroare de rețea. Încearcă din nou.');
  } finally {
    setAuthLoading(btn, false);
  }
}

/* ── Logout ─────────────────────────────────────────────────── */
async function logout() {
  try {
    await api('/api/auth/logout', { method: 'POST' });
  } catch {}
  AUTH = { email: null, role: null, status: null, name: null };
  ALL_QUESTIONS = [];
  SELECTED_SUBJECT = null;
  showScreen('screen-auth');
  switchTab('login');
}

/* ── Button listeners ────────────────────────────────────────── */
$('btn-login').addEventListener('click', () => {
  const email = $('auth-email').value.trim();
  const pw    = $('auth-password').value;
  if (!email || !pw) { showAuthMsg('Completează emailul și parola.'); return; }
  doLogin(email, pw);
});

$('btn-register').addEventListener('click', () => {
  const email   = $('auth-email').value.trim();
  const pw      = $('auth-password').value;
  const confirm = $('auth-confirm-password').value;
  const name    = $('auth-name') ? $('auth-name').value.trim() : '';
  if (!email || !pw) { showAuthMsg('Completează emailul și parola.'); return; }
  if (pw.length < 6) { showAuthMsg('Parola trebuie să aibă cel puțin 6 caractere.'); return; }
  if (pw !== confirm) { showAuthMsg('Parolele nu coincid.'); return; }
  doRegister(email, pw, name);
});

document.querySelectorAll('.auth-input').forEach(input => {
  input.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const isLogin = $('tab-login').classList.contains('active');
    isLogin ? $('btn-login').click() : $('btn-register').click();
  });
});

$('btn-logout').addEventListener('click', logout);
$('btn-pending-logout').addEventListener('click', logout);

/* ════════════════════════════════════════════════════════════
   SUBJECTS — load & render
   ════════════════════════════════════════════════════════════ */
let _subjects = [];

async function loadSubjects() {
  const cardsEl = $('subject-cards');
  if (!cardsEl) return;
  cardsEl.innerHTML = `<div class="subject-loading"><svg class="spinner-svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="32" stroke-linecap="round"/></svg><span>Se încarcă subiectele…</span></div>`;

  try {
    const res = await api('/api/subjects');
    if (!res.ok) throw new Error('Failed');
    const data = await res.json();
    _subjects = data.subjects || [];
    renderSubjectCards(_subjects);
  } catch {
    cardsEl.innerHTML = `<p style="color:var(--muted);text-align:center;padding:1rem">Nu s-au putut încărca subiectele.</p>`;
  }
}

function renderSubjectCards(subjects) {
  const cardsEl = $('subject-cards');
  if (!subjects.length) {
    cardsEl.innerHTML = `<p style="color:var(--muted);text-align:center;padding:1rem">Nu există subiecte disponibile momentan.</p>`;
    return;
  }
  cardsEl.innerHTML = subjects.map(s => `
    <div class="subject-card" data-id="${escH(s._id)}" onclick="selectSubject('${escH(s._id)}')">
      <div class="subject-icon">${escH(s.icon || '📚')}</div>
      <div class="subject-info">
        <strong class="subject-name">${escH(s.name)}</strong>
        <span class="subject-count">${s.questionsCount || 0} întrebări</span>
      </div>
      <svg class="subject-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
    </div>
  `).join('');
}

async function selectSubject(subjectId) {
  const subject = _subjects.find(s => s._id === subjectId || String(s._id) === subjectId);
  if (!subject) return;

  // Show loading on card
  document.querySelectorAll('.subject-card').forEach(c => c.classList.remove('selected-subject'));
  const card = document.querySelector(`.subject-card[data-id="${subjectId}"]`);
  if (card) card.classList.add('selected-subject');

  try {
    const res  = await api(`/api/questions?subjectId=${subjectId}`);
    if (!res.ok) { alert('Nu s-au putut încărca întrebările.'); return; }
    const data = await res.json();

    SELECTED_SUBJECT = subject;
    ALL_QUESTIONS    = data.questions || [];

    $('mode-all-count').textContent = `Toate (${ALL_QUESTIONS.length})`;
    $('home-sub-text').textContent  = `${escH(subject.icon || '📚')} ${escH(subject.name)}`;

    // Transition to mode selection
    $('home-step-subject').style.display = 'none';
    $('home-step-mode').style.display    = 'block';

    // Reset mode selection
    document.querySelectorAll('.mode-card').forEach(c => c.classList.remove('selected'));
    const defaultCard = document.querySelector('.mode-card[data-mode="20"]');
    if (defaultCard) defaultCard.classList.add('selected');
    S.mode = 20;
  } catch {
    alert('Eroare la încărcarea întrebărilor.');
  }
}

const _btnChangeSubject = $('btn-change-subject');
if (_btnChangeSubject) {
  _btnChangeSubject.addEventListener('click', () => {
    SELECTED_SUBJECT = null;
    ALL_QUESTIONS    = [];
    $('home-step-mode').style.display    = 'none';
    $('home-step-subject').style.display = 'block';
    $('home-sub-text').textContent       = 'Selectează un subiect pentru a începe';
    document.querySelectorAll('.subject-card').forEach(c => c.classList.remove('selected-subject'));
  });
}

/* Mode card selection */
document.querySelectorAll('.mode-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.mode-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    const v = card.dataset.mode;
    S.mode = (v === 'all' || v === 'exam') ? v : parseInt(v);
  });
});

$('btn-start').addEventListener('click', startQuiz);
$('btn-browse').addEventListener('click', openBrowse);

/* ════════════════════════════════════════════════════════════
   QUIZ ENGINE
   ════════════════════════════════════════════════════════════ */
function startQuiz() {
  if (!AUTH.email) { showScreen('screen-auth'); return; }
  if (!ALL_QUESTIONS.length) {
    alert('Te rugăm să selectezi mai întâi un subiect.');
    return;
  }

  const shuffled = shuffle(ALL_QUESTIONS);

  if (S.mode === 'exam') {
    S.questions = shuffled.slice(0, EXAM_QS);
    S.ptsPerQ   = Math.floor(EXAM_MAX / EXAM_QS);
  } else if (S.mode === 'all') {
    S.questions = shuffled;
    S.ptsPerQ   = 0;
  } else {
    S.questions = shuffled.slice(0, S.mode);
    S.ptsPerQ   = 0;
  }

  S.current = 0; S.score = 0;
  S.selected = new Set(); S.answered = false;
  S.stats = { correct: 0, wrong: 0, total: S.questions.length };
  S.history = S.questions.map(() => ({ selected: [], answered: false, wasCorrect: false }));

  $('q-total').textContent    = S.questions.length;
  $('score-live').textContent = '0';
  $('score-label').textContent = S.mode === 'exam' ? 'Puncte' : 'Scor';

  if (S.mode === 'exam') {
    $('exam-pts-info').style.display = 'block';
    $('pts-per-q').textContent = S.ptsPerQ;
  } else {
    $('exam-pts-info').style.display = 'none';
  }

  showScreen('screen-quiz');
  renderQuestion();
}

/* ── Render question ─────────────────────────────────────────── */
function renderQuestion() {
  const q       = S.questions[S.current];
  const hist    = S.history[S.current];
  const isReplay = hist.answered;

  if (isReplay) { S.selected = new Set(hist.selected); S.answered = true; }
  else          { S.selected = new Set(); S.answered = false; }

  $('q-current').textContent = S.current + 1;
  $('progress-fill').style.width = (S.current / S.questions.length * 100) + '%';
  $('multi-hint').style.display  = q.multiple ? 'inline-flex' : 'none';

  const card = $('question-card');
  card.style.animation = 'none'; void card.offsetWidth; card.style.animation = '';
  $('question-text').innerHTML = renderQuestionHTML(q.question);

  const list = $('options-list');
  list.style.animation = 'none'; void list.offsetWidth; list.style.animation = '';
  list.innerHTML = '';

  const correctSet = new Set(q.correct);

  q.options.forEach((opt, idx) => {
    const btn   = document.createElement('button');
    btn.className   = 'opt-btn';
    btn.dataset.idx = idx;
    const lspan = document.createElement('span'); lspan.className = 'opt-letter'; lspan.textContent = LETTERS[idx];
    const tspan = document.createElement('span'); tspan.textContent = opt;
    btn.appendChild(lspan); btn.appendChild(tspan);

    if (isReplay) {
      btn.disabled = true;
      const sel = S.selected.has(idx), corr = correctSet.has(idx);
      if (sel && corr)   btn.classList.add('correct');
      else if (sel && !corr) btn.classList.add('wrong');
      else if (!sel && corr) btn.classList.add('missed');
    } else {
      btn.addEventListener('click', () => onOption(idx, btn));
    }
    list.appendChild(btn);
  });

  if (isReplay) {
    const box = $('feedback-box'), inner = $('feedback-inner');
    box.style.display = 'block';
    if (hist.wasCorrect) {
      inner.className   = 'feedback-inner ok'; inner.textContent = 'Corect! ✓';
    } else {
      inner.className   = 'feedback-inner bad';
      const labels = q.correct.map(i => `${LETTERS[i]}. ${q.options[i]}`).join('   |   ');
      inner.textContent = `✗  Incorect.   Răspuns corect: ${labels}`;
    }
  } else {
    $('feedback-box').style.display = 'none';
  }

  if (isReplay) {
    $('btn-submit').style.display = 'none';
    $('btn-next').style.display   = 'inline-flex';
    const atEnd = S.current >= S.questions.length - 1 && allAnswered();
    $('btn-next').querySelector('.btn-label').textContent = atEnd ? 'Vezi Rezultate' : 'Următoarea';
  } else {
    if (q.multiple) {
      $('btn-submit').style.display   = 'inline-block';
      $('btn-submit').disabled        = true;
      $('btn-next').style.display     = 'none';
    } else {
      $('btn-submit').style.display = 'none';
      $('btn-next').style.display   = 'none';
    }
  }
  updatePrevButton();
}

function allAnswered() { return S.history.every(h => h.answered); }

function updatePrevButton() {
  const prev = $('btn-prev');
  if (!prev) return;
  prev.style.display = (isPractice() && S.current > 0) ? 'inline-flex' : 'none';
}

/* ── Option click ────────────────────────────────────────────── */
function onOption(idx, btn) {
  if (S.answered) return;
  const q = S.questions[S.current];
  if (q.multiple) {
    if (S.selected.has(idx)) { S.selected.delete(idx); btn.classList.remove('selected'); }
    else                      { S.selected.add(idx);    btn.classList.add('selected'); }
    $('btn-submit').disabled = S.selected.size === 0;
  } else {
    S.selected = new Set([idx]);
    reveal();
  }
}

$('btn-submit').addEventListener('click', () => { if (S.selected.size) reveal(); });
$('btn-next').addEventListener('click', advance);
$('btn-prev').addEventListener('click', goBack);

function advance() {
  S.current++;
  if (S.current >= S.questions.length) {
    if (allAnswered()) { showResult(); return; }
    for (let i = 0; i < S.questions.length; i++) {
      if (!S.history[i].answered) { S.current = i; break; }
    }
  }
  renderQuestion();
}

function goBack() { if (S.current > 0) { S.current--; renderQuestion(); } }

/* ── Reveal ──────────────────────────────────────────────────── */
function reveal() {
  S.answered = true;
  const q          = S.questions[S.current];
  const correctSet = new Set(q.correct);
  const selSet     = S.selected;

  const btns = $('options-list').querySelectorAll('.opt-btn');
  btns.forEach(b => { b.disabled = true; });

  let ok;
  if (q.multiple) {
    ok = correctSet.size === selSet.size && [...correctSet].every(i => selSet.has(i));
  } else {
    ok = correctSet.has([...selSet][0]);
  }

  btns.forEach((btn, idx) => {
    const sel = selSet.has(idx), corr = correctSet.has(idx);
    btn.classList.remove('selected');
    if (sel && corr)   btn.classList.add('correct');
    else if (sel && !corr) btn.classList.add('wrong');
    else if (!sel && corr) btn.classList.add('missed');
  });

  if (!S.history[S.current].answered) {
    S.history[S.current] = { selected: [...selSet], answered: true, wasCorrect: ok };
    if (ok) { S.stats.correct++; S.score += (S.mode === 'exam') ? S.ptsPerQ : 1; }
    else    { S.stats.wrong++; }
    $('score-live').textContent = S.score;
  }

  const box = $('feedback-box'), inner = $('feedback-inner');
  box.style.display = 'block';
  if (ok) {
    inner.className   = 'feedback-inner ok';
    const praise = ['Corect! ✓', 'Bravo! ✓', 'Exact! ✓', 'Perfect! ✓', 'Bine! ✓'];
    inner.textContent = praise[Math.floor(Math.random() * praise.length)];
  } else {
    inner.className   = 'feedback-inner bad';
    const labels = q.correct.map(i => `${LETTERS[i]}. ${q.options[i]}`).join('   |   ');
    inner.textContent = `✗  Incorect.   Răspuns corect: ${labels}`;
  }

  $('btn-submit').style.display = 'none';
  $('btn-next').style.display   = 'inline-flex';
  const atEnd = S.current >= S.questions.length - 1 && allAnswered();
  $('btn-next').querySelector('.btn-label').textContent = atEnd ? 'Vezi Rezultate' : 'Următoarea';
  updatePrevButton();
}

/* ── Back from quiz ──────────────────────────────────────────── */
$('btn-back-quiz').addEventListener('click', () => {
  if (S.current > 0 || S.answered) {
    if (!confirm('Ieși din quiz? Progresul va fi pierdut.')) return;
  }
  showScreen('screen-home');
});

/* ════════════════════════════════════════════════════════════
   RESULT SCREEN
   ════════════════════════════════════════════════════════════ */
function showResult() {
  const { correct, wrong, total } = S.stats;
  const isExam = S.mode === 'exam';
  const pct    = Math.round(correct / total * 100);
  const arcPct = isExam ? Math.round(S.score / EXAM_MAX * 100) : pct;

  const arc = $('ring-arc');
  arc.style.strokeDashoffset = '427';
  setTimeout(() => { arc.style.strokeDashoffset = 427 - (427 * arcPct / 100); }, 100);

  $('save-status').style.display = 'none';

  if (isExam) {
    const passed = S.score >= EXAM_PASS;
    arc.className = 'ring-arc ' + (passed ? 'pass' : 'fail');
    $('ring-pct').textContent = S.score + ' pts';
    $('ring-sub').textContent = `/ ${EXAM_MAX}`;
    const pf = $('pass-fail');
    pf.style.display = 'block';
    pf.className     = 'pass-fail ' + (passed ? 'pass' : 'fail');
    pf.textContent   = passed ? '✓  TRECUT' : '✗  PICAT  (trebuie 700 pts)';
    $('result-title').textContent  = passed ? 'Examen Trecut! 🎓' : 'Examen Picat 📚';
    $('result-detail').textContent = `${correct} din ${total} corecte  ·  ${S.score} / ${EXAM_MAX} pts`;
  } else {
    arc.className = 'ring-arc';
    $('ring-pct').textContent = pct + '%';
    $('ring-sub').textContent = '';
    $('pass-fail').style.display = 'none';
    let title;
    if (pct >= 90) title = 'Excelent! 🏆';
    else if (pct >= 75) title = 'Foarte bine! 🎉';
    else if (pct >= 60) title = 'Bine! 👍';
    else if (pct >= 50) title = 'Continuă să studiezi 📖';
    else title = 'Mai mult exercițiu 💪';
    $('result-title').textContent  = title;
    $('result-detail').textContent = `${correct} din ${total} corecte`;
  }

  $('result-grid').innerHTML = `
    <div class="rg-item"><div class="rg-num g">${correct}</div><div class="rg-lbl">Corecte</div></div>
    <div class="rg-item"><div class="rg-num r">${wrong}</div><div class="rg-lbl">Greșite</div></div>
    <div class="rg-item"><div class="rg-num b">${total}</div><div class="rg-lbl">Total</div></div>
  `;

  $('progress-fill').style.width = '100%';
  showScreen('screen-result');

  if (AUTH.email) {
    saveScore({
      score: S.score, correct: S.stats.correct, total: S.stats.total,
      mode: S.mode,
      subjectId: SELECTED_SUBJECT?._id,
      subjectName: SELECTED_SUBJECT?.name
    });
  }
}

async function saveScore(payload) {
  const statusEl = $('save-status');
  statusEl.textContent = '⏳ Se salvează rezultatul…';
  statusEl.className   = 'save-status';
  statusEl.style.display = 'block';

  try {
    const res = await api('/api/saveScore', { method: 'POST', body: JSON.stringify(payload) });
    if (res.status === 401 || res.status === 403) {
      statusEl.textContent = '⚠️ Sesiune expirată. Te-ai deconectat.';
      statusEl.className   = 'save-status save-status--error';
      setTimeout(logout, 2000);
      return;
    }
    if (!res.ok) {
      statusEl.textContent = '⚠️ Scorul nu a putut fi salvat.';
      statusEl.className   = 'save-status save-status--error';
      return;
    }
    statusEl.textContent = '✓ Rezultat salvat!';
    statusEl.className   = 'save-status save-status--ok';
  } catch {
    statusEl.textContent = '⚠️ Nu s-a putut contacta serverul.';
    statusEl.className   = 'save-status save-status--error';
  }
}

$('btn-restart').addEventListener('click', startQuiz);
$('btn-home-result').addEventListener('click', () => showScreen('screen-home'));

/* ════════════════════════════════════════════════════════════
   BROWSE SCREEN
   ════════════════════════════════════════════════════════════ */
function openBrowse() {
  if (!ALL_QUESTIONS.length) {
    alert('Te rugăm să selectezi mai întâi un subiect.');
    return;
  }
  $('browse-search').value = '';
  renderBrowse(ALL_QUESTIONS);
  $('browse-count').textContent = `(${ALL_QUESTIONS.length})`;
  showScreen('screen-browse');
}

function renderBrowse(list) {
  const container = $('browse-list');
  container.innerHTML = '';
  if (!list.length) {
    container.innerHTML = '<p style="color:var(--muted);text-align:center;padding:48px 0">Nicio întrebare găsită.</p>';
    return;
  }
  list.forEach((q, qi) => {
    const card = document.createElement('div');
    card.className = 'bc';
    const multiTag = q.multiple ? '<span class="bc-multi">MULTI</span>' : '';
    const optsHtml = q.options.map((opt, i) => {
      const corr = q.correct.includes(i);
      return `<div class="bc-opt${corr ? ' cor' : ''}">
        <span class="bc-opt-ltr">${LETTERS[i]}</span>
        <span>${escH(opt)}</span>
        ${corr ? '<span class="bc-check">✓</span>' : ''}
      </div>`;
    }).join('');
    card.innerHTML = `
      <div class="bc-num">Q${qi + 1}${multiTag}</div>
      <div class="bc-q">${renderQuestionHTML(q.question)}</div>
      <div class="bc-opts">${optsHtml}</div>
    `;
    container.appendChild(card);
  });
}

$('browse-search').addEventListener('input', e => {
  const term = e.target.value.toLowerCase().trim();
  const list = term
    ? ALL_QUESTIONS.filter(q => q.question.toLowerCase().includes(term) || q.options.some(o => o.toLowerCase().includes(term)))
    : ALL_QUESTIONS;
  renderBrowse(list);
  $('browse-count').textContent = term ? `(${list.length} din ${ALL_QUESTIONS.length})` : `(${ALL_QUESTIONS.length})`;
});

$('btn-back-browse').addEventListener('click', () => showScreen('screen-home'));

/* ════════════════════════════════════════════════════════════
   DASHBOARD
   ════════════════════════════════════════════════════════════ */
async function openDashboard() {
  showScreen('screen-dashboard');
  await Promise.all([loadProfile(), loadDashboardScores()]);
}

async function loadProfile() {
  try {
    const res = await api('/api/auth/me');
    if (!res.ok) return;
    const user = await res.json();
    $('profile-email').value = user.email || '';
    $('profile-name').value  = user.name  || '';
  } catch {}
}

async function loadDashboardScores() {
  const histEl = $('dash-history');
  histEl.innerHTML = '<p class="dash-empty">Se încarcă…</p>';
  try {
    const res = await api('/api/scores');
    if (!res.ok) { histEl.innerHTML = '<p class="dash-empty">Nu s-au putut încărca scorurile.</p>'; return; }
    const { scores } = await res.json();
    if (!scores.length) {
      histEl.innerHTML = '<p class="dash-empty">Nicio sesiune încă. Începe un quiz!</p>';
      ['ds-total','ds-best','ds-avg','ds-exams'].forEach(id => { $(id).textContent = 0; });
      return;
    }
    const exams  = scores.filter(s => s.mode === 'exam');
    const allPct = scores.map(s => Math.round(s.correct / s.total * 100));
    const avg    = Math.round(allPct.reduce((a,b) => a+b, 0) / allPct.length);
    const best   = Math.max(...allPct);
    $('ds-total').textContent  = scores.length;
    $('ds-best').textContent   = best + '%';
    $('ds-avg').textContent    = avg + '%';
    $('ds-exams').textContent  = exams.length;
    histEl.innerHTML = renderScoreRows(scores);
  } catch {
    histEl.innerHTML = '<p class="dash-empty">Eroare la încărcare.</p>';
  }
}

function renderScoreRows(scores) {
  return `<table class="score-table">
    <thead><tr><th>Data</th><th>Mod</th><th>Subiect</th><th>Corect</th><th>Rezultat</th></tr></thead>
    <tbody>
      ${scores.map(s => {
        const d   = new Date(s.createdAt).toLocaleDateString('ro-RO', { day:'2-digit', month:'short', year:'numeric' });
        const pct = Math.round(s.correct / s.total * 100);
        const lbl = s.mode === 'exam' ? '🎓 Exam' : s.mode === 'all' ? '📚 Full' : `✏️ ${s.mode}Q`;
        const result = s.mode === 'exam'
          ? (s.score >= 700 ? `<span class="badge badge-pass">PASS ${s.score}pts</span>` : `<span class="badge badge-fail">FAIL ${s.score}pts</span>`)
          : `<span class="badge ${pct>=70?'badge-pass':'badge-fail'}">${pct}%</span>`;
        return `<tr>
          <td>${d}</td><td>${lbl}</td>
          <td>${escH(s.subjectName || '—')}</td>
          <td>${s.correct}/${s.total}</td>
          <td>${result}</td>
        </tr>`;
      }).join('')}
    </tbody>
  </table>`;
}

async function saveProfile() {
  const btn          = $('btn-save-profile');
  const msgEl        = $('profile-msg');
  const newEmail     = $('profile-email').value.trim();
  const displayName  = $('profile-name').value.trim();
  const currentPw    = $('profile-cur-pw').value;
  const newPw        = $('profile-new-pw').value;

  msgEl.style.display = 'none';
  const label   = btn.querySelector('.btn-label');
  const spinner = btn.querySelector('.btn-spinner');
  label.style.display   = 'none';
  spinner.style.display = 'inline-flex';
  btn.disabled = true;

  try {
    const body = { newEmail, displayName };
    if (newPw) { body.currentPassword = currentPw; body.newPassword = newPw; }

    // Reuse existing profile endpoint if available, else skip
    const res  = await api('/api/profile', {
      method: 'PATCH',
      body: JSON.stringify(body)
    });
    const data = await res.json();

    if (!res.ok) {
      msgEl.textContent = data.error;
      msgEl.className   = 'auth-msg auth-msg--error';
      msgEl.style.display = 'block';
      return;
    }

    if (data.email && data.email !== AUTH.email) { AUTH.email = data.email; }
    AUTH.name = displayName;
    updateUserBar();

    msgEl.textContent = '✓ ' + (data.message || 'Salvat!');
    msgEl.className   = 'auth-msg auth-msg--success';
    msgEl.style.display = 'block';
    $('profile-cur-pw').value = '';
    $('profile-new-pw').value = '';
  } catch {
    msgEl.textContent = 'Eroare de rețea. Încearcă din nou.';
    msgEl.className   = 'auth-msg auth-msg--error';
    msgEl.style.display = 'block';
  } finally {
    label.style.display   = 'inline';
    spinner.style.display = 'none';
    btn.disabled = false;
  }
}

/* ════════════════════════════════════════════════════════════
   ADMIN PANEL
   ════════════════════════════════════════════════════════════ */
let _adminUsers    = [];
let _adminSubjects = [];
let _activeAdminTab = 'users';

function switchAdminTab(tab) {
  _activeAdminTab = tab;
  ['users','subjects','questions'].forEach(t => {
    $(`atab-${t}`).classList.toggle('active', t === tab);
    $(`admin-panel-${t}`).style.display = t === tab ? 'block' : 'none';
  });
}

async function openAdminPanel() {
  if (AUTH.role !== 'admin') return;
  showScreen('screen-admin');
  switchAdminTab('users');
  await loadAdminUsers();
}

/* ── Users tab ───────────────────────────────────────────────── */
async function loadAdminUsers() {
  const listEl  = $('admin-user-list');
  const countEl = $('admin-user-count');
  listEl.innerHTML = '<p class="dash-empty">Se încarcă utilizatorii…</p>';

  try {
    const res  = await api('/api/admin/users');
    if (!res.ok) { listEl.innerHTML = '<p class="dash-empty">Nu s-au putut încărca utilizatorii.</p>'; return; }
    const data = await res.json();
    _adminUsers = data.users || [];
    countEl.textContent = _adminUsers.length + ' utilizatori';
    renderAdminUsers(_adminUsers);
  } catch {
    listEl.innerHTML = '<p class="dash-empty">Eroare de rețea.</p>';
  }
}

function statusBadge(status) {
  const map = { pending: '⏳ Pending', approved: '✅ Aprobat', rejected: '❌ Respins' };
  const cls = { pending: 'badge-pending', approved: 'badge-approved', rejected: 'badge-rejected' };
  return `<span class="user-status-badge ${cls[status] || ''}">${map[status] || status}</span>`;
}

function renderAdminUsers(users) {
  const listEl = $('admin-user-list');
  if (!users.length) { listEl.innerHTML = '<p class="dash-empty">Niciun utilizator găsit.</p>'; return; }

  listEl.innerHTML = users.map(u => `
    <div class="glass-card dash-card admin-user-row" onclick="openAdminModal('${escH(u._id)}')">
      <div class="admin-user-info">
        <div class="user-avatar" style="width:32px;height:32px;font-size:.85rem">${(u.name || u.email || '?').charAt(0).toUpperCase()}</div>
        <div>
          <strong>${escH(u.name || u.email)}</strong>
          <div class="admin-user-meta">${escH(u.email)} &nbsp;·&nbsp; ${u.role === 'admin' ? '🛡 Admin' : '👤 User'} &nbsp;·&nbsp; ${u.scoreCount || 0} sesiuni</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:.5rem">
        ${statusBadge(u.status || 'approved')}
        ${u.status === 'pending' ? `
          <button class="btn-approve" onclick="event.stopPropagation();quickApprove('${escH(u._id)}','approved')">✅</button>
          <button class="btn-reject"  onclick="event.stopPropagation();quickApprove('${escH(u._id)}','rejected')">❌</button>
        ` : ''}
      </div>
    </div>
  `).join('');
}

async function quickApprove(userId, status) {
  try {
    await api('/api/admin/users', {
      method: 'PATCH',
      body: JSON.stringify({ userId, status })
    });
    await loadAdminUsers();
  } catch { alert('Eroare la actualizare.'); }
}

function filterAdminUsers() {
  const term     = $('admin-search').value.toLowerCase().trim();
  const filtered = term
    ? _adminUsers.filter(u => (u.email||'').toLowerCase().includes(term) || (u.name||'').toLowerCase().includes(term))
    : _adminUsers;
  $('admin-user-count').textContent = filtered.length + ' utilizatori';
  renderAdminUsers(filtered);
}

function openAdminModal(userId) {
  const user = _adminUsers.find(u => u._id === userId);
  if (!user) return;
  $('modal-user-id').value = userId;
  $('modal-name').value    = user.name  || '';
  $('modal-email').value   = user.email || '';
  $('modal-password').value = '';
  $('modal-status').value  = user.status || 'approved';
  $('modal-role').value    = user.role   || 'user';
  $('admin-modal-msg').style.display = 'none';
  $('modal-scores-list').innerHTML   = '<p class="dash-empty">Se încarcă…</p>';
  $('admin-modal-overlay').style.display = 'flex';
  loadUserScores(userId);
}

async function loadUserScores(userId) {
  try {
    const res = await api(`/api/admin/users?userId=${userId}&action=scores`);
    if (!res.ok) { $('modal-scores-list').innerHTML = '<p class="dash-empty">Nu s-au putut încărca.</p>'; return; }
    const { scores } = await res.json();
    if (!scores || !scores.length) { $('modal-scores-list').innerHTML = '<p class="dash-empty">Nicio sesiune.</p>'; return; }
    $('modal-scores-list').innerHTML = renderScoreRows(scores);
  } catch { $('modal-scores-list').innerHTML = '<p class="dash-empty">Eroare.</p>'; }
}

function closeAdminModal(e) {
  if (!e || e.target === $('admin-modal-overlay')) {
    $('admin-modal-overlay').style.display = 'none';
  }
}

async function submitAdminEdit() {
  const userId   = $('modal-user-id').value;
  const name     = $('modal-name').value.trim();
  const email    = $('modal-email').value.trim();
  const password = $('modal-password').value;
  const status   = $('modal-status').value;
  const role     = $('modal-role').value;
  const msgEl    = $('admin-modal-msg');
  const spinner  = $('modal-spinner');

  msgEl.style.display    = 'none';
  spinner.style.display  = 'inline-flex';

  try {
    const body = { userId, displayName: name, newEmail: email, status, role };
    if (password) body.newPassword = password;

    const res  = await api('/api/admin/users', { method: 'PATCH', body: JSON.stringify(body) });
    const data = await res.json();

    if (!res.ok) {
      msgEl.textContent = data.error || 'Eroare la salvare.';
      msgEl.className   = 'auth-msg auth-msg--error';
      msgEl.style.display = 'block';
      return;
    }
    msgEl.textContent = '✓ Salvat!';
    msgEl.className   = 'auth-msg auth-msg--success';
    msgEl.style.display = 'block';
    await loadAdminUsers();
  } catch {
    msgEl.textContent = 'Eroare de rețea.';
    msgEl.className   = 'auth-msg auth-msg--error';
    msgEl.style.display = 'block';
  } finally {
    spinner.style.display = 'none';
  }
}

async function deleteUser() {
  const userId = $('modal-user-id').value;
  if (!confirm('Ștergi acest utilizator? Acțiunea nu poate fi anulată.')) return;
  try {
    const res = await api('/api/admin/users', {
      method: 'DELETE',
      body: JSON.stringify({ userId })
    });
    if (!res.ok) { alert('Nu s-a putut șterge utilizatorul.'); return; }
    $('admin-modal-overlay').style.display = 'none';
    await loadAdminUsers();
  } catch { alert('Eroare de rețea.'); }
}

/* ── Subjects tab ────────────────────────────────────────────── */
async function loadAdminSubjects() {
  const listEl = $('admin-subject-list');
  listEl.innerHTML = '<p class="dash-empty">Se încarcă…</p>';
  try {
    const res  = await api('/api/admin/subjects');
    if (!res.ok) throw new Error();
    const data = await res.json();
    _adminSubjects = data.subjects || [];
    renderAdminSubjects(_adminSubjects);
    // Also fill select for questions tab
    const sel = $('admin-q-subject-select');
    sel.innerHTML = '<option value="">-- Alege subiect --</option>' +
      _adminSubjects.map(s => `<option value="${escH(s._id)}">${escH(s.icon||'📚')} ${escH(s.name)}</option>`).join('');
  } catch {
    listEl.innerHTML = '<p class="dash-empty">Eroare la încărcare.</p>';
  }
}

function renderAdminSubjects(subjects) {
  const listEl = $('admin-subject-list');
  if (!subjects.length) { listEl.innerHTML = '<p class="dash-empty">Niciun subiect.</p>'; return; }
  listEl.innerHTML = subjects.map(s => `
    <div class="glass-card dash-card admin-subject-card">
      <div class="admin-subj-info">
        <span class="admin-subj-icon">${escH(s.icon||'📚')}</span>
        <div>
          <strong>${escH(s.name)}</strong>
          <span class="admin-user-meta">${s.questionsCount||0} întrebări · ${s.isActive ? '✅ Activ' : '❌ Inactiv'}</span>
        </div>
      </div>
      <div style="display:flex;gap:.5rem">
        <button class="btn-ghost btn-sm" onclick="toggleSubject('${escH(s._id)}',${!s.isActive})">
          ${s.isActive ? 'Dezactivează' : 'Activează'}
        </button>
      </div>
    </div>
  `).join('');
}

async function addSubject() {
  const name  = $('new-subject-name').value.trim();
  const icon  = $('new-subject-icon').value.trim() || '📚';
  const desc  = $('new-subject-desc').value.trim();
  const msgEl = $('admin-subject-msg');

  if (!name) { msgEl.textContent = 'Numele este obligatoriu.'; msgEl.className = 'auth-msg auth-msg--error'; msgEl.style.display = 'block'; return; }

  try {
    const res  = await api('/api/admin/subjects', { method: 'POST', body: JSON.stringify({ name, icon, description: desc }) });
    const data = await res.json();
    if (!res.ok) { msgEl.textContent = data.error; msgEl.className = 'auth-msg auth-msg--error'; msgEl.style.display = 'block'; return; }
    msgEl.textContent = '✓ Subiect adăugat!'; msgEl.className = 'auth-msg auth-msg--success'; msgEl.style.display = 'block';
    $('new-subject-name').value = ''; $('new-subject-icon').value = ''; $('new-subject-desc').value = '';
    await loadAdminSubjects();
    await loadSubjects(); // refresh home screen
  } catch { msgEl.textContent = 'Eroare de rețea.'; msgEl.className = 'auth-msg auth-msg--error'; msgEl.style.display = 'block'; }
}

async function toggleSubject(subjectId, isActive) {
  try {
    await api('/api/admin/subjects', { method: 'PATCH', body: JSON.stringify({ subjectId, isActive }) });
    await loadAdminSubjects();
    await loadSubjects();
  } catch { alert('Eroare la actualizare.'); }
}

/* ── Questions tab ───────────────────────────────────────────── */
async function loadAdminQuestions() {
  const subjectId = $('admin-q-subject-select').value;
  const listEl    = $('admin-question-list');
  const addPanel  = $('add-question-panel');

  if (!subjectId) { listEl.innerHTML = ''; addPanel.style.display = 'none'; return; }
  addPanel.style.display = 'block';
  listEl.innerHTML = '<p class="dash-empty">Se încarcă întrebările…</p>';

  try {
    const res  = await api(`/api/admin/questions?subjectId=${subjectId}`);
    if (!res.ok) throw new Error();
    const data = await res.json();
    renderAdminQuestions(data.questions || [], subjectId);
  } catch {
    listEl.innerHTML = '<p class="dash-empty">Eroare la încărcare.</p>';
  }
}

function renderAdminQuestions(questions, subjectId) {
  const listEl = $('admin-question-list');
  if (!questions.length) {
    listEl.innerHTML = '<div class="glass-card dash-card"><p class="dash-empty">Nicio întrebare pentru acest subiect. Adaugă prima!</p></div>';
    return;
  }
  listEl.innerHTML = questions.map((q, i) => `
    <div class="glass-card dash-card admin-q-row">
      <div class="admin-q-num">Q${i+1} ${q.multiple ? '<span class="bc-multi">MULTI</span>' : ''}</div>
      <div class="admin-q-text">${escH(q.question).slice(0, 120)}${q.question.length > 120 ? '…' : ''}</div>
      <div class="admin-q-actions">
        <button class="btn-danger btn-sm" onclick="deleteQuestion('${escH(q._id)}')">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M9 6V4h6v2"/></svg>
          Șterge
        </button>
      </div>
    </div>
  `).join('');
}

async function addQuestion() {
  const subjectId = $('admin-q-subject-select').value;
  const qText     = $('new-q-text').value.trim();
  const msgEl     = $('admin-question-msg');

  if (!subjectId || !qText) {
    msgEl.textContent = 'Selectează subiect și completează întrebarea.';
    msgEl.className   = 'auth-msg auth-msg--error';
    msgEl.style.display = 'block';
    return;
  }

  const optInputs = document.querySelectorAll('#new-q-options-wrap .auth-input');
  const checkboxes = document.querySelectorAll('#new-q-options-wrap .opt-correct-check');
  const options = [], correct = [];

  optInputs.forEach((inp, i) => {
    if (inp.value.trim()) {
      correct.push(...(checkboxes[i].checked ? [options.length] : []));
      options.push(inp.value.trim());
    }
  });

  if (options.length < 2) {
    msgEl.textContent = 'Trebuie cel puțin 2 opțiuni.';
    msgEl.className   = 'auth-msg auth-msg--error';
    msgEl.style.display = 'block';
    return;
  }
  if (!correct.length) {
    msgEl.textContent = 'Marchează cel puțin un răspuns corect (bifă).';
    msgEl.className   = 'auth-msg auth-msg--error';
    msgEl.style.display = 'block';
    return;
  }

  try {
    const res  = await api('/api/admin/questions', {
      method: 'POST',
      body: JSON.stringify({ subjectId, question: qText, options, correct, multiple: correct.length > 1 })
    });
    const data = await res.json();
    if (!res.ok) { msgEl.textContent = data.error; msgEl.className = 'auth-msg auth-msg--error'; msgEl.style.display = 'block'; return; }

    msgEl.textContent = '✓ Întrebare adăugată!'; msgEl.className = 'auth-msg auth-msg--success'; msgEl.style.display = 'block';
    $('new-q-text').value = '';
    optInputs.forEach(i => { i.value = ''; }); checkboxes.forEach(c => { c.checked = false; });
    await loadAdminQuestions();
    await loadAdminSubjects(); // refresh counts
  } catch { msgEl.textContent = 'Eroare de rețea.'; msgEl.className = 'auth-msg auth-msg--error'; msgEl.style.display = 'block'; }
}

async function deleteQuestion(questionId) {
  if (!confirm('Ștergi această întrebare?')) return;
  try {
    await api('/api/admin/questions', { method: 'DELETE', body: JSON.stringify({ questionId }) });
    await loadAdminQuestions();
    await loadAdminSubjects();
  } catch { alert('Eroare la ștergere.'); }
}

/* Augment switchAdminTab to lazy-load tab data */
const _origSwitchTab = switchAdminTab;
window.switchAdminTab = async function(tab) {
  _origSwitchTab(tab);
  if (tab === 'subjects') await loadAdminSubjects();
  if (tab === 'questions') {
    if (!_adminSubjects.length) await loadAdminSubjects();
  }
};
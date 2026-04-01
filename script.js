/* ════════════════════════════════════════════════════════════
   Networking Quiz – script.js
   Premium Edition with Particle System, Auth & Navigation
   ════════════════════════════════════════════════════════════ */

const LETTERS = ['A', 'B', 'C', 'D', 'E'];
const EXAM_QS = 43;
const EXAM_MAX = 1000;
const EXAM_PASS = 700;

/* ════════════════════════════════════════════════════════════
   PARTICLE SYSTEM  (Canvas-based network nodes)
   ════════════════════════════════════════════════════════════ */
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H;
  const particles = [];
  const PARTICLE_COUNT = 60;
  const MAX_DIST = 130;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r = Math.random() * 1.8 + 0.5;
      this.alpha = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(124, 92, 252, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.08;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ════════════════════════════════════════════════════════════
   AUTH STATE
   ════════════════════════════════════════════════════════════ */
let authToken = localStorage.getItem('token');
let authEmail = localStorage.getItem('email');

/* ── State ──────────────────────────────────────────────────── */
const S = {
  mode: 20,
  questions: [],
  current: 0,
  score: 0,
  ptsPerQ: 0,
  selected: new Set(),
  answered: false,
  stats: { correct: 0, wrong: 0, total: 0 },
  /* ── Answer history for previous-question navigation ── */
  history: []   // Array of { selected: [...], answered: bool, wasCorrect: bool }
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
  return text.replace(/__([^_]+)__/g,
    (_, w) => `<span class="underline-word">${escH(w)}</span>`);
}

function escH(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Is the current mode a practice mode (not exam)? */
function isPractice() {
  return S.mode !== 'exam';
}

/* ════════════════════════════════════════════════════════════
   AUTH HELPERS
   ════════════════════════════════════════════════════════════ */

function setAuthLoading(btnEl, loading) {
  const label = btnEl.querySelector('.btn-label');
  const spinner = btnEl.querySelector('.btn-spinner');
  const arrow = btnEl.querySelector('.btn-arrow');
  if (label) label.style.display = loading ? 'none' : 'inline';
  if (spinner) spinner.style.display = loading ? 'inline-flex' : 'none';
  if (arrow) arrow.style.display = loading ? 'none' : 'inline';
  btnEl.disabled = loading;
}

function showAuthMsg(text, type = 'error') {
  const el = $('auth-msg');
  el.textContent = text;
  el.className = 'auth-msg auth-msg--' + type;
  el.style.display = 'block';
}

function hideAuthMsg() {
  $('auth-msg').style.display = 'none';
}

function onAuthSuccess(token, email) {
  authToken = token;
  authEmail = email;
  localStorage.setItem('token', token);
  localStorage.setItem('email', email);
  updateUserBar();
  showScreen('screen-home');
}

function logout() {
  authToken = null;
  authEmail = null;
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  showScreen('screen-auth');
}

function updateUserBar() {
  if (authEmail) {
    $('user-email-display').textContent = authEmail;
    const initial = authEmail.charAt(0).toUpperCase();
    $('user-avatar').textContent = initial;
  }
}

/* ════════════════════════════════════════════════════════════
   PASSWORD TOGGLE
   ════════════════════════════════════════════════════════════ */
function setupPasswordToggle(toggleId, inputId) {
  const toggle = $(toggleId);
  const input = $(inputId);
  if (!toggle || !input) return;

  toggle.addEventListener('click', () => {
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    toggle.querySelector('.eye-open').style.display = isPassword ? 'none' : 'block';
    toggle.querySelector('.eye-closed').style.display = isPassword ? 'block' : 'none';
  });
}

setupPasswordToggle('pw-toggle-1', 'auth-password');
setupPasswordToggle('pw-toggle-2', 'auth-confirm-password');

/* ════════════════════════════════════════════════════════════
   API CALLS
   ════════════════════════════════════════════════════════════ */

async function login(email, password) {
  const btn = $('btn-login');
  setAuthLoading(btn, true);
  hideAuthMsg();

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (!res.ok) {
      showAuthMsg(data.error || 'Login failed. Check your credentials.');
      return;
    }

    onAuthSuccess(data.token, data.email || email);
  } catch (err) {
    showAuthMsg('Network error. Please try again.');
  } finally {
    setAuthLoading(btn, false);
  }
}

async function register(email, password) {
  const btn = $('btn-register');
  setAuthLoading(btn, true);
  hideAuthMsg();

  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (!res.ok) {
      showAuthMsg(data.error || 'Registration failed.');
      return;
    }

    showAuthMsg('Account created! You can now sign in.', 'success');
    switchTab('login');
  } catch (err) {
    showAuthMsg('Network error. Please try again.');
  } finally {
    setAuthLoading(btn, false);
  }
}

async function saveScore(payload) {
  const statusEl = $('save-status');
  statusEl.textContent = '⏳ Saving result…';
  statusEl.className = 'save-status';
  statusEl.style.display = 'block';

  try {
    const res = await fetch('/api/saveScore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken
      },
      body: JSON.stringify(payload)
    });

    if (res.status === 401 || res.status === 403) {
      statusEl.textContent = '⚠️ Session expired. Please log in again.';
      statusEl.className = 'save-status save-status--error';
      setTimeout(logout, 2000);
      return;
    }

    if (!res.ok) {
      statusEl.textContent = '⚠️ Score not saved (server error).';
      statusEl.className = 'save-status save-status--error';
      return;
    }

    statusEl.textContent = '✓ Result saved!';
    statusEl.className = 'save-status save-status--ok';
  } catch (err) {
    statusEl.textContent = '⚠️ Could not reach server.';
    statusEl.className = 'save-status save-status--error';
  }
}

/* ════════════════════════════════════════════════════════════
   AUTH SCREEN – tab switching
   ════════════════════════════════════════════════════════════ */
function switchTab(tab) {
  const isLogin = tab === 'login';

  $('tab-login').classList.toggle('active', isLogin);
  $('tab-register').classList.toggle('active', !isLogin);

  const indicator = $('tab-indicator');
  if (indicator) {
    indicator.classList.toggle('right', !isLogin);
  }

  $('btn-login').style.display = isLogin ? 'flex' : 'none';
  $('btn-register').style.display = isLogin ? 'none' : 'flex';

  const confirmGroup = $('confirm-pw-group');
  if (confirmGroup) {
    confirmGroup.style.display = isLogin ? 'none' : 'block';
  }

  $('auth-password').autocomplete = isLogin ? 'current-password' : 'new-password';
  hideAuthMsg();
}

$('tab-login').addEventListener('click', () => switchTab('login'));
$('tab-register').addEventListener('click', () => switchTab('register'));

/* ── Auth button listeners ──────────────────────────────────── */
$('btn-login').addEventListener('click', () => {
  const email = $('auth-email').value.trim();
  const password = $('auth-password').value;
  if (!email || !password) { showAuthMsg('Please enter email and password.'); return; }
  login(email, password);
});

$('btn-register').addEventListener('click', () => {
  const email = $('auth-email').value.trim();
  const password = $('auth-password').value;
  const confirm = $('auth-confirm-password') ? $('auth-confirm-password').value : password;

  if (!email || !password) { showAuthMsg('Please enter email and password.'); return; }
  if (password.length < 6) { showAuthMsg('Password must be at least 6 characters.'); return; }
  if (password !== confirm) { showAuthMsg('Passwords do not match.'); return; }
  register(email, password);
});

document.querySelectorAll('.auth-input').forEach(input => {
  input.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const isLogin = $('tab-login').classList.contains('active');
    isLogin ? $('btn-login').click() : $('btn-register').click();
  });
});

/* ── Logout ────────────────────────────────────────────────── */
$('btn-logout').addEventListener('click', logout);

/* ════════════════════════════════════════════════════════════
   PAGE LOAD
   ════════════════════════════════════════════════════════════ */
if (authToken) {
  updateUserBar();
  showScreen('screen-home');
} else {
  showScreen('screen-auth');
}

/* ── Home: mode selection ───────────────────────────────────── */
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

/* ── Back from quiz → Home ──────────────────────────────────── */
$('btn-back-quiz').addEventListener('click', () => {
  if (S.current > 0 || S.answered) {
    if (!confirm('Exit quiz? Your progress will be lost.')) return;
  }
  showScreen('screen-home');
});

/* ── Result screen ──────────────────────────────────────────── */
$('btn-restart').addEventListener('click', startQuiz);
$('btn-home-result').addEventListener('click', () => showScreen('screen-home'));

/* ── Browse back ────────────────────────────────────────────── */
$('btn-back-browse').addEventListener('click', () => showScreen('screen-home'));

/* ════════════════════════════════════════════════════════════
   START QUIZ
   ════════════════════════════════════════════════════════════ */
function startQuiz() {
  if (!authToken) {
    showScreen('screen-auth');
    return;
  }

  const shuffled = shuffle(ALL_QUESTIONS);

  if (S.mode === 'exam') {
    S.questions = shuffled.slice(0, EXAM_QS);
    S.ptsPerQ = Math.floor(EXAM_MAX / EXAM_QS);
  } else if (S.mode === 'all') {
    S.questions = shuffled;
    S.ptsPerQ = 0;
  } else {
    S.questions = shuffled.slice(0, S.mode);
    S.ptsPerQ = 0;
  }

  S.current = 0;
  S.score = 0;
  S.selected = new Set();
  S.answered = false;
  S.stats = { correct: 0, wrong: 0, total: S.questions.length };

  /* Initialize answer history */
  S.history = S.questions.map(() => ({
    selected: [],
    answered: false,
    wasCorrect: false
  }));

  $('q-total').textContent = S.questions.length;
  $('score-live').textContent = '0';
  $('score-label').textContent = S.mode === 'exam' ? 'Points' : 'Score';

  if (S.mode === 'exam') {
    $('exam-pts-info').style.display = 'block';
    $('pts-per-q').textContent = S.ptsPerQ;
  } else {
    $('exam-pts-info').style.display = 'none';
  }

  showScreen('screen-quiz');
  renderQuestion();
}

/* ════════════════════════════════════════════════════════════
   RENDER QUESTION
   Handles both fresh questions and replaying previously-answered ones
   ════════════════════════════════════════════════════════════ */
function renderQuestion() {
  const q = S.questions[S.current];
  const hist = S.history[S.current];
  const isReplay = hist.answered;   // Already answered before → show in review mode

  if (isReplay) {
    /* Restore state from history */
    S.selected = new Set(hist.selected);
    S.answered = true;
  } else {
    S.selected = new Set();
    S.answered = false;
  }

  /* Progress */
  const num = S.current + 1;
  $('q-current').textContent = num;
  $('progress-fill').style.width = (S.current / S.questions.length * 100) + '%';

  /* Multi-answer hint */
  $('multi-hint').style.display = q.multiple ? 'inline-flex' : 'none';

  /* Question text – re-animate */
  const card = $('question-card');
  card.style.animation = 'none';
  void card.offsetWidth;
  card.style.animation = '';
  $('question-text').innerHTML = renderQuestionHTML(q.question);

  /* Build options */
  const list = $('options-list');
  list.style.animation = 'none';
  void list.offsetWidth;
  list.style.animation = '';
  list.innerHTML = '';

  const correctSet = new Set(q.correct);

  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'opt-btn';
    btn.dataset.idx = idx;

    const lspan = document.createElement('span');
    lspan.className = 'opt-letter';
    lspan.textContent = LETTERS[idx];

    const tspan = document.createElement('span');
    tspan.textContent = opt;

    btn.appendChild(lspan);
    btn.appendChild(tspan);

    if (isReplay) {
      /* Show answered state: color the buttons */
      btn.disabled = true;
      const sel = S.selected.has(idx);
      const corr = correctSet.has(idx);
      if (sel && corr) btn.classList.add('correct');
      else if (sel && !corr) btn.classList.add('wrong');
      else if (!sel && corr) btn.classList.add('missed');
    } else {
      btn.addEventListener('click', () => onOption(idx, btn));
    }

    list.appendChild(btn);
  });

  /* Feedback */
  if (isReplay) {
    const box = $('feedback-box');
    const inner = $('feedback-inner');
    box.style.display = 'block';

    if (hist.wasCorrect) {
      inner.className = 'feedback-inner ok';
      inner.textContent = 'Correct! ✓';
    } else {
      inner.className = 'feedback-inner bad';
      const labels = q.correct
        .map(i => `${LETTERS[i]}. ${q.options[i]}`)
        .join('   |   ');
      inner.textContent = `✗  Incorrect.   Correct answer: ${labels}`;
    }
  } else {
    $('feedback-box').style.display = 'none';
  }

  /* Buttons */
  if (isReplay) {
    /* Already answered – show Next, hide Submit */
    $('btn-submit').style.display = 'none';
    $('btn-next').style.display = (S.current < S.questions.length - 1) ? 'inline-flex' : 'inline-flex';
    /* Show "View Results" if this is the last question and all are answered */
    if (S.current >= S.questions.length - 1 && allAnswered()) {
      $('btn-next').querySelector('.btn-label').textContent = 'View Results';
    } else {
      $('btn-next').querySelector('.btn-label').textContent = 'Next Question';
    }
  } else {
    if (q.multiple) {
      $('btn-submit').style.display = 'inline-block';
      $('btn-submit').disabled = true;
      $('btn-next').style.display = 'none';
    } else {
      $('btn-submit').style.display = 'none';
      $('btn-next').style.display = 'none';
    }
  }

  /* Previous button – show only in practice mode and not on first question */
  updatePrevButton();
}

/** Check if all questions have been answered */
function allAnswered() {
  return S.history.every(h => h.answered);
}

/** Show/hide the previous button */
function updatePrevButton() {
  const prevBtn = $('btn-prev');
  if (!prevBtn) return;

  if (isPractice() && S.current > 0) {
    prevBtn.style.display = 'inline-flex';
  } else {
    prevBtn.style.display = 'none';
  }
}

/* ════════════════════════════════════════════════════════════
   OPTION CLICK
   ════════════════════════════════════════════════════════════ */
function onOption(idx, btn) {
  if (S.answered) return;
  const q = S.questions[S.current];

  if (q.multiple) {
    if (S.selected.has(idx)) {
      S.selected.delete(idx);
      btn.classList.remove('selected');
    } else {
      S.selected.add(idx);
      btn.classList.add('selected');
    }
    $('btn-submit').disabled = S.selected.size === 0;
  } else {
    S.selected = new Set([idx]);
    reveal();
  }
}

/* Submit button for multi-answer */
$('btn-submit').addEventListener('click', () => {
  if (S.selected.size === 0) return;
  reveal();
});

/* Next button */
$('btn-next').addEventListener('click', advance);

/* Previous button */
$('btn-prev').addEventListener('click', goBack);

function advance() {
  S.current++;
  if (S.current >= S.questions.length) {
    /* If all answered → show result. If not, wrap to first unanswered */
    if (allAnswered()) {
      showResult();
    } else {
      /* Find next unanswered question */
      let found = false;
      for (let i = S.current; i < S.questions.length; i++) {
        if (!S.history[i].answered) {
          S.current = i;
          found = true;
          break;
        }
      }
      if (!found) {
        for (let i = 0; i < S.current; i++) {
          if (!S.history[i].answered) {
            S.current = i;
            found = true;
            break;
          }
        }
      }
      if (!found) {
        showResult();
        return;
      }
      renderQuestion();
    }
  } else {
    renderQuestion();
  }
}

function goBack() {
  if (S.current > 0) {
    S.current--;
    renderQuestion();
  }
}

/* ════════════════════════════════════════════════════════════
   REVEAL ANSWER
   ════════════════════════════════════════════════════════════ */
function reveal() {
  S.answered = true;
  const q = S.questions[S.current];
  const correctSet = new Set(q.correct);
  const selSet = S.selected;

  /* Disable all buttons */
  const btns = $('options-list').querySelectorAll('.opt-btn');
  btns.forEach(b => { b.disabled = true; });

  /* Correct? */
  let ok;
  if (q.multiple) {
    ok = correctSet.size === selSet.size && [...correctSet].every(i => selSet.has(i));
  } else {
    ok = correctSet.has([...selSet][0]);
  }

  /* Colour every button */
  btns.forEach((btn, idx) => {
    const sel = selSet.has(idx);
    const corr = correctSet.has(idx);
    btn.classList.remove('selected');
    if (sel && corr) btn.classList.add('correct');
    else if (sel && !corr) btn.classList.add('wrong');
    else if (!sel && corr) btn.classList.add('missed');
  });

  /* Save to history (only score once — don't double-count on replay) */
  if (!S.history[S.current].answered) {
    S.history[S.current] = {
      selected: [...selSet],
      answered: true,
      wasCorrect: ok
    };

    if (ok) {
      S.stats.correct++;
      S.score += (S.mode === 'exam') ? S.ptsPerQ : 1;
    } else {
      S.stats.wrong++;
    }
    $('score-live').textContent = S.score;
  }

  /* Feedback message */
  const box = $('feedback-box');
  const inner = $('feedback-inner');
  box.style.display = 'block';

  if (ok) {
    inner.className = 'feedback-inner ok';
    const praise = ['Correct! ✓', 'Well done! ✓', 'Right! ✓', 'Spot on! ✓', 'Nailed it! ✓'];
    inner.textContent = praise[Math.floor(Math.random() * praise.length)];
  } else {
    inner.className = 'feedback-inner bad';
    const labels = q.correct
      .map(i => `${LETTERS[i]}. ${q.options[i]}`)
      .join('   |   ');
    inner.textContent = `✗  Incorrect.   Correct answer: ${labels}`;
  }

  /* Show Next, hide Submit */
  $('btn-submit').style.display = 'none';
  $('btn-next').style.display = 'inline-flex';

  /* Update "Next" label for last question */
  if (S.current >= S.questions.length - 1 && allAnswered()) {
    $('btn-next').querySelector('.btn-label').textContent = 'View Results';
  } else {
    $('btn-next').querySelector('.btn-label').textContent = 'Next Question';
  }

  /* Update previous button visibility */
  updatePrevButton();
}

/* ════════════════════════════════════════════════════════════
   RESULT SCREEN
   ════════════════════════════════════════════════════════════ */
function showResult() {
  const { correct, wrong, total } = S.stats;
  const isExam = S.mode === 'exam';
  const examPts = S.score;
  const pct = Math.round(correct / total * 100);
  const arcPct = isExam ? Math.round(examPts / EXAM_MAX * 100) : pct;

  const arc = $('ring-arc');
  arc.style.strokeDashoffset = '427';
  setTimeout(() => {
    arc.style.strokeDashoffset = 427 - (427 * arcPct / 100);
  }, 100);

  $('save-status').style.display = 'none';

  if (isExam) {
    const passed = examPts >= EXAM_PASS;
    arc.className = 'ring-arc ' + (passed ? 'pass' : 'fail');
    $('ring-pct').textContent = examPts + ' pts';
    $('ring-sub').textContent = `/ ${EXAM_MAX}`;

    const pf = $('pass-fail');
    pf.style.display = 'block';
    pf.className = 'pass-fail ' + (passed ? 'pass' : 'fail');
    pf.textContent = passed ? '✓  PASS' : '✗  FAIL  (need 700 pts)';

    $('result-title').textContent = passed ? 'Exam Passed! 🎓' : 'Exam Failed 📚';
    $('result-detail').textContent = `${correct} of ${total} correct  ·  ${examPts} / ${EXAM_MAX} pts`;
  } else {
    arc.className = 'ring-arc';
    $('ring-pct').textContent = pct + '%';
    $('ring-sub').textContent = '';
    $('pass-fail').style.display = 'none';

    let title;
    if (pct >= 90) title = 'Excellent! 🏆';
    else if (pct >= 75) title = 'Great Job! 🎉';
    else if (pct >= 60) title = 'Good Effort! 👍';
    else if (pct >= 50) title = 'Keep Studying 📖';
    else title = 'More Practice Needed 💪';
    $('result-title').textContent = title;
    $('result-detail').textContent = `${correct} of ${total} correct`;
  }

  $('result-grid').innerHTML = `
    <div class="rg-item"><div class="rg-num g">${correct}</div><div class="rg-lbl">Correct</div></div>
    <div class="rg-item"><div class="rg-num r">${wrong}</div><div class="rg-lbl">Wrong</div></div>
    <div class="rg-item"><div class="rg-num b">${total}</div><div class="rg-lbl">Total</div></div>
  `;

  $('progress-fill').style.width = '100%';
  showScreen('screen-result');

  if (authToken) {
    saveScore({
      score: S.score,
      correct: S.stats.correct,
      total: S.stats.total,
      mode: S.mode
    });
  }
}

/* ════════════════════════════════════════════════════════════
   BROWSE SCREEN
   ════════════════════════════════════════════════════════════ */
function openBrowse() {
  $('browse-search').value = '';
  renderBrowse(ALL_QUESTIONS);
  $('browse-count').textContent = `(${ALL_QUESTIONS.length})`;
  showScreen('screen-browse');
}

function renderBrowse(list) {
  const container = $('browse-list');
  container.innerHTML = '';

  if (!list.length) {
    container.innerHTML = '<p style="color:var(--muted);text-align:center;padding:48px 0">No questions found.</p>';
    return;
  }

  list.forEach((q, qi) => {
    const card = document.createElement('div');
    card.className = 'bc';

    const multiTag = q.multiple
      ? '<span class="bc-multi">MULTI</span>' : '';

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
    ? ALL_QUESTIONS.filter(q =>
      q.question.toLowerCase().includes(term) ||
      q.options.some(o => o.toLowerCase().includes(term)))
    : ALL_QUESTIONS;
  renderBrowse(list);
  $('browse-count').textContent = term
    ? `(${list.length} of ${ALL_QUESTIONS.length})`
    : `(${ALL_QUESTIONS.length})`;
});

 
/* ── Admin email list (citit din JWT după login) ──────────── */
const ADMIN_EMAILS = (window.__ADMIN_EMAILS__ || '').split(',').map(e => e.trim().toLowerCase());
 
function checkAdmin() {
  if (!authEmail) return false;
  return ADMIN_EMAILS.includes(authEmail.toLowerCase());
}
 
/* ── Actualizează user bar cu butonul Admin dacă e cazul ──── */
function updateUserBarExtended() {
  updateUserBar(); // funcția existentă
  const adminBtn = $('btn-admin-panel');
  if (adminBtn) adminBtn.style.display = checkAdmin() ? 'inline-flex' : 'none';
}
 
// Înlocuiește apelurile existente la updateUserBar() cu updateUserBarExtended()
// sau adaugă la finalul funcției onAuthSuccess:
const _origOnAuthSuccess = onAuthSuccess;
// Patch onAuthSuccess to also check admin
function onAuthSuccess(token, email) {
  authToken = token;
  authEmail = email;
  localStorage.setItem('token', token);
  localStorage.setItem('email', email);
  updateUserBarExtended();
  showScreen('screen-home');
}
 
// La încărcare, dacă deja logat:
if (authToken && authEmail) {
  updateUserBarExtended();
}
 
/* ════════════════════════════════════════════════════════════
   DASHBOARD
   ════════════════════════════════════════════════════════════ */
 
async function openDashboard() {
  showScreen('screen-dashboard');
  await Promise.all([loadProfile(), loadDashboardScores()]);
}
 
async function loadProfile() {
  try {
    const res = await fetch('/api/profile', {
      headers: { Authorization: 'Bearer ' + authToken }
    });
    if (!res.ok) return;
    const user = await res.json();
    $('profile-email').value = user.email || '';
    $('profile-name').value = user.displayName || '';
  } catch {}
}
 
async function loadDashboardScores() {
  const histEl = $('dash-history');
  histEl.innerHTML = '<p class="dash-empty">Loading…</p>';
 
  try {
    const res = await fetch('/api/scores', {
      headers: { Authorization: 'Bearer ' + authToken }
    });
    if (!res.ok) { histEl.innerHTML = '<p class="dash-empty">Could not load scores.</p>'; return; }
    const { scores } = await res.json();
 
    if (!scores.length) {
      histEl.innerHTML = '<p class="dash-empty">No sessions yet. Start a quiz!</p>';
      $('ds-total').textContent = 0;
      $('ds-best').textContent = '–';
      $('ds-avg').textContent = '–';
      $('ds-exams').textContent = 0;
      return;
    }
 
    // Stats summary
    const exams = scores.filter(s => s.mode === 'exam');
    const allPct = scores.map(s => Math.round(s.correct / s.total * 100));
    const avgPct = Math.round(allPct.reduce((a, b) => a + b, 0) / allPct.length);
    const bestPct = Math.max(...allPct);
 
    $('ds-total').textContent = scores.length;
    $('ds-best').textContent = bestPct + '%';
    $('ds-avg').textContent = avgPct + '%';
    $('ds-exams').textContent = exams.length;
 
    // History table
    histEl.innerHTML = renderScoreRows(scores);
  } catch {
    histEl.innerHTML = '<p class="dash-empty">Error loading history.</p>';
  }
}
 
function renderScoreRows(scores) {
  return `<table class="score-table">
    <thead><tr>
      <th>Date</th><th>Mode</th><th>Correct</th><th>Result</th>
    </tr></thead>
    <tbody>
      ${scores.map(s => {
        const d = new Date(s.createdAt).toLocaleDateString('ro-RO', { day:'2-digit', month:'short', year:'numeric' });
        const pct = Math.round(s.correct / s.total * 100);
        const modeLabel = s.mode === 'exam' ? '🎓 Exam' : s.mode === 'full' ? '📚 Full' : `✏️ ${s.mode}Q`;
        const result = s.mode === 'exam'
          ? (s.score >= 700
            ? `<span class="badge badge-pass">PASS ${s.score}pts</span>`
            : `<span class="badge badge-fail">FAIL ${s.score}pts</span>`)
          : `<span class="badge ${pct>=70?'badge-pass':'badge-fail'}">${pct}%</span>`;
        return `<tr>
          <td>${d}</td>
          <td>${modeLabel}</td>
          <td>${s.correct}/${s.total}</td>
          <td>${result}</td>
        </tr>`;
      }).join('')}
    </tbody>
  </table>`;
}
 
async function saveProfile() {
  const btn = $('btn-save-profile');
  const msgEl = $('profile-msg');
  const newEmail = $('profile-email').value.trim();
  const displayName = $('profile-name').value.trim();
  const currentPassword = $('profile-cur-pw').value;
  const newPassword = $('profile-new-pw').value;
 
  msgEl.style.display = 'none';
  const label = btn.querySelector('.btn-label');
  const spinner = btn.querySelector('.btn-spinner');
  label.style.display = 'none';
  spinner.style.display = 'inline-flex';
  btn.disabled = true;
 
  try {
    const body = { newEmail, displayName };
    if (newPassword) { body.currentPassword = currentPassword; body.newPassword = newPassword; }
 
    const res = await fetch('/api/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + authToken },
      body: JSON.stringify(body)
    });
    const data = await res.json();
 
    if (!res.ok) {
      msgEl.textContent = data.error;
      msgEl.className = 'auth-msg auth-msg--error';
      msgEl.style.display = 'block';
      return;
    }
 
    // Update email in memory if changed
    if (data.email && data.email !== authEmail) {
      authEmail = data.email;
      localStorage.setItem('email', data.email);
      updateUserBarExtended();
    }
 
    msgEl.textContent = '✓ ' + data.message;
    msgEl.className = 'auth-msg auth-msg--success';
    msgEl.style.display = 'block';
    $('profile-cur-pw').value = '';
    $('profile-new-pw').value = '';
  } catch {
    msgEl.textContent = 'Network error. Please try again.';
    msgEl.className = 'auth-msg auth-msg--error';
    msgEl.style.display = 'block';
  } finally {
    label.style.display = 'inline';
    spinner.style.display = 'none';
    btn.disabled = false;
  }
}
 
/* ════════════════════════════════════════════════════════════
   ADMIN PANEL
   ════════════════════════════════════════════════════════════ */
 
let _allAdminUsers = [];
 
async function openAdminPanel() {
  if (!checkAdmin()) { alert('Access denied.'); return; }
  showScreen('screen-admin');
  await loadAdminUsers();
}
 
async function loadAdminUsers() {
  const list = $('admin-user-list');
  list.innerHTML = '<p class="dash-empty">Loading users…</p>';
 
  try {
    const res = await fetch('/api/admin?action=users', {
      headers: { Authorization: 'Bearer ' + authToken }
    });
    if (!res.ok) { list.innerHTML = '<p class="dash-empty">Failed to load users.</p>'; return; }
    const { users } = await res.json();
    _allAdminUsers = users;
    renderAdminUsers(users);
  } catch {
    list.innerHTML = '<p class="dash-empty">Network error.</p>';
  }
}
 
function filterAdminUsers() {
  const term = $('admin-search').value.toLowerCase().trim();
  const filtered = term
    ? _allAdminUsers.filter(u =>
        (u.email || '').toLowerCase().includes(term) ||
        (u.displayName || '').toLowerCase().includes(term))
    : _allAdminUsers;
  renderAdminUsers(filtered);
}
 
function renderAdminUsers(users) {
  const list = $('admin-user-list');
  $('admin-user-count').textContent = users.length + ' users';
 
  if (!users.length) {
    list.innerHTML = '<p class="dash-empty">No users found.</p>';
    return;
  }
 
  list.innerHTML = users.map(u => {
    const date = new Date(u.createdAt).toLocaleDateString('ro-RO', { day:'2-digit', month:'short', year:'numeric' });
    const lastAct = u.lastActivity
      ? new Date(u.lastActivity).toLocaleDateString('ro-RO', { day:'2-digit', month:'short' })
      : '–';
    const isAdminUser = (window.__ADMIN_EMAILS__ || '').split(',').map(e => e.trim().toLowerCase()).includes(u.email?.toLowerCase());
    return `<div class="admin-user-row glass-card" onclick="openAdminModal('${u._id}', '${escH(u.email||'')}', '${escH(u.displayName||'')}')">
      <div class="aur-avatar">${(u.email||'?').charAt(0).toUpperCase()}</div>
      <div class="aur-info">
        <div class="aur-email">${escH(u.email || '–')} ${isAdminUser ? '<span class="badge badge-admin">ADMIN</span>' : ''}</div>
        <div class="aur-meta">${escH(u.displayName || '')} · Joined ${date} · Last active ${lastAct}</div>
      </div>
      <div class="aur-stats">
        <span class="badge badge-neutral">${u.scoreCount} sessions</span>
      </div>
      <svg class="aur-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </div>`;
  }).join('');
}
 
function openAdminModal(userId, email, displayName) {
  $('modal-user-id').value = userId;
  $('modal-email').value = email;
  $('modal-name').value = displayName;
  $('modal-password').value = '';
  $('modal-title').textContent = 'Edit: ' + email;
  $('admin-modal-msg').style.display = 'none';
  $('admin-modal-overlay').style.display = 'flex';
  loadModalScores(userId);
}
 
function closeAdminModal(event) {
  if (!event || event.target === $('admin-modal-overlay')) {
    $('admin-modal-overlay').style.display = 'none';
  }
}
 
async function loadModalScores(userId) {
  $('modal-scores-list').innerHTML = '<p class="dash-empty">Loading…</p>';
  try {
    const res = await fetch('/api/admin?action=scores&userId=' + userId, {
      headers: { Authorization: 'Bearer ' + authToken }
    });
    const { scores } = await res.json();
    if (!scores.length) {
      $('modal-scores-list').innerHTML = '<p class="dash-empty">No sessions yet.</p>';
      return;
    }
    $('modal-scores-list').innerHTML = renderScoreRows(scores);
  } catch {
    $('modal-scores-list').innerHTML = '<p class="dash-empty">Failed to load scores.</p>';
  }
}
 
async function submitAdminEdit() {
  const userId = $('modal-user-id').value;
  const newEmail = $('modal-email').value.trim();
  const displayName = $('modal-name').value.trim();
  const newPassword = $('modal-password').value;
  const msgEl = $('admin-modal-msg');
 
  $('modal-spinner').style.display = 'inline-flex';
  msgEl.style.display = 'none';
 
  try {
    const body = { userId, newEmail, displayName };
    if (newPassword) body.newPassword = newPassword;
 
    const res = await fetch('/api/admin', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + authToken },
      body: JSON.stringify(body)
    });
    const data = await res.json();
 
    if (!res.ok) {
      msgEl.textContent = data.error;
      msgEl.className = 'auth-msg auth-msg--error';
      msgEl.style.display = 'block';
      return;
    }
 
    msgEl.textContent = '✓ ' + data.message;
    msgEl.className = 'auth-msg auth-msg--success';
    msgEl.style.display = 'block';
    $('modal-password').value = '';
    await loadAdminUsers(); // refresh list
  } catch {
    msgEl.textContent = 'Network error.';
    msgEl.className = 'auth-msg auth-msg--error';
    msgEl.style.display = 'block';
  } finally {
    $('modal-spinner').style.display = 'none';
  }
}
 
async function deleteUser() {
  const userId = $('modal-user-id').value;
  const email = $('modal-email').value;
  if (!confirm(`Delete user "${email}" and ALL their scores? This cannot be undone.`)) return;
 
  try {
    const res = await fetch('/api/admin', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + authToken },
      body: JSON.stringify({ userId })
    });
    const data = await res.json();
 
    if (!res.ok) {
      $('admin-modal-msg').textContent = data.error;
      $('admin-modal-msg').className = 'auth-msg auth-msg--error';
      $('admin-modal-msg').style.display = 'block';
      return;
    }
 
    $('admin-modal-overlay').style.display = 'none';
    await loadAdminUsers();
  } catch {
    alert('Network error.');
  }
}
 
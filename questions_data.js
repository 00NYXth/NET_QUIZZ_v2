const ALL_QUESTIONS = [
  {
    "question": "Indicați ordinea după prioritate a efectuării operațiilor din cadrul unei expresii, în care nu sunt paranteze:",
    "options": ["Unar", "Multiplicativ", "Aditiv", "Relațional", "De atribuire", "Condițional"],
    "correct": [0, 1, 2, 3, 4, 5],
    "multiple": true
  },
  {
    "question": "Indicați corespondența corectă dintre control și categoria din care face parte: CheckBox",
    "options": ["Controale de selecție", "Controale de tip valoare"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Indicați corespondența corectă dintre control și categoria din care face parte: RadioButton",
    "options": ["Controale de selecție", "Controale de tip valoare"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Indicați corespondența corectă dintre control și categoria din care face parte: TextBox",
    "options": ["Controale de selecție", "Controale de tip valoare"],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Indicați corespondența corectă dintre control și categoria din care face parte: Label",
    "options": ["Controale de selecție", "Controale de tip valoare"],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Indicați corespondența corectă dintre control și categoria din care face parte: PictureBox",
    "options": ["Controale de selecție", "Controale de tip valoare"],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Care este șablonul ce definește tipul unui obiect?",
    "options": ["o clasă", "un framework", "o variabilă", "o bibliotecă"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Este necesar de elaborat o componentă de interfață, care ar răspunde acțiunilor utilizatorilor cum ar fi intrările de la tastatură. Care dintre următoarele construcții de programare ar trebui să utilizați pentru a realiza această cerință?",
    "options": ["Eveniment", "clasă", "delegare", "proprietate"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Selectați construcția ce permite comentarea mai multor linii de program?",
    "options": ["/* si */", "{ si }", "<!-- si -->", "[* si *]"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Selectați descifrarea corectă a acronimului MDI:",
    "options": ["Multiple Document Interface", "Modal Document Interface", "Multiple Desktop Interface"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Care este operatorul folosit la instanțierea unui obiect ?",
    "options": ["new", "+", "*", "@", "toate variantele sunt corecte"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Selectați care este fereastra, ce se folosește pentru setarea proprietăților controler-lor:",
    "options": ["Properties", "Events", "ObjectInspector", "ObjectTreeView"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Elaborați o aplicație pentru linia de comandă. Ce instrucțiune o sa utilizați pentru afișarea informației în linia de comandă. (Alegeți două)",
    "options": ["Console.Write", "Console.WriteLine", "Form1.Write", "Console.Read", "Console.ReadLine"],
    "correct": [0, 1],
    "multiple": true
  },
  {
    "question": "O formă este un tip special de control care reprezintă o fereastră.",
    "options": ["Adevărat", "Fals"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "La închiderea formei cu Close() dialog modale se distrug(se distruge instanța clasei)",
    "options": ["Adevărat", "Fals"],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "O procedură stocată(stored procedure) constituie dintr-o singură comandă SQL.",
    "options": ["Adevărat", "Fals"],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Deschiderea conexiunii se efectuiază cu ajutorul clasei SqlCommand",
    "options": ["Adevărat", "Fals"],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Executarea propriu zisă a interogării se face cu metoda ExecuteReader()",
    "options": ["Adevărat", "Fals"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Clasa SqlConnection permite obținerea unei conexiuni la server și nu este obligatoriu de folosit metoda Open()",
    "options": ["Adevărat", "Fals"],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Toate limbajele POO au patru caracteristici comune:",
    "options": ["incapsularea", "polimorfismul", "mostenirea", "reutilizarea", "accesibilitatea"],
    "correct": [0, 1, 2, 3],
    "multiple": true
  },
  {
    "question": "Atributul action precizează ce se va intamplă cu datele formularului odată ce acestea ajung la destinație.",
    "options": ["Adevărat", "Fals"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Clasa Graphics răspunde la evenimente fiindcă are membri de tip event.",
    "options": ["Adevărat", "Fals"],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Atributul method precizează ce se va intampla cu datele formularului odată ce acestea ajung la destinație",
    "options": ["Adevărat", "Fals"],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Selectați corespondența: Un control este o instanță a unei clase derivate din:",
    "options": ["System.Windows.Forms", ".Net Framework"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Selectați corespondența: Mediu care permite dezvoltare și rularea aplicațiilor independent de platformă",
    "options": ["System.Windows.Forms", ".Net Framework"],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Care dintre tipurile enumerate mai jos este rădăcina oricărui tip de date:",
    "options": ["byte", "object", "string", "decimal"],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "La scrierea unui program doriți să restricționați accesul pentru o metodă a unei clase pe care o conține sau a unei clase care este derivată din clasa care o conține. Care modificator de acces ar trebui să utilizați pentru această metodă?",
    "options": ["static", "protected", "toate sunt corecte", "public"],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Modificatorul de acces ce oferă acces nelimitat este:",
    "options": ["Internal", "Public", "Private", "Sealed"],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Mediul de execuție al programelor în C# este:",
    "options": ["CLR", "CIL", "JIT"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Tipurile referință: (Selectați 3 răspunsuri corecte)",
    "options": ["sunt tipurile predefinite", "toate dintre cele indicate", "se definesc de către utilizator", "se includ tipurile clasă", "se includ tipurile interfață", "sunt float"],
    "correct": [2, 3, 4],
    "multiple": true
  },
  {
    "question": "Care dintre secvențele de mai jos vor inițializa corect un tablou bidimensional de elemente întregi cu două linii și trei coloane. (Alegeți două)",
    "options": ["int [ , ] m = new int [ , ] {{1,2,3},{4,2,5}};", "int [ ] m = new int [ ] {{1,2,3},{4,2,5}};", "int [ , ] m = {{1,2,3},{4,2,5}};", "int [ , ] m = new int [ , ] {{1,2},{4,2},{5,3}};", "int [ , ] m = {{4,2},{5,3},{6,2}};"],
    "correct": [0, 2],
    "multiple": true
  },
  {
    "question": "Operatorul folosit la instanțierea unui obiect este:",
    "options": ["this", "new", "+", "-"],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Operatorul \". \" separă spațiile de nume între ele.",
    "options": ["Adevărat", "Fals"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Textul cuprins între { şi } se consideră utilizarea unui spaţii de nume",
    "options": ["Adevărat", "Fals"],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "O directivă using vă permite accesul la spaţiile de nume definite în spaţiul de nume pe care îl specifică.",
    "options": ["Adevărat", "Fals"],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "La închiderea formei cu Close() dialog modale se distrug(se distruge instanţa clasei)",
    "options": ["Adevărat", "Fals"],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Elaborați o aplicație pentru linia de comandă. Ce instrucțiune o sa utilizați pentru afișarea informației în linia de comandă. (Alegeți două)",
    "options": ["Console.Write", "Console.WriteLine", "Form1.Write", "Console.Read", "Console.ReadLine"],
    "correct": [0, 1],
    "multiple": true
  },
  {
    "question": "O formă devine container MDI dacă se setează valoarea proprietății IsMdiContainer.",
    "options": ["True", "False"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "O aplicație MDI se lansează cu o singură fereastră container care reprezintă întreaga aplicație.",
    "options": ["Adevărat", "Fals"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Aplicaţiile MDI nu diferă de cele de tip SDI prin aceea că SDI au o singură fereastră copil.",
    "options": ["Adevărat", "Fals"],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Selectați criteriile care trebuie să le îndeplinească un nume de variabilă în C#.",
    "options": [
      "numele trebuie să înceapă cu o literă sau cu unul dintre caracterele \"_\" și \"@\";",
      "primul caracter poate fi urmat numai de litere, cifre sau un caracter de subliniere",
      "numele care reprezintă cuvinte cheie nu pot fi folosite în alt scop decât acela pentru care au fost definite",
      "cuvintele cheie pot fi folosite în alt scop numai dacă sunt precedate de @",
      "două nume sunt distincte dacă diferă prin cel puțin un caracter (fie el și literă mică ce diferă de aceeași literă majusculă)"
    ],
    "correct": [0, 1, 2, 3, 4],
    "multiple": true
  },
  {
    "question": "Selectați varianta corectă pentru a aranja descrescător după idprofesor înregistrările din tabela profesor.",
    "options": [
      "select idprofesor, nmprofesor from profesor order by idprofesor desc",
      "select idprofesor, nmprofesor from profesor order by idprofesor asc",
      "select idprofesor, nmprofesor from profesor order by nmprofesor desc",
      "select idprofesor, nmprofesor from profesor order by"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Tipurile predefinite nu definesc metoda Parse()",
    "options": ["Adevărat", "Fals"],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "În C# WriteLine nu este tot una cu writeline.",
    "options": ["Adevărat", "Fals"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Un program trebuie să aibă cel puțin o clasă și fiecare clasă conține metoda Main",
    "options": ["Adevărat", "Fals"],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Controlul Form este un container. Scopul său este de a găzdui alte controale. Folosind proprietățile, metodele și evenimentele unui formular, putem personaliza programul nostru.",
    "options": ["Adevărat", "Fals"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Punctul de intrare în aplicație este:",
    "options": ["Metoda Main", "Console.WriteLine();", "using System"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Înainte de apariția platformei .NET, pentru accesarea bazelor de date în SO Windows se utilizau următoarele tehnologii:",
    "options": ["ODBC (Open Database Connectivity)", "OLE DB (Object Linking and Embedding);", "ADO (ActiveX Data Objects) - o colecție de obiecte", "SQL Server", "SqlDataAdapter"],
    "correct": [0, 1, 2],
    "multiple": true
  },
  {
    "question": "Selectați caracteristicile arhitecturii .NET",
    "options": ["Independența de procesor și de platformă", "Managementul automat al memoriei", "Portabilitate", "Interoperabilitatea limbajelor", "Nivel scăzut de securitate", "Dependența de procesor și de platformă"],
    "correct": [0, 1, 2, 3],
    "multiple": true
  },
  {
    "question": "Selectați metoda corectă de a defini o variabilă pentru conexiune.",
    "options": ["SqlConnection conn = null;", "SqlConn conn = null;", "SqlConnection = null;", "Connection conn = null;"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "ADO.NET permite următoarele modele de acces la baza de date:",
    "options": ["acces conectat", "acces deconectat", "acces interconnectat"],
    "correct": [0, 1],
    "multiple": true
  },
  {
    "question": ".NET este",
    "options": [
      "un limbaj multi-paradigmă, cu verificarea statică a tipului variabilelor ce suportă programare procedurală, abstractizare a datelor, programare orientată pe obiecte.",
      "unul dintre limbajele de programare de referință în știința calculatoarelor.",
      "un cadru (Framework) de dezvoltare software unitară care permite realizarea, distribuirea și rularea aplicațiilor-desktop Windows și aplicațiilor WEB.",
      "în principal, înglobat în codul HTML."
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "Pentru SGBD SQL Server, la realizarea conexiunii cu baza de date, se utilizează clasa SQLConnect.",
    "options": ["Adevărat", "Fals"],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Clasa SQLConnection se găsește în spațiul de nume System.Data.SqlClient.",
    "options": ["Adevărat", "Fals"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Găsiți corespondența: Aplicația este conectată la server o perioadă lungă de timp",
    "options": ["modelul conectat", "modelul deconectat", "data provider", "datasets"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Găsiți corespondența: Conexiunea cu serverul se face numai pe durate scurte de timp",
    "options": ["modelul conectat", "modelul deconectat", "data provider", "datasets"],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Indicați corespondența corectă dintre clasa și destinația corespunzătoare. Obiectele reprezintă o singură tabelă din baza de date care conține rânduri și coloane",
    "options": ["DataTable", "Connection", "DataReader", "DataSet", "DataColumn", "DataRelation"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Indicați corespondența corectă dintre clasa și destinația corespunzătoare. Crează conexiunea cu sursa de date",
    "options": ["DataTable", "Connection", "DataReader", "DataSet", "DataColumn", "DataRelation"],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Indicați corespondența corectă dintre clasa și destinația corespunzătoare. Este folosită pentru accesarea și citirea rapidă a datelor într-o sursă de date",
    "options": ["DataTable", "Connection", "DataReader", "DataSet", "DataColumn", "DataRelation"],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "Indicați corespondența corectă dintre clasa și destinația corespunzătoare. Obiectele sale descriu schema întregii baze de date sau a unii submulțimi a sa. Conține tabele și relații între ele.",
    "options": ["DataTable", "Connection", "DataReader", "DataSet", "DataColumn", "DataRelation"],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "Analizați secvența de cod și selectați răspunsul corect. if (conn != null && conn.State == ConnectionState.Open) { conn.Close(); }",
    "options": ["Inchide conexiunea, daca-i deschisa.", "Inchide conexiunea.", "Deschide conexiunea, daca-i închisă.", "Deschide conexiunea."],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Deosebirea unei proceduri stocate de un scenariu constă în faptul, că:",
    "options": ["o procedura stocată poate avea parametri (de intrare și de ieșire).", "o procedura stocată nu poate avea parametri.", "o procedura stocată poate avea parametri doar de intrare", "o procedura stocată poate avea doar parametri de ieșire."],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Pentru a elibera memoria utilizată la lucrul cu conn vom utiliza:",
    "options": ["conn.Dispose();", "conn.Close();", "reader.Dispose();", "reader.Close();"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Un dialog modal este o formă care se deschide cu metoda:",
    "options": ["Show();", "ShowDialog();", "DialogShow();", "Activate();"],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Clasa SqlConnection (obiectul conn) are câteva metode: (selectați 3)",
    "options": ["Open()", "Close()", "Dispose()", "TryCatch()"],
    "correct": [0, 1, 2],
    "multiple": true
  },
  {
    "question": "În modelul deconectat",
    "options": [
      "obiectele necesare din baza de date (tabele, proceduri stocate, indecși ...) sunt transmise integral aplicației și stocate într-o structură de date",
      "aplicația deschide o conexiune cu serverul bazei de date, operează cu datele (citește, modifică) și la sfârșit închide conexiunea."
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "În modelul conectat",
    "options": [
      "aplicația deschide o conexiune cu serverul bazei de date, operează cu datele (citește, modifică) și la sfârșit închide conexiunea.",
      "obiectele necesare din baza de date (tabele, proceduri stocate, indecși ...) sunt transmise integral aplicației și stocate într-o structură de date"
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Analizați secvența de cod și selectați răspunsul corect (ștergere din baza de date)",
    "options": [
      "Este scris un cod pentru a insera date în baza de date.",
      "Este scris un cod pentru a actualiza date din baza noastra de date.",
      "Este scris un cod pentru a sterge datele din baza de date.",
      "Este scris un cod pentru a sterge baza de date."
    ],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "Selectați răspunsul potrivit: Console.ReadLine()",
    "options": ["metodă", "spațiu de nume", "clasă", "constructor"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Selectați răspunsul potrivit: System.TimeZone",
    "options": ["metodă", "spațiu de nume", "clasă", "constructor"],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Selectați răspunsul potrivit: Static void Main()",
    "options": ["metodă", "spațiu de nume", "clasă", "constructor"],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "Ce se va afișa în urma execuției programului cu enum (luna Mai)",
    "options": ["Luna Mai este a 5-a luna din an.", "Luna Mai este a 4-a luna din an.", "Eroare", "Mai"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Fie o secvență de cod: int p=10; int count=0; for(int n=0; n>p; n++) { count++ } Indicați numărul de iterații realizate de secvența de cod.",
    "options": ["0", "10", "9", "11"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Clasa DataSet se găsește în spațiul de nume System.",
    "options": ["Data", "IO", "Collections", "Text"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Indicați corespondența corectă dintre metodele formei și destinația acestora: Close();",
    "options": ["Închide forma", "Ascunde forma", "Face vizibilă forma", "Redesenează forma", "Selectează un control de pe formă"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Indicați corespondența corectă dintre metodele formei și destinația acestora: Hide();",
    "options": ["Închide forma", "Ascunde forma", "Face vizibilă forma", "Redesenează forma", "Selectează un control de pe formă"],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Indicați corespondența corectă dintre metodele formei și destinația acestora: Show();",
    "options": ["Închide forma", "Ascunde forma", "Face vizibilă forma", "Redesenează forma", "Selectează un control de pe formă"],
    "correct": [2],
    "multiple": false
  },
  {
    "question": "Un dialog modal este o formă care se deschide cu metoda",
    "options": ["ShowDialog()", "Show()", "Activate()", "Close()"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Un dialog nemodal este o formă care se deschide cu metoda",
    "options": ["ShowDialog()", "Show()", "Activate()", "Close()"],
    "correct": [1],
    "multiple": false
  },
  {
    "question": "Care instrucțiune afișează fereastra mesaj 'Salut!'?",
    "options": ["InputBox(\"Salut!\");", "MessageBox(\"Salut!\");", "MessageDlg(\"Salut!\");", "MessageBox.Show(\"Salut!\");"],
    "correct": [3],
    "multiple": false
  },
  {
    "question": "Analizați secvența de cod: Form2 form2 = new Form2(); Form2.Show();",
    "options": [
      "La tastarea butonului va deschide forma Form2.",
      "La tastarea butonului va închide forma Form2.",
      "La tastarea butonului va deschide forma Form1.",
      "La tastarea butonului va închide forma Form1."
    ],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Ce valoare va avea c la finele execuției: int a=5; int b=2; float c; c = (float)a / b;",
    "options": ["2,5", "2", "0", "Programul va da eroare."],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Se consideră secvența de cod: int x = 10; int y = ++x; int z = y++; După executare, variabila z =",
    "options": ["11", "10", "12", "13"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "O aplicație C# este formată din una sau mai multe clase, grupate în spații de nume (namespaces).",
    "options": ["Adevărat", "Fals"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Se consideră clasa MyClass. Completați instrucțiunea, ce crează o instanță a acestei clase. MyClass myObject = new __________();",
    "options": ["MyClass", "Myclass", "myclass", "CLASS"],
    "correct": [0],
    "multiple": false
  },
  {
    "question": "Corectați codul: string mesaj = \"Eu m-am născut în anul \" ______ anul.ToString();",
    "options": ["+", "-", "*", "/"],
    "correct": [0],
    "multiple": false
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ALL_QUESTIONS;
}

// Nutzer und Session laden
let users = JSON.parse(localStorage.getItem('ahs_users') || '{}');
let currentUser = localStorage.getItem('ahs_currentUser');

function saveUsers() {
  localStorage.setItem('ahs_users', JSON.stringify(users));
}

// Login-Funktion
function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (users[username] && users[username].password === password) {
    currentUser = username;
    localStorage.setItem('ahs_currentUser', currentUser);
    location.href = 'chat.html';
  } else {
    document.getElementById('message').innerText = '❌ Falscher Benutzername oder Passwort.';
  }
}

// Registrierung
function register() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    document.getElementById('message').innerText = '⚠️ Bitte Benutzername und Passwort eingeben.';
    return;
  }

  if (users[username]) {
    document.getElementById('message').innerText = '⚠️ Benutzer existiert bereits.';
    return;
  }

  users[username] = {
    password: password,
    messages: []
  };
  saveUsers();

  currentUser = username;
  localStorage.setItem('ahs_currentUser', currentUser);
  location.href = 'chat.html';
}

// Logout
function logout() {
  localStorage.removeItem('ahs_currentUser');
  location.href = 'index.html';
}

// Nachricht senden
function sendMessage() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  if (!message) return;

  if (!users[currentUser]) users[currentUser] = {password: '', messages: []};
  users[currentUser].messages.push({
    text: message,
    time: new Date().toLocaleTimeString()
  });
  saveUsers();
  input.value = '';
  showMessages();
}

// Nachrichten anzeigen
function showMessages() {
  const chatBox = document.getElementById('chatBox');
  chatBox.innerHTML = '';

  const messages = users[currentUser]?.messages || [];
  messages.forEach(msg => {
    const div = document.createElement('div');
    div.textContent = `[${msg.time}] ${msg.text}`;
    chatBox.appendChild(div);
  });

  chatBox.scrollTop = chatBox.scrollHeight;
}

// Beim Laden der Chat-Seite
if (location.pathname.endsWith('chat.html')) {
  if (!currentUser || !users[currentUser]) {
    // Falls kein Nutzer eingeloggt -> zurück zum Login
    location.href = 'index.html';
  } else {
    // Name und Stern anzeigen
    let displayName = currentUser;
    const isVerified = displayName.includes('<png=verified>');
    displayName = displayName.replace('<png=verified>', '').trim();

    document.getElementById('userDisplay').innerText = displayName;

    if (isVerified) {
      const badge = document.getElementById('verifiedBadge');
      if (badge) badge.style.display = 'inline-block';
    }

    showMessages();
  }
}
// Lokale Nutzerstruktur aus Storage laden oder leeren Speicher anlegen
let users = JSON.parse(localStorage.getItem('ahs_users') || '{}');
let currentUser = localStorage.getItem('ahs_currentUser');

// Speichert .ahs-Daten (Benutzer + Nachrichten)
function saveUsers() {
  localStorage.setItem('ahs_users', JSON.stringify(users));
}

// Einloggen
function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (users[username] && users[username].password === password) {
    currentUser = username;
    localStorage.setItem('ahs_currentUser', username);
    location.href = 'chat.html';
  } else {
    document.getElementById('message').innerText = '❌ Falscher Benutzername oder Passwort.';
  }
}

// Registrieren
function register() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (users[username]) {
    document.getElementById('message').innerText = '⚠️ Benutzer existiert bereits.';
    return;
  }

  if (username && password) {
    users[username] = {
      password: password,
      messages: []
    };
    saveUsers();
    currentUser = username;
    localStorage.setItem('ahs_currentUser', username);
    location.href = 'chat.html';
  } else {
    document.getElementById('message').innerText = '⚠️ Bitte Benutzername und Passwort eingeben.';
  }
}

// Abmelden
function logout() {
  localStorage.removeItem('ahs_currentUser');
  location.href = 'index.html';
}

// Nachricht senden
function sendMessage() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  if (!message) return;

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

// Auf Chatseite: Nutzer anzeigen & Verifizierung prüfen
if (location.pathname.endsWith('chat.html') && currentUser) {
  document.getElementById('userDisplay').innerText = currentUser;

  if (currentUser === "Alex Hürtgen" || currentUser === "Alex Gaming Studios") {
    const badge = document.getElementById('verifiedBadge');
    if (badge) badge.style.display = 'inline-block';
  }

  showMessages();
}

let users = JSON.parse(localStorage.getItem('ahs_users') || '{}');
let currentUser = localStorage.getItem('ahs_currentUser');

function saveUsers() {
  localStorage.setItem('ahs_users', JSON.stringify(users));
}

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  if (users[username] && users[username].password === password) {
    localStorage.setItem('ahs_currentUser', username);
    location.href = 'chat.html';
  } else {
    document.getElementById('message').innerText = 'Login fehlgeschlagen';
  }
}

function register() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  if (!users[username]) {
    users[username] = { password: password, messages: [] };
    saveUsers();
    localStorage.setItem('ahs_currentUser', username);
    location.href = 'chat.html';
  } else {
    document.getElementById('message').innerText = 'Benutzer existiert bereits';
  }
}

function logout() {
  localStorage.removeItem('ahs_currentUser');
  location.href = 'index.html';
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const message = input.value.trim();
  if (message && currentUser) {
    users[currentUser].messages.push({ text: message, time: new Date().toLocaleTimeString() });
    saveUsers();
    input.value = '';
    showMessages();
  }
}

function showMessages() {
  const box = document.getElementById('chatBox');
  box.innerHTML = '';
  const userData = users[currentUser];
  if (userData && userData.messages) {
    userData.messages.forEach(msg => {
      const div = document.createElement('div');
      div.innerText = `[${msg.time}] ${msg.text}`;
      box.appendChild(div);
    });
  }
}

if (location.pathname.endsWith('chat.html') && currentUser) {
  document.getElementById('userDisplay').innerText = currentUser;
  showMessages();
}

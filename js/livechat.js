
const openBtn = document.getElementById('openChatModal');
const openBtnn = document.getElementById('openChat');
const overlay = document.getElementById('chatOverlay');
const closeBtn = document.getElementById('closeChatModal');
const sendBtn = document.getElementById('sendChat');
const input = document.getElementById('chatMessage');

openBtn.addEventListener('click', (e) => {
  e.preventDefault();
  overlay.style.display = 'flex';
  input.focus();
});

openBtnn.addEventListener('click', (e) => {
  e.preventDefault();
  overlay.style.display = 'flex';
  input.focus();
});

closeBtn.addEventListener('click', () => {
  overlay.style.display = 'none';
});

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) overlay.style.display = 'none';
});

sendBtn.addEventListener('click', () => {
  const message = input.value.trim();
  if (!message) return;

  const encoded = encodeURIComponent(message);
  const telegramUrl =
    `https://t.me/Grid_Digitals?text=${encoded}`;

  window.open(telegramUrl, '_blank');
  input.value = '';
});

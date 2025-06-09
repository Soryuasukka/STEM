document.addEventListener('DOMContentLoaded', () => {
  const chatMessages = document.getElementById('chatMessages');
  const chatForm = document.getElementById('chatForm');
  const userInput = document.getElementById('userInput');

  // 预设的假回复，key 是用户提问关键词（简单匹配）
  const fakeReplies = {
    '古钱币': '古钱币种类繁多，包括布币、刀币、圆钱等。',
    '铜钱': '铜钱多由青铜铸成，是古代最常见的钱币之一。',
    '汉代': '汉代钱币以“半两”为代表，形状为圆形方孔。',
    '什么是布币': '布币是一种古代钱币，形似刀状，用于商周时期。',
  };

  function appendMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.style.marginBottom = '10px';
    messageDiv.style.textAlign = sender === 'user' ? 'right' : 'left';

    const bubble = document.createElement('div');
    bubble.style.display = 'inline-block';
    bubble.style.padding = '10px 15px';
    bubble.style.borderRadius = sender === 'user'
      ? '15px 15px 0 15px'
      : '15px 15px 15px 0';
    bubble.style.maxWidth = '70%';
    bubble.style.color = sender === 'user' ? 'white' : '#333';
    bubble.style.background = sender === 'user' ? '#0d6efd' : '#e9ecef';
    bubble.textContent = text;

    messageDiv.appendChild(bubble);
    chatMessages.appendChild(messageDiv);

    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  async function fakeThinkAndReply(userMsg) {
    appendMessage(userMsg, 'user');

    // 显示“智能体正在输入...”提示
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('message');
    typingIndicator.style.textAlign = 'left';
    const bubble = document.createElement('div');
    bubble.style.display = 'inline-block';
    bubble.style.padding = '10px 15px';
    bubble.style.borderRadius = '15px 15px 15px 0';
    bubble.style.maxWidth = '70%';
    bubble.style.color = '#666';
    bubble.style.background = '#f0f0f0';
    bubble.textContent = '智能体正在输入...';
    typingIndicator.appendChild(bubble);
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // 模拟思考延迟 1.5秒
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 移除“智能体正在输入...”提示
    chatMessages.removeChild(typingIndicator);

    // 简单关键词匹配回复，没有匹配则默认回复
    let reply = '一个关于古钱币的知识，你可以问我更多问题哦。';
    for (const key in fakeReplies) {
      if (userMsg.includes(key)) {
        reply = fakeReplies[key];
        break;
      }
    }

    appendMessage(reply, 'assistant');
  }

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (!message) return;

    userInput.value = '';
    userInput.focus();

    fakeThinkAndReply(message);
  });
});

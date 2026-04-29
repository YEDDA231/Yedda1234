<script>
(function () {
  const chatFab = document.getElementById("chatFab");
  const chatPanel = document.getElementById("chatPanel");
  const chatClose = document.getElementById("chatClose");
  const chatMessages = document.getElementById("chatMessages");
  const chatQuestion = document.getElementById("chatQuestion");
  const sendBtn = document.getElementById("sendBtn");

  chatFab.onclick = () => chatPanel.classList.toggle("open");
  chatClose.onclick = () => chatPanel.classList.remove("open");

  function appendBubble(text, role) {
    const el = document.createElement("div");
    el.className = "chat-bubble " + (role === "user" ? "chat-bubble-user" : "chat-bubble-bot");
    el.textContent = text;
    chatMessages.appendChild(el);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  async function send() {
    const question = chatQuestion.value.trim();
    if (!question) return;

    appendBubble(question, "user");
    chatQuestion.value = "";
    sendBtn.disabled = true;

    try {
      const res = await fetch("https://cloud.flowiseai.com/api/v1/prediction/https://cloud.flowiseai.com/api/v1/vector/upsert/06b70cbe-3e62-4cf4-8e33-9d74263c3edd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer AIzaSyA4g0GPwc5Bei1dwmk1bxiexLkATLP9p1o"
        },
        body: JSON.stringify({ question })
      });

      const data = await res.json();
      const botText = data?.text || data?.answer || "No response";

      appendBubble(botText, "bot");

    } catch (err) {
      appendBubble("Error: " + err.message, "bot");
    } finally {
      sendBtn.disabled = false;
    }
  }

  sendBtn.onclick = send;
  chatQuestion.addEventListener("keydown", e => {
    if (e.key === "Enter") send();
  });
})();
</script>

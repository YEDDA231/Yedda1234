(function () {
  const chatFab = document.getElementById("chatFab");
  const chatPanel = document.getElementById("chatPanel");
  const chatClose = document.getElementById("chatClose");
  const chatMessages = document.getElementById("chatMessages");
  const chatQuestion = document.getElementById("chatQuestion");
  const topKEl = document.getElementById("topK");
  const googleKeyEl = document.getElementById("googleGenerativeAPIKey");
  const modelNameEl = document.getElementById("modelName");
  const tasktypeEl = document.getElementById("tasktype");
  const sendBtn = document.getElementById("sendBtn");

  if (!chatFab || !chatPanel || !chatClose || !chatMessages || !chatQuestion || !topKEl || !googleKeyEl || !modelNameEl || !tasktypeEl || !sendBtn) return;

  chatFab.addEventListener("click", () => {
    chatPanel.classList.add("open");
    chatQuestion.focus();
  });

  chatClose.addEventListener("click", () => {
    chatPanel.classList.remove("open");
  });

  function appendBubble(text, role) {
    const el = document.createElement("div");
    el.className = `chat-bubble ${role === "user" ? "chat-bubble-user" : "chat-bubble-bot"}`;
    el.textContent = text;
    chatMessages.appendChild(el);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  async function send() {
    const question = chatQuestion.value.trim();
    if (!question) return;

    const topK = Number(topKEl.value || 1);
    const googleGenerativeAPIKey = googleKeyEl.value.trim();
    const modelName = modelNameEl.value.trim();
    const tasktype = tasktypeEl.value.trim();

    appendBubble(question, "user");
    chatQuestion.value = "";
    sendBtn.disabled = true;

    try {
      const payload = {
        question,
        overrideConfig: {
          topK,
          googleGenerativeAPIKey,
          modelName,
          tasktype
        }
      };
      const res = await window.flowiseUpsert(payload);
      const botText = res?.text ?? res?.answer ?? res?.message ?? "Request sent successfully.";
      appendBubble(botText, "bot");
    } catch (e) {
      appendBubble(`Error: ${e?.message || String(e)}`, "bot");
    } finally {
      sendBtn.disabled = false;
      chatQuestion.focus();
    }
  }

  sendBtn.addEventListener("click", send);
  chatQuestion.addEventListener("keydown", (e) => {
    if (e.key === "Enter") send();
  });
})();


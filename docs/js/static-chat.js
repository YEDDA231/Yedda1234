(function () {
  const baseUrlEl = document.getElementById("flowiseBaseUrl");
  const chatflowIdEl = document.getElementById("chatflowId");
  const questionEl = document.getElementById("question");
  const sendBtn = document.getElementById("sendBtn");
  const clearBtn = document.getElementById("clearBtn");
  const out = document.getElementById("chatOutput");

  if (!baseUrlEl || !chatflowIdEl || !questionEl || !sendBtn || !clearBtn || !out) return;

  function append(line) {
    out.textContent = (out.textContent ? out.textContent + "\n" : "") + line;
  }

  clearBtn.addEventListener("click", () => {
    out.textContent = "";
    questionEl.value = "";
    questionEl.focus();
  });

  async function send() {
    const baseUrl = baseUrlEl.value.trim();
    const chatflowId = chatflowIdEl.value.trim();
    const question = questionEl.value.trim();
    if (!baseUrl || !chatflowId || !question) return;

    sendBtn.disabled = true;
    append(`You: ${question}`);
    questionEl.value = "";

    try {
      const res = await window.flowisePredict({ baseUrl, chatflowId, question });
      const text =
        res?.text ??
        res?.answer ??
        res?.result ??
        res?.data?.text ??
        JSON.stringify(res, null, 2);
      append(`Bot: ${text}`);
    } catch (e) {
      append(`Error: ${e?.message || String(e)}`);
    } finally {
      sendBtn.disabled = false;
      questionEl.focus();
    }
  }

  sendBtn.addEventListener("click", send);
  questionEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") send();
  });
})();


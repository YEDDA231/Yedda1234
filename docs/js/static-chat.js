(function () {
  const topKEl = document.getElementById("topK");
  const googleKeyEl = document.getElementById("googleGenerativeAPIKey");
  const modelNameEl = document.getElementById("modelName");
  const tasktypeEl = document.getElementById("tasktype");
  const sendBtn = document.getElementById("sendBtn");
  const clearBtn = document.getElementById("clearBtn");
  const out = document.getElementById("chatOutput");

  if (!topKEl || !googleKeyEl || !modelNameEl || !tasktypeEl || !sendBtn || !clearBtn || !out) return;

  function append(line) {
    out.textContent = (out.textContent ? out.textContent + "\n" : "") + line;
  }

  clearBtn.addEventListener("click", () => {
    out.textContent = "";
    topKEl.focus();
  });

  async function send() {
    const topK = Number(topKEl.value || 1);
    const googleGenerativeAPIKey = googleKeyEl.value.trim();
    const modelName = modelNameEl.value.trim();
    const tasktype = tasktypeEl.value.trim();

    sendBtn.disabled = true;
    append("Sending upsert request...");

    try {
      const payload = {
        overrideConfig: {
          topK,
          googleGenerativeAPIKey,
          modelName,
          tasktype
        }
      };
      const res = await window.flowiseUpsert(payload);
      append(JSON.stringify(res, null, 2));
    } catch (e) {
      append(`Error: ${e?.message || String(e)}`);
    } finally {
      sendBtn.disabled = false;
      topKEl.focus();
    }
  }

  sendBtn.addEventListener("click", send);
})();


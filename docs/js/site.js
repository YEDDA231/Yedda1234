// Static site JS helper (no secrets here).

async function postJson(url, body, headers = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
    body: JSON.stringify(body)
  });

  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return { ok: response.ok, status: response.status, text };
  }
}

// Optional Flowise helper (safe only for public/no-key chatflows).
// Usage: window.flowisePredict({ baseUrl, chatflowId, question })
window.flowisePredict = async function flowisePredict({ baseUrl, chatflowId, question }) {
  if (!baseUrl || !chatflowId) throw new Error("Missing baseUrl/chatflowId");
  if (!question) throw new Error("Missing question");

  const url = `${baseUrl.replace(/\/$/, "")}/api/v1/prediction/${encodeURIComponent(chatflowId)}`;
  return await postJson(url, { question });
};


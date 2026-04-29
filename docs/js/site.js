// Static site JS helper.
const FLOWISE_UPSERT_API_URL = "https://cloud.flowiseai.com/api/v1/vector/upsert/06b70cbe-3e62-4cf4-8e33-9d74263c3edd";

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

// Flowise upsert helper based on your Python sample.
// Usage: window.flowiseUpsert({ overrideConfig: { ... } })
window.flowiseUpsert = async function flowiseUpsert(payload) {
  if (!payload || typeof payload !== "object") throw new Error("Missing payload");
  return await postJson(FLOWISE_UPSERT_API_URL, payload);
};


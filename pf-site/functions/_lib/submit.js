const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const RESEND_SEND_URL = "https://api.resend.com/emails";

export async function handleSubmission({ request, env, formName, requiredFields, buildEmail }) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ error: "Invalid request" }, 400);
  }

  const turnstileToken = data.turnstileToken;
  if (!turnstileToken) {
    return json({ error: "Please complete the verification" }, 400);
  }

  for (const field of requiredFields) {
    if (!data[field] || String(data[field]).trim() === "") {
      return json({ error: "Please fill in all required fields" }, 400);
    }
  }

  const verifyResponse = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: env.TURNSTILE_SECRET_KEY,
      response: turnstileToken,
      remoteip: request.headers.get("CF-Connecting-IP") || undefined,
    }),
  });
  const verifyResult = await verifyResponse.json();
  if (!verifyResult.success) {
    return json({ error: "Verification failed. Please try again." }, 403);
  }

  const { subject, text } = buildEmail(data);

  const sendResponse = await fetch(RESEND_SEND_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.FORM_FROM || "TTfE Forms <forms@ttfe.org.uk>",
      to: [env.FORM_RECIPIENT],
      reply_to: data.email,
      subject,
      text,
    }),
  });

  if (!sendResponse.ok) {
    const detail = await sendResponse.text();
    console.error(`Resend failed (${formName}):`, sendResponse.status, detail);
    return json({ error: "Could not send your message. Please try again later." }, 502);
  }

  return json({ success: true });
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

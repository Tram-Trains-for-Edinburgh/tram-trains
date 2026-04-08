exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  let data;
  try {
    data = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid request" }) };
  }

  const { turnstileToken } = data;

  if (!turnstileToken) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Please complete the verification" }) };
  }

  // Verify Turnstile token with Cloudflare
  const verifyResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: turnstileToken,
      remoteip: event.headers["x-forwarded-for"] || event.headers["client-ip"],
    }),
  });

  const verifyResult = await verifyResponse.json();

  if (!verifyResult.success) {
    return { statusCode: 403, headers, body: JSON.stringify({ error: "Verification failed. Please try again." }) };
  }

  return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
};

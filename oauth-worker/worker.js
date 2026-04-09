/**
 * Cloudflare Worker — OAuth proxy for Decap CMS + GitHub
 *
 * Environment variables (set via `wrangler secret put`):
 *   GITHUB_CLIENT_ID     — from your GitHub OAuth App
 *   GITHUB_CLIENT_SECRET — from your GitHub OAuth App
 *
 * Decap CMS hits:
 *   GET /auth          → redirects to GitHub authorization
 *   GET /callback      → exchanges code for token, posts it back to CMS
 */

const GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
const SCOPES = "repo,user";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }

    if (url.pathname === "/auth") {
      return handleAuth(url, env);
    }

    if (url.pathname === "/callback") {
      return handleCallback(url, env);
    }

    return new Response("Not found", { status: 404 });
  },
};

function handleAuth(url, env) {
  const params = new URLSearchParams({
    client_id: env.GITHUB_CLIENT_ID,
    redirect_uri: `${url.origin}/callback`,
    scope: SCOPES,
    state: crypto.randomUUID(),
  });

  return Response.redirect(`${GITHUB_AUTHORIZE_URL}?${params}`, 302);
}

async function handleCallback(url, env) {
  const code = url.searchParams.get("code");

  if (!code) {
    return new Response("Missing code parameter", { status: 400 });
  }

  // Exchange the code for an access token
  const tokenResponse = await fetch(GITHUB_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const tokenData = await tokenResponse.json();

  if (tokenData.error) {
    return new Response(`GitHub OAuth error: ${tokenData.error_description}`, {
      status: 401,
    });
  }

  // Decap CMS expects the token delivered via postMessage from a popup window
  const body = `
<!DOCTYPE html>
<html>
<head><title>Authorising…</title></head>
<body>
  <script>
    (function() {
      function recieveMessage(e) {
        console.log("recieveMessage %o", e);
        window.opener.postMessage(
          'authorization:github:success:${JSON.stringify({ token: tokenData.access_token, provider: "github" })}',
          e.origin
        );
        window.removeEventListener("message", recieveMessage, false);
      }
      window.addEventListener("message", recieveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    })();
  </script>
</body>
</html>`;

  return new Response(body, {
    status: 200,
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  });
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

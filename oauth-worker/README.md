# TTfE OAuth Worker

Cloudflare Worker that acts as an OAuth proxy for Decap CMS + GitHub.

## Setup

### 1. Create a GitHub OAuth App

1. Go to **GitHub → Settings → Developer Settings → OAuth Apps → New OAuth App**
2. Fill in:
   - **Application name**: TTfE CMS
   - **Homepage URL**: `https://ttfe.org.uk`
   - **Authorization callback URL**: `https://ttfe-oauth.<YOUR-CF-SUBDOMAIN>.workers.dev/callback`
3. Note the **Client ID** and generate a **Client Secret**

### 2. Deploy the Worker

```bash
cd oauth-worker
npm install
npx wrangler login          # authenticate with Cloudflare
npx wrangler deploy          # deploy the worker
```

### 3. Set secrets

```bash
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
```

Paste the values from step 1 when prompted.

### 4. Update CMS config

Edit `pf-site/admin/config.yml` and replace the placeholder `base_url` with your
actual Worker URL (shown after `wrangler deploy`):

```yaml
base_url: https://ttfe-oauth.<YOUR-CF-SUBDOMAIN>.workers.dev
```

### 5. (Optional) Custom domain

You can add a custom domain like `oauth.ttfe.org.uk` in the Cloudflare dashboard
under **Workers & Pages → ttfe-oauth → Settings → Triggers → Custom Domains**.
Update the GitHub OAuth App callback URL and `config.yml` to match.

## CMS user requirements

Anyone who needs to log into Decap CMS must have a GitHub account with **write
access** to the `dave-brookes-je/tram-trains` repository.

# Tram Trains for Edinburgh — Website

Campaign website for [Tram Trains for Edinburgh](https://www.ttfe.org.uk) (TTfE).

---

## TL;DR

This is a static website built with **Eleventy** (a static site generator), hosted
on **Cloudflare Pages**. News posts are edited through **Decap CMS** (a browser-based
content editor) which authenticates via a small **Cloudflare Worker** that handles
GitHub login.

To run the site locally:

```bash
cd pf-site
npm install
npm run serve
```

Then open http://localhost:8080 in your browser.

To add or edit pages, edit the Markdown files in `pf-site/src/pages/`. News posts
are in `pf-site/src/news/` and are usually edited via the CMS at
https://www.ttfe.org.uk/admin/.

---

## Table of Contents

- [How the site works](#how-the-site-works)
- [Repository structure](#repository-structure)
- [Getting started (local development)](#getting-started-local-development)
- [Editing content](#editing-content)
- [How hosting works (Cloudflare Pages)](#how-hosting-works-cloudflare-pages)
- [How the CMS works (Decap CMS)](#how-the-cms-works-decap-cms)
- [How authentication works (OAuth Worker)](#how-authentication-works-oauth-worker)
- [Deploying changes](#deploying-changes)
- [Setting up from scratch](#setting-up-from-scratch)
- [Useful commands](#useful-commands)
- [Troubleshooting](#troubleshooting)

---

## How the site works

The site is a collection of Markdown files that get converted into HTML pages by
a tool called [Eleventy](https://www.11ty.dev/). There is no database, no server
to manage, and no PHP — just static HTML, CSS, and images served from a CDN.

The rough flow is:

1. You write content in Markdown (`.md`) files
2. Eleventy reads those files and applies HTML templates (header, footer, navigation)
3. The output is a folder of plain HTML files (`_site/`)
4. Cloudflare Pages serves those files to visitors

Non-technical editors (e.g. writing news posts) don't need to touch any of this
directly — they use the CMS at https://www.ttfe.org.uk/admin/ which provides a
visual editor and saves changes as commits to this GitHub repository.

---

## Repository structure

```
tram-trains/
├── pf-site/                    # The website (everything below is inside here)
│   ├── src/                    # Source files — this is where content lives
│   │   ├── pages/              # Page content (Markdown)
│   │   │   ├── index.md        # Home page
│   │   │   ├── about.md        # About Us
│   │   │   ├── proposal.md     # Our Proposal
│   │   │   ├── tram-train.md   # What is a Tram Train
│   │   │   ├── join.md         # Join
│   │   │   ├── contact.md      # Contact Us
│   │   │   └── privacy.md      # Privacy Policy
│   │   ├── news/               # News posts (Markdown, managed via CMS)
│   │   ├── _includes/          # HTML templates (Nunjucks)
│   │   │   ├── base.njk        # Base layout (head, scripts, etc.)
│   │   │   ├── header.njk      # Site header and navigation
│   │   │   ├── footer.njk      # Site footer
│   │   │   └── post.njk        # News post layout
│   │   ├── _data/
│   │   │   └── site.json       # Site title, description, nav links
│   │   └── assets/
│   │       ├── css/style.css   # All the site styling
│   │       └── images/         # Site images
│   ├── admin/
│   │   ├── index.html          # Decap CMS entry point
│   │   └── config.yml          # CMS configuration
│   ├── .eleventy.js            # Eleventy configuration
│   ├── package.json            # Node.js dependencies
│   ├── netlify.toml            # Legacy Netlify config (kept for reference)
│   └── _site/                  # Build output (gitignored, don't edit)
│
├── oauth-worker/               # Cloudflare Worker for CMS authentication
│   ├── worker.js               # The OAuth proxy code
│   ├── wrangler.toml           # Worker deployment config
│   └── package.json            # Worker dependencies
│
└── map/                        # Route map assets
```

### Key files to know about

| File | What it does |
|------|-------------|
| `pf-site/src/pages/*.md` | The page content — edit these to change what's on the site |
| `pf-site/src/news/*.md` | News posts — usually edited via the CMS, not by hand |
| `pf-site/src/assets/css/style.css` | All the site's styling |
| `pf-site/src/_includes/base.njk` | The HTML wrapper around every page |
| `pf-site/src/_data/site.json` | Site title, description, and navigation links |
| `pf-site/admin/config.yml` | Decap CMS configuration |
| `pf-site/.eleventy.js` | Eleventy build configuration |

---

## Getting started (local development)

### Prerequisites

You need **Node.js** installed (version 18 or later).

- **Windows**: Download from https://nodejs.org/ — the LTS version is fine
- **Mac**: `brew install node` or download from https://nodejs.org/
- **Linux**: `sudo apt install nodejs npm` or use [nvm](https://github.com/nvm-sh/nvm)

To check if you have it: open a terminal and run `node --version`. You should
see something like `v20.x.x`.

You also need **Git** to clone the repository. If you're reading this, you
probably already have it.

### Clone and run

```bash
# Clone the repository
git clone https://github.com/dave-brookes-je/tram-trains.git
cd tram-trains/pf-site

# Install dependencies (only needed the first time, or after package.json changes)
npm install

# Start the local development server
npm run serve
```

This will:
- Build the site
- Start a local server at http://localhost:8080
- Watch for changes — when you edit a file, the browser will reload automatically

Press `Ctrl+C` to stop the server.

### Build without serving

```bash
cd pf-site
npm run build
```

This generates the site into the `_site/` folder without starting a server.
This is what Cloudflare runs when deploying.

---

## Editing content

### Pages

Page content is in `pf-site/src/pages/`. Each file is a Markdown file with
a YAML "frontmatter" block at the top:

```markdown
---
title: About Us
layout: base.njk
permalink: /about-us/
---

Your page content goes here. You can use **bold**, *italic*, [links](https://example.com),
bullet lists, and so on.
```

- `title` — the page title (appears in the browser tab and heading)
- `layout` — which template to wrap the content in (usually `base.njk`)
- `permalink` — the URL path for this page

Edit the content below the `---` block. Save the file, and if the dev server is
running it will rebuild automatically.

### News posts

News posts live in `pf-site/src/news/` and follow the naming convention
`YYYY-MM-DD-slug.md`. They are usually created and edited via the CMS (see below),
but you can also create them by hand.

### Images

Put images in `pf-site/src/assets/images/`. Reference them in Markdown like this:

```markdown
![Description of the image](/assets/images/your-image.jpg)
```

### Navigation

To add, remove, or reorder navigation links, edit `pf-site/src/_data/site.json`.

---

## How hosting works (Cloudflare Pages)

### What is Cloudflare Pages?

Cloudflare Pages is a free hosting service for static websites. When you push a
commit to the `main` branch on GitHub, Cloudflare automatically:

1. Pulls the latest code
2. Runs `npx @11ty/eleventy` in the `pf-site` directory
3. Takes the generated `_site/` folder and serves it globally via Cloudflare's CDN
4. Makes it available at ttfe.org.uk

You don't need to manually upload files, run a server, or manage infrastructure.

### Cloudflare dashboard

The Cloudflare Pages project is managed at https://dash.cloudflare.com/. You'll
need access to the TTfE Cloudflare account. From the dashboard you can:

- See build logs (useful if a deploy fails)
- Check deployment history
- Manage custom domains and DNS
- Set environment variables

### Build settings (configured in the Cloudflare dashboard)

| Setting | Value |
|---------|-------|
| Root directory | `pf-site` |
| Build command | `npx @11ty/eleventy` |
| Output directory | `_site` |
| `NODE_VERSION` env var | `20` |

### Preview deployments

When you open a pull request on GitHub, Cloudflare will automatically build a
preview version of the site at a temporary URL. This lets you check your changes
before merging to `main`.

---

## How the CMS works (Decap CMS)

### What is Decap CMS?

[Decap CMS](https://decapcms.org/) (formerly Netlify CMS) is a content management
system that runs entirely in the browser. It provides a visual editor for creating
and editing news posts without needing to know Markdown or Git.

To use it, go to https://www.ttfe.org.uk/admin/ and log in with your GitHub account.

### What can the CMS do?

- Create, edit, and delete news posts
- Upload images
- Preview posts before publishing

When you publish a post in the CMS, it creates a commit on the GitHub repository,
which triggers a new Cloudflare Pages build. The post will appear on the site
within a minute or two.

### CMS configuration

The CMS is configured in `pf-site/admin/config.yml`. This file controls:
- Which GitHub repo and branch to commit to
- Where uploaded images are stored
- What fields news posts have (title, date, body)

---

## How authentication works (OAuth Worker)

### The problem

Decap CMS needs to commit changes to GitHub on behalf of the editor. To do this
securely, it uses GitHub's OAuth flow — the editor logs in with their GitHub
account and grants the CMS permission to write to the repository.

GitHub's OAuth flow requires a "client secret" that must be kept private. Since
the CMS runs entirely in the browser (no server), we need a tiny server-side
component to handle the secret. That's what the OAuth Worker does.

### What is a Cloudflare Worker?

A Cloudflare Worker is a small piece of JavaScript that runs on Cloudflare's
servers. Think of it as a tiny API with two endpoints:

- `GET /auth` — redirects the user to GitHub's login page
- `GET /callback` — receives the login result from GitHub and passes the
  authentication token back to the CMS

It runs on Cloudflare's free tier (100,000 requests/day — we use a handful).

### The OAuth flow (step by step)

1. Editor goes to https://www.ttfe.org.uk/admin/ and clicks "Login with GitHub"
2. The CMS opens a popup to the Worker's `/auth` endpoint
3. The Worker redirects to GitHub's login page
4. The editor logs in and authorises the app
5. GitHub redirects back to the Worker's `/callback` endpoint with a temporary code
6. The Worker exchanges that code for an access token (using the client secret)
7. The Worker sends the token back to the CMS popup
8. The CMS uses the token to read/write to the GitHub repository

### Who can log in?

Anyone with a GitHub account who has **write access** to the
`dave-brookes-je/tram-trains` repository. To add a new editor:

1. Go to the repository on GitHub
2. Settings → Collaborators → Add people
3. Invite them by GitHub username or email
4. They accept the invitation and can then log into the CMS

---

## Deploying changes

### Automatic deployments (the normal way)

Push or merge to the `main` branch. Cloudflare Pages will build and deploy
automatically within a couple of minutes.

```bash
git add .
git commit -m "Update about page content"
git push
```

### Deploying the OAuth Worker

The Worker is a separate deployment. You only need to redeploy it if you change
`oauth-worker/worker.js` (which should be rare).

```bash
cd oauth-worker
npm install
npx wrangler deploy
```

You'll need to be logged into the Cloudflare account (`npx wrangler login`).

---

## Setting up from scratch

If you ever need to set up the entire hosting infrastructure from zero (e.g. moving
to a new Cloudflare account), here's the full process.

### 1. Cloudflare account

Sign up at https://dash.cloudflare.com/. The free plan is sufficient.

### 2. Add the domain

In the Cloudflare dashboard, add `ttfe.org.uk` as a site. Cloudflare will ask you
to update the domain's nameservers at your registrar to point to Cloudflare. Once
that propagates (can take up to 24 hours), Cloudflare manages DNS and SSL
automatically.

### 3. Create the Pages project

1. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages**
2. Connect your GitHub account and select the `dave-brookes-je/tram-trains` repo
3. Set the build settings:
   - **Root directory**: `pf-site`
   - **Build command**: `npx @11ty/eleventy`
   - **Output directory**: `_site`
4. Under **Environment variables**, add: `NODE_VERSION` = `20`
5. Deploy

### 4. Add the custom domain

In the Pages project settings, go to **Custom domains** and add `ttfe.org.uk`
(and `www.ttfe.org.uk`). If the domain is already on Cloudflare DNS, the records
are created automatically.

### 5. Create a GitHub OAuth App

1. Go to https://github.com/settings/developers
2. Click **OAuth Apps → New OAuth App**
3. Fill in:
   - **Application name**: `TTfE CMS`
   - **Homepage URL**: `https://www.ttfe.org.uk`
   - **Authorization callback URL**: `https://ttfe-oauth.<YOUR-CF-SUBDOMAIN>.workers.dev/callback`
     (you'll get the exact URL after deploying the Worker in the next step)
4. Click **Register application**
5. Note the **Client ID**
6. Click **Generate a new client secret** and copy it immediately (you won't see it again)

### 6. Deploy the OAuth Worker

```bash
cd oauth-worker
npm install
npx wrangler login
npx wrangler deploy
```

After deploying, Wrangler will print the Worker's URL (e.g.
`https://ttfe-oauth.<something>.workers.dev`). Now set the secrets:

```bash
npx wrangler secret put GITHUB_CLIENT_ID
# Paste the Client ID from step 5

npx wrangler secret put GITHUB_CLIENT_SECRET
# Paste the Client Secret from step 5
```

### 7. Update the CMS config

Edit `pf-site/admin/config.yml` and set `base_url` to the Worker URL from step 6:

```yaml
backend:
  name: github
  repo: dave-brookes-je/tram-trains
  branch: main
  base_url: https://ttfe-oauth.<YOUR-CF-SUBDOMAIN>.workers.dev
  auth_endpoint: auth
```

Commit and push this change. Cloudflare Pages will rebuild the site with the
updated CMS config.

### 8. Update the GitHub OAuth App callback URL

Go back to the GitHub OAuth App settings and update the callback URL to match
the Worker URL:

```
https://ttfe-oauth.<YOUR-CF-SUBDOMAIN>.workers.dev/callback
```

### 9. Test

1. Go to https://www.ttfe.org.uk/admin/
2. Click "Login with GitHub"
3. Authorise the app
4. Try creating a test news post
5. Check that it appears as a commit on the repository
6. Wait for Cloudflare Pages to rebuild and verify the post appears on the site

---

## Useful commands

All commands are run from the `pf-site/` directory unless stated otherwise.

| Command | What it does |
|---------|-------------|
| `npm run serve` | Start local dev server with auto-reload |
| `npm run build` | Build the site to `_site/` |
| `cd ../oauth-worker && npx wrangler deploy` | Deploy the OAuth Worker |
| `cd ../oauth-worker && npx wrangler dev` | Run the OAuth Worker locally |
| `cd ../oauth-worker && npx wrangler tail` | Stream live Worker logs |

---

## Troubleshooting

### The site won't build locally

- Make sure you're in the `pf-site` directory, not the repo root
- Run `npm install` to ensure dependencies are installed
- Check you have Node.js 18+ (`node --version`)

### CMS login isn't working

- Check the OAuth Worker is deployed: visit the Worker URL in a browser — you
  should see "Not found" (that's correct, it only responds to `/auth` and
  `/callback`)
- Check the `base_url` in `admin/config.yml` matches the Worker URL exactly
- Check the GitHub OAuth App callback URL matches `<worker-url>/callback`
- Check the GitHub secrets are set: `cd oauth-worker && npx wrangler secret list`

### Changes aren't appearing on the live site

- Check the Cloudflare Pages dashboard for build errors
- Builds typically take 30-60 seconds
- Make sure changes were pushed to the `main` branch

### Someone can't log into the CMS

- They need a GitHub account
- They need write access to the repository (Settings → Collaborators)
- They need to accept the collaborator invitation via email

### The Worker URL changed

If you redeploy the Worker under a different name or account:
1. Update `base_url` in `pf-site/admin/config.yml`
2. Update the callback URL in the GitHub OAuth App settings
3. Commit and push

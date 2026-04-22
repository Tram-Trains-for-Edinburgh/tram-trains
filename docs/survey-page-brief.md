# TTfE `/survey` page — Claude Code brief

I'm adding a new page to the TTfE website at `/survey`. The site is Eleventy (11ty) + Nunjucks, hosted on Netlify, content managed via Decap CMS. Repo: `github.com/Tram-Trains-for-Edinburgh/tram-trains`, site at `/pf-site`.

**Before writing anything, read the existing site structure** — look at how other pages are built (templates, layouts, front matter, nav configuration) and match those patterns. Do not invent new styling or components. The new page should feel native to the site.

**Page route:** `ttfe.org.uk/survey`

**Add to main navigation.**

## Page content

**H1:** Have your say on restoring the South Sub

**Subhead:** Your response shapes the campaign to restore passenger services to Edinburgh's South Suburban Railway.

**Body paragraph 1:** The South Sub is the freight-only railway curving through south Edinburgh from Gorgie to Portobello. It last carried passengers in 1962. Restoring passenger services using tram-train technology would link the South Sub with Edinburgh's existing tram network, opening up fast, direct journeys across the City of Edinburgh and the Lothians.

**Body paragraph 2:** We're asking anyone with a view — whether you live nearby, travel across the city, or just care about Edinburgh's transport future — to tell us how you get around today, which stops you'd use, and what matters most to you. Your answers help us make the case to councillors, MSPs and Transport Scotland.

**Body paragraph 3:** The survey takes about five minutes. Your response is anonymous unless you choose to share your email.

## Embedded form

```html
<iframe
  src="https://docs.google.com/forms/d/e/1FAIpQLScrmpyBPvrFbZUzjEAl8pvlZVPt8waHKc9DUdnp2hx_VTO6ZQ/viewform?embedded=true"
  width="100%"
  height="2400"
  frameborder="0"
  marginheight="0"
  marginwidth="0"
  title="TTfE South Sub survey">
  Loading survey…
</iframe>
```

The iframe must have `max-width: 100%` in CSS so it doesn't overflow on mobile.

## Below the embed

Having trouble loading the survey? [Open it in a new tab →](https://docs.google.com/forms/d/e/1FAIpQLScrmpyBPvrFbZUzjEAl8pvlZVPt8waHKc9DUdnp2hx_VTO6ZQ/viewform)

The fallback link should open in a new tab (`target="_blank" rel="noopener"`).

## Terminology guardrail — important

The page copy uses "restoring passenger services," not "reopening." The embedded Google Form uses the older "reopening" language in its own header; we cannot edit the form without disrupting the existing response dataset. The native page copy compensates. Do not change "restoring" to "reopening" anywhere on the page for consistency with the form — the page leads, the form follows.

## Brand colours (if needed for styling hooks)

- Navy: `#012440`
- Mid blue: `#0E4973`
- Crimson: `#860C2D`

Only use these if the existing site patterns call for brand colours — otherwise inherit whatever the existing page templates use.

## Please confirm before committing

1. Which existing template/layout you based the page on
2. Where you added the nav entry
3. The commit message you'll use

# TTfE `/write-to-your-reps` page — Claude Code brief

I'm adding a new page to the TTfE website at `/write-to-your-reps`. The site is Eleventy (11ty) + Nunjucks, hosted on Netlify, content managed via Decap CMS. Repo: `github.com/Tram-Trains-for-Edinburgh/tram-trains`, site at `/pf-site`.

**Before writing anything, read the existing site structure** — look at how other pages are built (templates, layouts, front matter, nav configuration, existing CSS patterns) and match those patterns. Do not invent new styling or components. The new page should feel native to the site.

**Page route:** `ttfe.org.uk/write-to-your-reps`

**Add to main navigation.**

---

## Page structure

1. H1 + short intro
2. Three template sections, each with:
   - A heading (MSP / City Councillor / MP)
   - A "Find your [rep]" link above the template
   - The template text in a styled block
   - A **Copy** button that copies the template text (and only the template text — not the heading, not the "find your rep" link) to the clipboard

Templates must be visually distinct blocks. Users will scan for the one that applies to them, copy it, and paste into their email client. Keep the layout simple and scannable.

---

## Page content

### H1

Write to your elected representatives

### Intro paragraph

One of the most effective things you can do to support the campaign is write to your elected representatives. Below are three template letters — one each for your MSP, your City of Edinburgh councillor, and your UK MP. Copy the one that applies, personalise it, and send. Letters written in your own words carry more weight than templates sent unchanged, so please edit freely before sending.

---

## Template 1: MSP

### Heading

Write to your MSP

### Above the template

**Find your MSP:** [Current and previous Members of the Scottish Parliament (MSPs) | Scottish Parliament Website](https://www.parliament.scot/msps/current-and-previous-msps)

### Template text (this is what the Copy button copies)

```
Dear [name]

Recently I was excited to hear about a proposal (from Tram Trains for Edinburgh) to get public transport back on the South Suburban railway. This line has lain little used for many years and to use it for a tram service seems really useful for local residents, would provide fast journey connections to places outside the City, and it should be relatively easy to build given the line is already there. In particular:

- The route serves various work and shopping destinations not well served by the bus network
- These places are also hard to reach by car given the frequent congestion
- Some of these areas aren't well off and many residents don't have access to a car — so they need public transport
- Edinburgh and the Lothians are growing fast, and we need a better public transport system as an alternative to slow car or bus journeys
- With the railway already there, disruption to build it will be minimal

[feel free to add or delete bullet points]
[add points that are important to you]

In the light of the above please confirm that you will fully support the proposal when it is raised in the Scottish Parliament or in parliamentary committees. It really should be a priority to improve public transport across the south side.

With thanks
[name]
```

---

## Template 2: City Councillor

### Heading

Write to your City Councillor

### Above the template

**Find your Edinburgh Councillor:** [Find Councillor - Modern Council](https://democracy.edinburgh.gov.uk/mgFindMember.aspx)

### Template text (this is what the Copy button copies)

```
Dear [name]

Recently I was excited to hear about a proposal, from Tram Trains for Edinburgh, to get public transport back on the South Suburban railway. This line has been little used for many years and to use it for a tram service seems really useful for local residents and it should be relatively easy to build, given the line is there. In particular:

- The route serves various work, shopping and entertainment destinations not well served by the bus network
- These places are also hard to reach by car given the frequent congestion
- Some of these areas aren't well off and many residents don't have access to a car — so they need public transport
- Edinburgh is growing and we need a better public transport system as an alternative to slow car or bus journeys
- With the railway already there, disruption to build it will be minimal

[feel free to add or delete bullet points]
[add points that are important to you]

I know the Council is studying an extension of the tram network. Reopening the South Sub could create a tram interchange at Cameron Toll and offer many more journey options, so please consider the South Sub route together with your other plans. We also think Lothian Buses does a great job but the bus service cannot connect the destinations across the South side, as this proposal would.

In the light of the above please confirm that you will fully support the proposal when it is raised in Council Meetings or at the Transport and Environment Committee.

With thanks
[name]
```

---

## Template 3: MP

### Heading

Write to your MP

### Above the template

**Find your MP:** [Find your MP - MPs and Lords - UK Parliament](https://members.parliament.uk/FindYourMP)

### Template text (this is what the Copy button copies)

```
Dear [name]

Recently I was excited to hear about a proposal (from Tram Trains for Edinburgh) to get public transport back on Edinburgh's South Suburban railway. This line has been little used for many years and to use it for a tram service seems really useful for local residents, would provide fast journey connections to places outside the City, and it should be relatively easy to build given the line is already there. In particular:

- The route serves various work and shopping destinations not well served by the bus network
- These places are also hard to reach by car given the frequent congestion
- Some of these areas aren't well off and many residents don't have access to a car — so they need public transport
- Edinburgh and the Lothians are growing fast, and we need a better public transport system as an alternative to slow car or bus journeys
- With the railway already there, disruption to build it will be minimal

[feel free to add or delete bullet points]
[add points that are important to you]

In the light of the above please confirm that you will fully support the proposal and urge the Scottish and UK governments to work together to get this important project built. It really should be a priority to improve public transport across the south side.

With thanks
[name]
```

---

## Copy button implementation

Each template block needs a **Copy** button that copies the template body text to the clipboard. Requirements:

- Use the modern `navigator.clipboard.writeText()` API with a graceful fallback for older browsers (e.g. `document.execCommand('copy')` on a hidden textarea).
- The button label should change briefly on success — e.g. "Copy" → "Copied!" for ~2 seconds, then revert.
- The button must be visually prominent and positioned clearly next to or above each template (not buried below).
- The copied content must be the **template text only** — the greeting line through "With thanks / [name]" — not the heading, not the "Find your MSP" link, not the H1 or intro.
- Preserve line breaks and paragraph spacing in the clipboard output so it pastes cleanly into Gmail, Outlook, and Apple Mail.
- Bullet points should paste as plain text with a hyphen or bullet character, not as HTML list markup — this pastes more reliably across email clients.
- The button must be keyboard-accessible (real `<button>` element, not a `<div>`) with an appropriate `aria-label` such as "Copy MSP letter to clipboard".

Implementation can be a small inline JavaScript block at the bottom of the page or a separate JS file — match whatever pattern the existing site uses.

---

## Styling

- Each of the three templates should be in a visually distinct card or block — padding, subtle background tint, or border. Match existing site component patterns.
- The template text should be in a monospace or clearly distinguishable font/background so users understand it's the copyable content, not body prose.
- The Copy button should use one of the TTfE brand colours as an accent if the site pattern supports it:
  - Navy `#012440`
  - Mid blue `#0E4973`
  - Crimson `#860C2D`
- Mobile: make sure the Copy button remains easily tappable (minimum 44×44px target) and that template blocks don't overflow horizontally.

---

## Terminology note

The template text is kept **verbatim as supplied by the campaign chair**. Do not edit the template wording. The only permitted changes are typo fixes already applied in this brief (e.g. "Scottish parliament" → "Scottish Parliament", consistent em-dashes and bullet formatting).

Do not change "reopening" to "restoring" in the template text even though the rest of the site uses "restoring." The templates are supplied as-is.

---

## Please confirm before committing

1. Which existing template/layout the page is based on
2. Where the nav entry was added
3. The commit message you'll use
4. That the Copy button works on desktop Chrome, desktop Safari, and iOS Safari (mobile Safari's clipboard API has historical quirks)

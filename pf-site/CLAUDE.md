# TTfE Website — Claude Code Build Instructions

## Context

You are building a static campaign website for **Tram Trains for Edinburgh** (ttfe.co.uk).
This is a monorepo at https://github.com/dave-brookes-je/tram-trains.
The website root is at `/pf-site`. All paths, config files, and build commands
are relative to `/pf-site` unless otherwise stated.

---

## Stack

- **Static site generator**: Eleventy (11ty)
- **Templating language**: Nunjucks
- **CMS**: Decap CMS (news posts only)
- **Authentication**: Netlify Identity
- **Hosting**: Netlify

---

## Project Structure

Create the following structure inside `/pf-site`:

```
pf-site/
  src/
    _includes/
      base.njk          # Base HTML layout (head, header, footer)
      header.njk        # Site header and nav
      footer.njk        # Site footer with "Contact Us"
    _data/
      site.json         # Site title, description, nav links
    assets/
      css/
        style.css       # Main stylesheet
      images/           # Site images (already populated in repo)
    pages/
      index.md          # Home page
      about.md          # About Us
      proposal.md       # Our Proposal
      tram-train.md     # What is a Tram Train
      join.md           # Join
    news/
      .gitkeep          # Rob edits this via Decap CMS
  admin/
    index.html          # Decap CMS entry point
    config.yml          # Decap CMS configuration
  _site/                # Build output — gitignored
  .eleventy.js          # Eleventy config
  netlify.toml          # Netlify build config
  .gitignore
  package.json
```

---

## Eleventy Config (.eleventy.js)

- Input directory: `src`
- Output directory: `_site`
- Both relative to `/pf-site`
- Add a `news` collection, sorted by date descending
- Pass through the `assets` directory unchanged
- Use Nunjucks as the default template engine for `.md` files

---

## Netlify Config (netlify.toml)

```toml
[build]
  base    = "pf-site"
  command = "npx @11ty/eleventy"
  publish = "pf-site/_site"
```

---

## .gitignore

```
node_modules/
_site/
```

---

## Decap CMS

### admin/index.html
Standard Decap CMS entry point loading the CMS bundle from CDN.

### admin/config.yml

```yaml
backend:
  name: git-gateway
  branch: main

media_folder: src/assets/images
public_folder: /assets/images

collections:
  - name: news
    label: News
    folder: src/news
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - { label: Title, name: title, widget: string }
      - { label: Date, name: date, widget: datetime }
      - { label: Body, name: body, widget: markdown }
```

---

## Brand Colours

```css
--color-navy:   #012440;
--color-blue:   #0E4973;
--color-crimson: #860C2D;
--color-white:  #FFFFFF;
--color-text:   #2a2a2a;
--color-bg:     #FFFFFF;
--color-grey-light: #f5f5f5;
```

---

## Typography

Load both fonts via Google Fonts in `base.njk` `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600&family=Inter:wght@400;500&display=swap" rel="stylesheet">
```

Apply in CSS:

```css
--font-heading: 'Fraunces', serif;
--font-body:    'Inter', system-ui, sans-serif;

body {
  font-family: var(--font-body);
  font-size: 18px;
  line-height: 1.7;
  color: var(--color-text);
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.02em;
}
```

---

## Design & Layout

Reproduce the look and feel of the existing site at https://www.ttfe.co.uk as
closely as practical:

- White page background
- Dark navy (`#012440`) header and footer
- Nav: TTfE logo left, nav links right — white text on navy
- Clean single-column page layouts, generous padding (max-width ~800px centred)
- Body text in `#2a2a2a`, not pure black
- Crimson (`#860C2D`) for CTA buttons and accent elements
- News index: posts as simple cards with title, date, and excerpt

**Mobile:**
- Hamburger menu replacing the nav links
- Single column layout throughout
- Touch-friendly tap targets

**General:**
- No CSS frameworks — custom CSS only
- Semantic HTML5 throughout
- Do not introduce design elements that don't exist on the current site
- The goal is functional equivalence with clean, well-structured code

---

## Images

Images are in `/pf-site/src/assets/images/`. Reference them in templates
using the following filenames:

| File | Used on |
|------|---------|
| `logo.png` | Header (all pages) |
| `home-cover.jpg` | Home page hero |
| `about-murrayfield-tram.jpg` | About Us — top of page |
| `about-council-map.jpg` | About Us — bottom of page |
| `proposal-map-1.jpg` | Our Proposal — route overview |
| `proposal-map-2.jpg` | Our Proposal — second map |
| `proposal-newington.jpg` | Our Proposal — station grid |
| `proposal-portobello.jpg` | Our Proposal — station grid |
| `proposal-murrayfield-station.jpg` | Our Proposal — station grid |
| `proposal-morningside.jpg` | Our Proposal — station grid |
| `tram-train-sheffield.jpg` | What is a Tram Train |
| `join-murrayfield-stop.jpg` | Join page |

If an image file is not yet present, render a placeholder `<div>` with a light
grey background (`#e8e8e8`), minimum height 300px, and the image description
as centred text. This allows layout review before images are added.

---

## Page Content

### HOME (src/pages/index.md)

Frontmatter:
```yaml
---
title: Home
layout: base.njk
permalink: /
---
```

Sections:
- Hero: large heading "Tram Trains for Edinburgh" with introductory
  paragraph below
- Body paragraph explaining the campaign (single column)
- Crimson "Join" CTA button linking to `/join/`
- Hero image: `home-cover.jpg`

---

### ABOUT US (src/pages/about.md)

Frontmatter:
```yaml
---
title: About Us
layout: base.njk
permalink: /about-us/
---
```

Sections:
- Full-width image: `about-murrayfield-tram.jpg` with alt text
  "Edinburgh tram at Murrayfield"
- Launch paragraph: TTfE was launched in October 2025 with a public
  meeting. Individual Edinburgh residents came forward to support a
  campaign that has become popular across the city.
- Proposal summary paragraph: route from Portobello and Brunstane
  in the east, through Cameron Toll, Newington and Craiglockhart,
  to Gorgie and Murrayfield in the west, linking into the tram line
  from the Airport to the City Centre.
- "We are a voluntary group" paragraph (note: must include the
  article "a" — a known error on the existing site)
- Campaign activities as a bulleted list:
  - Building support from local residents with public meetings
  - Engaging with transport professionals at City, Region and
    National level to get the South Sub built
  - Convincing Edinburgh businesses, educational institutions and
    other civic bodies to support the scheme
  - Publicising the scheme through traditional and social media
- Bold closing statement
- Edinburgh Council map image: `about-council-map.jpg`
- "Join" CTA button

---

### OUR PROPOSAL (src/pages/proposal.md)

Frontmatter:
```yaml
---
title: Our Proposal
layout: base.njk
permalink: /our-proposal/
---
```

Sections:
- Introductory paragraph about tram-trains as hybrid vehicles that
  can run on railway tracks or tram tracks
- Map image: `proposal-map-1.jpg`
- Bold subheading: "What's the proposal — in practical terms?"
- Body text covering:
  - Route: Murrayfield and Haymarket via Gorgie and Morningside
    to Niddrie and Brunstane
  - Frequency: 4 or 6 trams per hour
  - Western end: engineering challenge crossing the
    Edinburgh-Glasgow main line
  - Eastern end: route crossing the East Coast railway
    via Sir Harry Lauder Road
- Second map image: `proposal-map-2.jpg`
- Subheading: "Some proposed station locations"
- 2x2 image grid with captions:
  - `proposal-newington.jpg` — "Newington station site"
  - `proposal-portobello.jpg` — "Proposed Portobello station site"
  - `proposal-murrayfield-station.jpg` — "Murrayfield tram station"
  - `proposal-morningside.jpg` — "Morningside station"

---

### WHAT IS A TRAM TRAIN (src/pages/tram-train.md)

Frontmatter:
```yaml
---
title: What is a Tram Train
layout: base.njk
permalink: /what-is-a-tram-train/
---
```

Sections:
- Large intro paragraph: a tram-train is a versatile public transport
  vehicle that acts as a bridge between a traditional tram and a
  heavy rail train
- Subheading: "How they work"
- Three bullet points:
  - Dual voltage: can switch between 750V DC (tram) and 25kV AC (rail)
  - Wheel profile: designed to handle both shallow street grooves
    and deeper mainline rail
  - Crashworthiness: built sturdier than standard trams for mixed
    running with freight trains
- Subheading: "History and rollout in the UK"
- Subheading: "The Sheffield-Rotherham pilot (2018)"
- Bullet points covering route and Tinsley Chord transition
- Subheading: "South Wales Metro"
- Bullet points on Valleys lines conversion and frequency improvements
- Subheading: "Future prospects"
- Paragraph referencing Greater Manchester Metrolink and Glasgow
  airport link
- Image: `tram-train-sheffield.jpg` with caption "Tram train
  in Sheffield"
- "Join" CTA button

---

### JOIN (src/pages/join.md)

Frontmatter:
```yaml
---
title: Join
layout: base.njk
permalink: /join/
---
```

Sections:
- Introductory paragraph inviting people to join and describing
  ways to help
- Member benefits paragraph: members get to decide strategy,
  attend member meetings several times a year, and find out
  more about how communities get around the city
- Membership cost: £10 p.a.
- "Please complete the form below" instruction line
- Google Form embed placeholder: `<div>` with note
  "Google Form embed goes here"
- Image: `join-murrayfield-stop.jpg`

---

### NEWS (src/news/)

**Index page** (src/news/index.njk):

Frontmatter:
```yaml
---
title: News
layout: base.njk
permalink: /news/
---
```

- Loop through the `news` collection, newest first
- Each post rendered as a card: title (linked), date, excerpt
  (first 150 characters of content)

**Individual post layout** (src/_includes/post.njk):
- Title as h1
- Date formatted as "DD Month YYYY"
- Full body content

**Placeholder post** (src/news/2025-10-01-launch.md):
```yaml
---
title: Tram Trains for Edinburgh launches
date: 2025-10-01
layout: post.njk
permalink: /news/{{ page.fileSlug }}/
---
```
Body: short placeholder paragraph confirming the news
collection is working.

---

## Navigation

Nav links in order:
1. Home — `/`
2. About Us — `/about-us/`
3. Our Proposal — `/our-proposal/`
4. What is a Tram Train — `/what-is-a-tram-train/`
5. Join — `/join/`
6. News — `/news/`

Active state: highlight the current page link in crimson.

---

## Global Footer

Simple footer on all pages:
- Dark navy background (`#012440`)
- White text
- "Contact Us" text centred (matching existing site)

---

## Final Checks

Before finishing, verify:
1. `npx @11ty/eleventy` runs without errors from `/pf-site`
2. All six pages generate in `_site`
3. The news collection generates the index and the placeholder post
4. The `admin/` directory is copied through to `_site/admin/`
5. No hardcoded absolute paths — all internal links use relative
   or root-relative paths
6. `_site/` is gitignored

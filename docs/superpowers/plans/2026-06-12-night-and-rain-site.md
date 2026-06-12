# Night & Rain Direct-Booking Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a static brand site at nightandrain.com for the four Joshua Tree stays, with per-property pages ready to receive Hospitable Direct booking widgets.

**Architecture:** Content (copy, amenities, photos) is pulled once from the Hospitable MCP into `site/data/properties.json` + downloaded images; a tiny zero-dependency Node script renders the four stay pages from one HTML template; everything else is hand-coded static HTML/CSS. The only live/dynamic element on the site is the Hospitable booking widget embedded per stay page (fallback: email CTA until Direct is activated).

**Tech Stack:** Static HTML/CSS (no framework), one Node 18+ generator script (`node scripts/generate.mjs`, no npm deps), Hospitable MCP for content pull, Claude Preview / browser screenshots for verification, host: Netlify or Cloudflare Pages free tier (verify current limits at deploy time — do not claim "free" without checking).

**Stay names (proposed, pending Rafa's sign-off — trivially renameable):**

| Hospitable UUID | OTA listing | Night & Rain name | Slug |
|---|---|---|---|
| `8878daf6-…` | Tiny Home w Pool, Hot Tub, Sauna, Golf | **The Night House** | `night-house` |
| `e82db06c-…` | Oasis w Pool, Sauna, Mini Golf | **The Rain House** | `rain-house` |
| `bf0f6e37-…` | Joshua Tree Oasis • Pickleball • Pool • Jacuzzi | **The Oasis** | `the-oasis` |
| `547bbb9c-…` | Joshua Tree Dream \| Pool, Pickleball, Dome | **The Dome** | `the-dome` |

(The two tiny homes are literally named "Night" and "Rain" — the brand pair.)

---

### Task 1: Content pull from Hospitable

**Files:**
- Create: `site/data/properties.json`
- Create: `site/assets/img/<slug>/NN.jpg` (≤10 images per stay)

- [ ] **Step 1:** Via Hospitable MCP, call `get-property` (or reuse the already-saved get-properties payload at the tool-results path from this session) for the 4 UUIDs; call `get-property-images` for each. (MCP requires `get-tool-schema` first for any unloaded tool.)
- [ ] **Step 2:** Write `site/data/properties.json` — array of 4 objects with this exact shape:

```json
{
  "slug": "night-house",
  "stayName": "The Night House",
  "uuid": "8878daf6-0d90-4eeb-a2ec-7864e8633a91",
  "otaName": "Tiny Home w Pool, Hot Tub, Sauna, Golf & More!",
  "town": "Yucca Valley",
  "tagline": "",
  "summary": "",
  "description": "",
  "sleeps": 4, "bedrooms": 1, "beds": 1, "bathrooms": 1,
  "amenitiesTop": ["Pool", "Hot tub", "Sauna", "Mini golf"],
  "amenitiesAll": [],
  "checkin": "16:00", "checkout": "11:00",
  "images": [{"file": "01.jpg", "caption": ""}]
}
```

`tagline` is brand copy written fresh (one line, desert-night voice). `description` is the OTA description lightly cleaned (strip OTA-isms like "*****Sleeps X*****").
- [ ] **Step 3:** Download up to 10 best images per stay with `curl -L -o site/assets/img/<slug>/NN.jpg "<url>"`. Verify each file >20KB (`find site/assets/img -size -20k` returns nothing).
- [ ] **Step 4:** Commit: `git add -A && git commit -m "feat: pull property content and images from Hospitable"`

### Task 2: Design system + shared shell

**Files:**
- Create: `site/css/styles.css`
- Create: `site/partials/head.html`, `site/partials/header.html`, `site/partials/footer.html` (consumed by the generator and copy-pasted into hand-written pages)

- [ ] **Step 1:** Write `styles.css` design tokens + components. Core tokens:

```css
:root {
  --night: #141329;        /* deep indigo night sky */
  --night-soft: #232145;
  --sand: #e8ddc9;         /* desert sand */
  --sand-soft: #f5efe2;
  --terracotta: #c96f4a;   /* accent / CTAs */
  --star: #f7e9b0;         /* starlight highlight */
  --ink: #1d1b16;
  --font-display: "Fraunces", Georgia, serif;
  --font-body: "Inter", -apple-system, sans-serif;
}
```

Components: sticky translucent header, hero w/ starfield gradient, `.stay-card` grid, `.amenity-pill`, `.cta-button` (terracotta), `.why-direct` strip, footer with "A Knight & Reign Properties brand" + email capture form (`action` placeholder-free: posts to a `mailto:` fallback now, GHL form URL later — wired in CRM phase). Google Fonts loaded via `<link>` (Fraunces + Inter). Mobile-first; single breakpoint at 760px.
- [ ] **Step 2:** Use the frontend-design skill for the visual pass — this is a consumer hospitality brand; it must look premium, not template-y.
- [ ] **Step 3:** Commit.

### Task 3: Generator + stay pages

**Files:**
- Create: `scripts/generate.mjs`
- Create (generated): `site/stays/<slug>/index.html` ×4

- [ ] **Step 1:** Write `scripts/generate.mjs` (no deps): reads `site/data/properties.json` + `site/partials/*.html` + `scripts/stay-template.html`, replaces `{{tokens}}`, writes each `site/stays/<slug>/index.html`. Tokens: `{{stayName}} {{tagline}} {{description_html}} {{amenities_pills}} {{gallery}} {{sleeps}} {{bedrooms}} {{bathrooms}} {{town}} {{uuid}} {{checkin}} {{checkout}}`.
- [ ] **Step 2:** Write `scripts/stay-template.html`: hero image, name + tagline, facts bar (sleeps/bd/ba/town), gallery grid (lightbox-free, simple), description, amenities, **booking section**:

```html
<section id="book" class="booking">
  <h2>Check availability</h2>
  <!-- HOSPITABLE-WIDGET:{{uuid}} — replace this comment with the embed snippet
       from Hospitable → Direct → Widgets once Direct is activated.
       Container must be ≥320px wide × ≥900px tall. -->
  <div class="booking-fallback">
    <p>Direct booking is launching — email us for dates and our best rate.</p>
    <a class="cta-button" href="mailto:rafa@knightandreign.com?subject=Booking%20inquiry%3A%20{{stayName}}">Email to book</a>
  </div>
</section>
```

- [ ] **Step 3:** Run `node scripts/generate.mjs`; verify 4 files exist and contain their stay names (`grep -l "The Dome" site/stays/the-dome/index.html`).
- [ ] **Step 4:** Commit.

### Task 4: Homepage + About

**Files:**
- Create: `site/index.html`, `site/about/index.html`

- [ ] **Step 1:** `index.html`: hero (night-sky gradient + star texture + best photo), brand line ("Desert stays under Joshua Tree skies"), 4 stay cards (image, name, sleeps/bd, "From the desert" tagline, link), "Why book direct" strip (3 cards: *Best rate, guaranteed* / *Talk to the actual hosts* / *No platform fees*), email-capture footer.
- [ ] **Step 2:** `about/index.html`: Night & Rain story (sister brand wordplay of Knight & Reign; experiential desert stays), photo strip, footer entity line.
- [ ] **Step 3:** Commit.

### Task 5: Verification pass

- [ ] **Step 1:** Serve locally: `python3 -m http.server 4173 -d site` (background).
- [ ] **Step 2:** Browser/preview screenshots: homepage + one stay page, mobile (390px) and desktop (1280px). Check: no broken images, readable contrast, cards align, fallback CTA visible.
- [ ] **Step 3:** Link check: every `<a href>` on every page resolves (script: crawl local pages with node, assert 200/file-exists).
- [ ] **Step 4:** Fix issues found; commit.

### Task 6: Deploy prep (blocked on domain purchase)

- [ ] **Step 1:** Write `README.md`: how to re-pull content, regenerate, deploy.
- [ ] **Step 2:** When Rafa confirms domain: pick host (Netlify or Cloudflare Pages — check current free-tier limits at that moment and report honestly), deploy `site/`, connect nightandrain.com via DNS records in Wix's DNS panel, verify HTTPS.
- [ ] **Step 3:** After Rafa activates Hospitable Direct: generate per-property widget embeds in Hospitable, replace the `HOSPITABLE-WIDGET` comments, regenerate, redeploy, run one end-to-end test booking.

**Out of scope for this plan:** GHL/Boostly wiring, email campaigns, lead-magnet page (`/joshua-tree-guide/`), Instagram setup — phase 2 plans.

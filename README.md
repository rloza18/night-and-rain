# Night & Rain — Direct Booking Site

Brand site for the four Joshua Tree / Yucca Valley stays under **Knight & Reign
Properties**. Static HTML/CSS, no framework, no build dependencies.

## Layout

- `site/` — the deployable site (point any static host at this folder)
  - `index.html`, `about/index.html` — hand-written pages
  - `stays/<slug>/index.html` — **generated** per-property pages (don't edit by hand)
  - `data/properties.json` — brand layer: stay names, taglines, top amenities, image picks
  - `data/raw-properties.json` — raw Hospitable property data (source for descriptions/facts)
  - `assets/img/<slug>/` — downloaded property photos
  - `css/styles.css` — the whole design system
- `scripts/generate.mjs` — renders stay pages from data + `scripts/stay-template.html`
- `scripts/download-images.sh` — re-runnable image fetch from Hospitable CDN
- `docs/superpowers/` — design spec and implementation plan

## Common tasks

- **Edit a stay's copy/name/amenities:** edit `site/data/properties.json`, then
  `node scripts/generate.mjs`
- **Refresh photos:** edit `scripts/download-images.sh`, run it, regenerate
- **Refresh property facts from Hospitable:** re-pull via the Hospitable MCP into
  `site/data/raw-properties.json`, regenerate
- **Preview locally:** `python3 -m http.server 4173 -d site` → http://localhost:4173

## Booking widgets (pending)

Each stay page has a `HOSPITABLE-WIDGET:<uuid>` comment in its `#book` section.
Once Hospitable Direct is activated: Hospitable → Direct → Widgets → copy each
property's embed snippet into `scripts/stay-template.html`'s booking section
(or per-page), regenerate, redeploy. Widget container must be ≥320px wide ×
≥900px tall. Until then, pages show an "Email to book" fallback.

## Deploy (pending domain purchase)

Target: nightandrain.com. Host: Netlify or Cloudflare Pages — verify current
free-tier limits at deploy time. DNS lives wherever the domain is registered.

The four properties (Hospitable UUIDs):

| Stay | Slug | UUID |
|---|---|---|
| The Night House | `night-house` | `8878daf6-0d90-4eeb-a2ec-7864e8633a91` |
| The Rain House | `rain-house` | `e82db06c-8367-417d-b4c2-fc3708da11e9` |
| The Oasis | `the-oasis` | `bf0f6e37-3415-4454-aaa0-1591d03f0bf2` |
| The Dome | `the-dome` | `547bbb9c-7e50-4d45-8636-00f000d218e4` |

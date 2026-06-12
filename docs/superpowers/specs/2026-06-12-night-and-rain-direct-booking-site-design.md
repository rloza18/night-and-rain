# Night & Rain — Direct Booking Site & Marketing Stack Design

**Date:** 2026-06-12
**Owner:** Rafa (rafa@knightandreign.com)
**Parent company:** Knight & Reign Properties LLC
**Brand:** Night & Rain (Joshua Tree experiential stays)

## Purpose

A standalone direct-booking brand site for the four Joshua Tree–area properties,
so guests book direct (≈4% in fees) instead of through Airbnb (≈15%+). The brand
must stay separate from Knight & Reign's other markets (Anaheim/Santa Ana/San
Diego) so more experiential desert properties can be added under Night & Rain later.

## The four properties (from Hospitable)

| Hospitable UUID | Public name | Town | Size |
|---|---|---|---|
| `8878daf6-0d90-4eeb-a2ec-7864e8633a91` | Tiny Home w Pool, Hot Tub, Sauna, Golf & More! | Yucca Valley | 1bd / 4 guests |
| `e82db06c-8367-417d-b4c2-fc3708da11e9` | Oasis w Pool, Sauna, Mini Golf Near Natl Park! | Yucca Valley | 1bd / 4 guests |
| `bf0f6e37-3415-4454-aaa0-1591d03f0bf2` | Joshua Tree Oasis • Pickleball • Pool • Jacuzzi | Joshua Tree | 2bd / 6 guests |
| `547bbb9c-7e50-4d45-8636-00f000d218e4` | Joshua Tree Dream \| Pool, Pickleball, Dome, More | Joshua Tree | 2bd / 6 guests |

Each property gets a Night & Rain stay-name on the site (e.g. "The Dome House,"
"The Hideaway") — final names chosen with Rafa during build; OTA titles stay as-is.

## Decisions made (2026-06-12, confirmed by Rafa)

1. **Brand spelling:** "Night & Rain" (N-I-G-H-T / R-A-I-N) — homophone twin of Knight & Reign.
2. **Build approach:** Custom-coded static site + embedded Hospitable Direct booking widget.
3. **Domain:** Buy **nightandrain.com** (verified available 2026-06-12). The
   knightandreign.com subdomain option was rejected in favor of a standalone brand
   domain. **nightandrain.co** (also available) is reserved as the future *cold
   outreach sending domain* so cold email never risks the main domains' reputation.
4. **Marketing channels (all three, phased):** past-guest email → Instagram/TikTok
   funnel → cold outreach.

## Architecture

```
Guest ──> nightandrain.com (static site, ~free hosting)
              │  "Check availability / Book"
              ▼
          Hospitable Direct widget (embedded per property)
              │  payments via Stripe, calendar sync, guest vetting
              ▼
          Hospitable PMS (source of truth: calendars, reservations, messaging)
              │
              ▼
          Boostly Connect (Go High Level CRM)
              │  contacts tagged brand:night-and-rain
              ▼
          Email/SMS campaigns (past guests, lead-magnet list, cold outreach)
```

### Website (the storefront)

- **Tech:** hand-coded static HTML/CSS/JS — no framework, no build step, nothing
  to break. Repo at `~/Projects/night-and-rain/site/`.
- **Hosting:** static host free tier (Netlify / Cloudflare Pages / Vercel).
  Caveat recorded: confirm the chosen host's current free-tier limits before
  deploy and say so honestly — a small static site fits comfortably, but verify.
- **Pages:**
  - `/` — hero (desert night imagery), brand story, 4 property cards, "Why book
    direct" strip (save vs Airbnb, direct host contact, best-rate promise),
    email-capture footer.
  - `/stays/<slug>/` — one page per property: gallery (images pulled from the
    Hospitable images API), description, amenities, sleeps/beds/baths, embedded
    Hospitable booking widget (container ≥320px wide × ≥900px tall per
    Hospitable docs).
  - `/joshua-tree-guide/` — lead magnet page: free JT itinerary in exchange for
    email (feeds the CRM list). Phase 2.
  - `/about/` — Night & Rain story; footer notes "A Knight & Reign Properties
    brand" for legal clarity.
- **Design language:** desert night — deep indigo sky, sand neutrals, terracotta
  accent, starfield texture; big photography; mobile-first.
- **Content source:** property copy, photos, amenities pulled from Hospitable
  via MCP at build time and committed as static assets/JSON. Refresh by re-running
  the pull; no live API dependency for page rendering (widget is the only live part).

### Booking engine (the cash register)

- **Hospitable Direct** handles checkout, Stripe payments, calendar sync,
  damage protection/guest vetting. No custom checkout is built — ever.
- Requires Rafa to activate Direct in Hospitable (choose Basic ~1% or Premium
  3%+4%), connect Stripe, and apply the recommended ~4% direct-rate markup to
  cover fees while still undercutting OTA totals.
- Widget embed codes are generated in Hospitable per property and pasted into
  each `/stays/` page.

### CRM & brand separation (the address book)

- **Go High Level via Boostly Connect**, synced to Hospitable (Boostly has a
  native Hospitable integration).
- Every contact gets tagged by brand and source, minimum schema:
  - `brand:night-and-rain` vs `brand:knight-and-reign`
  - `property:<slug>`, `source:past-guest | lead-magnet | cold | social`
- One GHL pipeline per brand. Campaigns filter on brand tag so a Joshua Tree
  guest never receives Disney-condo email and vice versa.
- Knight & Reign's other 20 properties are untouched by this project except as
  future replication of the same pattern.

### Email marketing (the megaphone)

Phased; each phase gates on the previous one working.

- **Phase 1 — Past guests (warm):** export JT-property past guests from
  Hospitable → GHL with tags → 3-email "book direct & save" sequence sent from
  `hello@nightandrain.com`. Set up SPF/DKIM/DMARC on nightandrain.com first.
- **Phase 2 — Lead magnet (social funnel):** Instagram/TikTok content → link-in-bio
  → `/joshua-tree-guide/` → email capture → nurture sequence in GHL.
- **Phase 3 — Cold outreach:** buy nightandrain.co as the sending domain,
  warm it up 2–4 weeks, low volume (<50/day), target retreat planners /
  photographers / corporate offsites. Never send cold from nightandrain.com or
  knightandreign.com.

## Error handling / risks

- **Widget fails to load:** each stay page includes a fallback "Email us to
  book" mailto + phone CTA.
- **Stale content:** content pull is a re-runnable script; calendar/pricing are
  always live via the widget, so staleness only affects copy/photos.
- **Deliverability:** no cold email until separate domain + warmup; warm email
  only after SPF/DKIM/DMARC verified.
- **Brand bleed:** enforced by GHL tags + per-brand pipelines; checked before
  any campaign send. Per standing policy, no email is ever sent without Rafa's
  explicit confirmation (drafts only).

## Testing

- Site: mobile + desktop rendering pass (browser screenshots), all four widget
  embeds load against live Hospitable, Lighthouse pass for performance/SEO basics.
- Booking: one $1-level test reservation through the widget before launch (then
  cancel/refund) to verify Stripe + calendar block.
- Email: seed-list test sends (Rafa's own addresses) before any real campaign.

## Out of scope (v1)

- Custom checkout/payments, GHL website builder, paid ads, additional brands,
  blog/SEO content engine, SMS campaigns.

## What only Rafa can do (blocking items)

1. **Buy nightandrain.com** (~$12/yr; optionally grab nightandrain.co at the
   same time for ~$25–30/yr — it's the future cold-email domain).
2. **Activate Hospitable Direct + Stripe** in the Hospitable dashboard (guided).
3. **Boostly Connect / GHL access** when we wire the CRM (guided).
4. Create/confirm the **@nightandrain Instagram/TikTok handles** (phase 2).

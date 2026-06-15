// Build the four Night & Rain stay detail pages from site/data/stays.json
// + the full photo library in site/assets/library/<slug>/.
import fs from 'fs';
import path from 'path';

const ROOT = '/Users/rafa/Projects/night-and-rain/site';
const stays = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/stays.json'), 'utf8'));

const HEAD = (s) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${s.name} · Night &amp; Rain — ${s.town}</title>
<meta name="description" content="${s.name} — ${s.tagline} A Night & Rain ${s.type.toLowerCase()} in ${s.town}, book direct.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/styles.css">
</head>
<body>`;

const HEADER = `
<header class="site-header" id="header">
  <a class="brand" href="/" aria-label="Night &amp; Rain — Joshua Tree Vacation Rentals">
    <img class="logo logo-light" src="/assets/brand/logo-light.png" alt="Night &amp; Rain">
    <img class="logo logo-dark" src="/assets/brand/logo-dark.png" alt="" aria-hidden="true">
  </a>
  <button class="nav-toggle" id="navToggle" aria-label="Menu"><span></span><span></span><span></span></button>
  <nav class="nav" id="nav">
    <a href="/#stays">The Stays</a>
    <a href="/#why">Book Direct</a>
    <a href="/about/">About</a>
    <a class="nav-cta" href="#book">Book Your Stay</a>
  </nav>
</header>`;

const FOOTER = `
<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <a class="footer-brand" href="/" aria-label="Night &amp; Rain"><img src="/assets/brand/logo-light.png" alt="Night &amp; Rain" style="height:70px;width:auto;"></a>
        <p style="color:rgba(246,242,234,.7);max-width:32ch;font-size:.9rem;margin-top:1.2rem;">Experiential desert stays in Joshua Tree &amp; Yucca Valley, cared for by a small team that loves the high desert.</p>
      </div>
      <div class="footer-col">
        <h4>The Stays</h4>
        ${stays.map(o => `<a href="/stays/${o.slug}/">${o.name}</a>`).join('\n        ')}
      </div>
      <div class="footer-col">
        <h4>Explore</h4>
        <a href="/about/">About</a>
        <a href="/#why">Book Direct</a>
        <a href="/#join">Join the List</a>
        <a href="mailto:rafa@knightandreign.com">Contact</a>
      </div>
    </div>
    <div class="footer-fine">
      <span>© 2026 Night &amp; Rain. All rights reserved.</span>
      <span>A Knight &amp; Reign Properties brand · Joshua Tree, California</span>
    </div>
  </div>
</footer>
<script src="/js/main.js"></script>
</body>
</html>`;

function galleryImages(slug) {
  const dir = path.join(ROOT, 'assets/library', slug);
  return fs.readdirSync(dir).filter(f => f.endsWith('.jpg'))
    .sort((a, b) => parseInt(a) - parseInt(b));
}

for (const s of stays) {
  const imgs = galleryImages(s.slug);
  const gallery = imgs.map((f, i) =>
    `<img src="/assets/library/${s.slug}/${f}" alt="${s.name}" loading="${i < 3 ? 'eager' : 'lazy'}">`
  ).join('\n    ');

  const highlights = s.highlights.map(h => `<li>${h}</li>`).join('\n      ');

  const others = stays.filter(o => o.slug !== s.slug).map(o =>
    `<a class="more-card" href="/stays/${o.slug}/"><img src="/assets/library/${o.slug}/${o.hero}" alt="${o.name}" loading="lazy"><span>${o.name}</span></a>`
  ).join('\n      ');

  const page = `${HEAD(s)}
${HEADER}

<section class="stay-hero" id="top">
  <div class="bg"><img src="/assets/library/${s.slug}/${s.hero}" alt="${s.name}"></div>
  <div class="inner wrap">
    <a class="back" href="/#stays">← All Stays</a>
    <h1>${s.name}</h1>
    <p class="tagline">${s.tagline}</p>
    <ul class="facts">
      <li>${s.type}</li>
      <li>${s.town}</li>
      <li>Sleeps ${s.sleeps}</li>
      <li>${s.bedrooms} Bedroom${s.bedrooms > 1 ? 's' : ''}</li>
      <li>${s.baths} Bath</li>
    </ul>
    <a class="btn btn-light" href="#book">Book Your Stay</a>
  </div>
</section>

<section class="section wrap">
  <div class="overview">
    <div class="body reveal">
      ${s.intro.map(p => `<p>${p}</p>`).join('\n      ')}
    </div>
    <aside class="facts-card reveal d1">
      <h3>The details</h3>
      <dl>
        <dt>Type</dt><dd>${s.type}</dd>
        <dt>Location</dt><dd>${s.town}, CA</dd>
        <dt>Guests</dt><dd>Sleeps ${s.sleeps}</dd>
        <dt>Bedrooms</dt><dd>${s.bedrooms}</dd>
        <dt>Beds</dt><dd>${s.bedsLabel}</dd>
        <dt>Bath</dt><dd>${s.baths}</dd>
        <dt>Check-in</dt><dd>${s.checkin}</dd>
      </dl>
    </aside>
  </div>
</section>

<section class="section highlights">
  <div class="wrap">
    <p class="eyebrow">What you'll love</p>
    <h2 style="color:var(--ivory);font-size:clamp(1.8rem,4vw,3rem);">The good stuff.</h2>
    <ul>
      ${highlights}
    </ul>
  </div>
</section>

<section class="section gallery-sec">
  <div class="section-head reveal">
    <p class="eyebrow">The Gallery</p>
    <h2>Every corner of ${s.name}.</h2>
  </div>
  <div class="gallery">
    ${gallery}
  </div>
</section>

<section class="section book" id="book">
  <div class="wrap">
    <p class="eyebrow">Reserve</p>
    <h2>Book ${s.name} direct.</h2>
    <p>Real-time availability and the best rate, straight from us — no platform fees. Check your dates below.</p>
    <!-- TODO: Boostly Connect booking widget for this property.
         WordPress shortcode: [bly_booking_sidebar] / [bly_property uuid="${s.uuid}"]
         Hospitable UUID: ${s.uuid} -->
    <div class="widget-slot">Booking widget — connects here once the site is live on WordPress (Hospitable ${s.uuid.slice(0, 8)}…). For now, email <a href="mailto:rafa@knightandreign.com" style="color:var(--midnight);text-decoration:underline;margin-left:.3rem;">rafa@knightandreign.com</a> to reserve.</div>
  </div>
</section>

<section class="section more-stays wrap">
  <p class="eyebrow">More desert stays</p>
  <h2 style="font-size:clamp(1.8rem,4vw,3rem);">Keep exploring.</h2>
  <div class="more-grid">
      ${others}
  </div>
</section>
${FOOTER}`;

  const outDir = path.join(ROOT, 'stays', s.slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), page);
  console.log(`✓ ${s.slug}  (${imgs.length} gallery photos)`);
}
console.log('Done — 4 stay pages built.');

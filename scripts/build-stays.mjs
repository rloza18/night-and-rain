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
  // collage: hero image as the main tile, next 4 in the grid; full ordered list feeds the lightbox
  const ordered = [s.hero, ...imgs.filter(f => f !== s.hero)];
  const imagesJson = JSON.stringify(ordered.map(f => `/assets/library/${s.slug}/${f}`));
  const collageCells = ordered.slice(1, 5).map((f, i) => {
    const isLast = i === 3;
    return `<button class="pc-cell${isLast ? ' pc-more' : ''}" data-index="${i + 1}" aria-label="View photo ${i + 2}"><img src="/assets/library/${s.slug}/${f}" alt="" loading="lazy">${isLast ? `<span class="pc-overlay">View all ${ordered.length} photos</span>` : ''}</button>`;
  }).join('\n      ');

  const highlights = s.highlights.map(h => `<li>${h}</li>`).join('\n        ');

  const others = stays.filter(o => o.slug !== s.slug).map(o =>
    `<a class="more-card" href="/stays/${o.slug}/"><img src="/assets/library/${o.slug}/${o.hero}" alt="${o.name}" loading="lazy"><span>${o.name}</span></a>`
  ).join('\n      ');

  const page = `${HEAD(s)}
${HEADER}

<section class="stay-topbar wrap">
  <a class="back" href="/#stays">&#8249; All stays</a>
</section>

<section class="photo-collage wrap" data-gallery data-images='${imagesJson}'>
  <button class="pc-main" data-index="0" aria-label="View photos of ${s.name}">
    <img src="/assets/library/${s.slug}/${s.hero}" alt="${s.name}" loading="eager">
  </button>
  <div class="pc-grid">
      ${collageCells}
  </div>
</section>

<section class="stay-layout wrap">
  <div class="stay-main">
    <header class="stay-head">
      <h1>${s.name}</h1>
      <p class="stay-loc">${s.town}, California</p>
      <ul class="stay-facts">
        <li>${s.type}</li>
        <li>Sleeps ${s.sleeps}</li>
        <li>${s.bedrooms} Bedroom${s.bedrooms > 1 ? 's' : ''}</li>
        <li>${s.baths} Bath</li>
      </ul>
    </header>

    <div class="stay-divider"></div>

    <div class="stay-section">
      <h2>About ${s.name}</h2>
      <div class="description">
        ${s.intro.map(p => `<p>${p}</p>`).join('\n        ')}
      </div>
    </div>

    <div class="stay-divider"></div>

    <div class="stay-section">
      <h2>What this place offers</h2>
      <ul class="amenities">
        ${highlights}
      </ul>
    </div>

    <div class="stay-divider"></div>

    <div class="stay-section">
      <h2>Good to know</h2>
      <dl class="detail-list">
        <dt>Type</dt><dd>${s.type}</dd>
        <dt>Location</dt><dd>${s.town}, CA</dd>
        <dt>Guests</dt><dd>Sleeps ${s.sleeps}</dd>
        <dt>Bedrooms</dt><dd>${s.bedrooms}</dd>
        <dt>Beds</dt><dd>${s.bedsLabel}</dd>
        <dt>Bath</dt><dd>${s.baths}</dd>
        <dt>Check-in</dt><dd>${s.checkin}</dd>
      </dl>
    </div>
  </div>

  <aside class="booking-rail" id="book">
    <div class="booking-card">
      <p class="bc-head">Book direct</p>
      <p class="bc-sub">Best rate, straight from us &mdash; no platform fees.</p>
      <iframe id="booking-iframe" title="Book ${s.name}" sandbox="allow-top-navigation allow-scripts allow-same-origin allow-forms allow-popups" src="https://booking.hospitable.com/widget/9dab6440-8935-4d77-af83-689e31a292df/${s.widgetId}"></iframe>
    </div>
  </aside>
</section>

<div class="lightbox" data-lightbox hidden>
  <button class="lb-close" aria-label="Close gallery">&times;</button>
  <button class="lb-nav lb-prev" aria-label="Previous photo">&#8249;</button>
  <img class="lb-img" alt="">
  <button class="lb-nav lb-next" aria-label="Next photo">&#8250;</button>
  <div class="lb-counter"></div>
</div>

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

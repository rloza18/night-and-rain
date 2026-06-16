// Curate Night & Rain guest reviews from Hospitable property-review exports.
// Source files are the saved get-property-reviews MCP results (per property).
// Output: site/data/reviews.json  { stats, reviews[] }
import fs from 'fs';
import path from 'path';

const ROOT = '/Users/rafa/Projects/night-and-rain/site';

// Map: saved MCP result file -> { slug, name }
const SOURCES = [
  { file: process.argv[2], slug: 'the-outpost',    name: 'The Outpost' },
  { file: process.argv[3], slug: 'the-dojo',        name: 'The Dojo' },
  { file: process.argv[4], slug: 'the-rain-house',  name: 'The Rain House' },
  { file: process.argv[5], slug: 'the-night-house', name: 'The Night House' },
];

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
function fmtDate(iso) {
  const d = new Date(iso);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}
function guestName(g) {
  if (!g || !g.first_name) return 'Guest';
  const last = g.last_name ? ` ${g.last_name.trim()[0]}.` : '';
  return `${g.first_name.trim()}${last}`;
}

let allRows = [];      // for stats (every review)
let curated = [];      // for display

for (const src of SOURCES) {
  const json = JSON.parse(fs.readFileSync(src.file, 'utf8'));
  const rows = json.data || [];
  for (const r of rows) {
    const platform = (r.platform || r.listing?.platform || '').toLowerCase();
    const rating = r.public?.rating || 0;
    if (platform !== 'airbnb' && platform !== 'vrbo') continue;
    allRows.push({ platform, rating });

    const text = (r.public?.review || '').trim();
    if (rating < 5) continue;
    if (text.length < 60 || text.length > 600) continue;
    if (!r.guest || !r.guest.first_name) continue;
    if (r.guest.language && r.guest.language !== 'en') continue;
    curated.push({
      name: guestName(r.guest),
      date: fmtDate(r.reviewed_at),
      ts: new Date(r.reviewed_at).getTime(),
      rating,
      text,
      platform,
      stay: src.name,
    });
  }
}

// stats
function stat(rows) {
  if (!rows.length) return { count: 0, avg: 0 };
  const avg = rows.reduce((s, r) => s + r.rating, 0) / rows.length;
  return { count: rows.length, avg: Math.round(avg * 10) / 10 };
}
const stats = {
  all: stat(allRows),
  airbnb: stat(allRows.filter(r => r.platform === 'airbnb')),
  vrbo: stat(allRows.filter(r => r.platform === 'vrbo')),
};

// Balanced, recent selection: newest first, cap per stay so no single home dominates.
curated.sort((a, b) => b.ts - a.ts);
const perStayCap = 9;
const counts = {};
const picked = [];
for (const r of curated) {
  counts[r.stay] = (counts[r.stay] || 0);
  if (counts[r.stay] >= perStayCap) continue;
  counts[r.stay]++;
  const { ts, ...clean } = r;
  picked.push(clean);
}
// keep a healthy pool (homepage shows a subset + filters)
const reviews = picked.slice(0, 32);

fs.writeFileSync(
  path.join(ROOT, 'data/reviews.json'),
  JSON.stringify({ stats, reviews }, null, 2)
);
console.log(`stats: all ${stats.all.avg} (${stats.all.count}) · airbnb ${stats.airbnb.avg} (${stats.airbnb.count}) · vrbo ${stats.vrbo.avg} (${stats.vrbo.count})`);
console.log(`curated ${reviews.length} reviews (airbnb ${reviews.filter(r=>r.platform==='airbnb').length}, vrbo ${reviews.filter(r=>r.platform==='vrbo').length})`);

// Pull EVERY Hospitable photo for the 4 Night & Rain properties.
// Extracts image URLs from this session's transcript (no hand-transcription),
// then downloads full-res images into site/assets/library/<slug>/.
import fs from 'fs';
import path from 'path';

const transcript = '/Users/rafa/.claude/projects/-Users-rafa/583cac4f-deb8-458f-847f-e18358699348.jsonl';
const folderToSlug = {
  '1574126': 'night-house', // JT Avalon 4655 — tiny home
  '1495408': 'rain-house',  // anime tiny home
  '1528000': 'the-oasis',   // 2bd pickleball
  '1528002': 'the-dome',    // 2bd stargazing dome
};

const byFolder = {};
const lines = fs.readFileSync(transcript, 'utf8').split('\n').filter(Boolean);
for (const line of lines) {
  let obj; try { obj = JSON.parse(line); } catch { continue; }
  const msg = obj.message;
  if (!msg || !Array.isArray(msg.content)) continue;
  for (const part of msg.content) {
    if (!part || part.type !== 'tool_result') continue;
    let txt = '';
    if (typeof part.content === 'string') txt = part.content;
    else if (Array.isArray(part.content)) txt = part.content.map(p => p.text || '').join('');
    if (!txt.includes('property_images')) continue;
    let data; try { data = JSON.parse(txt).data; } catch { continue; }
    if (!Array.isArray(data)) continue;
    for (const it of data) {
      if (!it || !it.url) continue;
      const m = it.url.match(/property_images\/(\d+)\//);
      if (!m || !folderToSlug[m[1]]) continue;
      (byFolder[m[1]] ||= []).push({ order: it.order ?? 0, url: it.url });
    }
  }
}

for (const f in byFolder) {
  byFolder[f].sort((a, b) => a.order - b.order);
  const seen = new Set();
  byFolder[f] = byFolder[f].filter(x => (seen.has(x.url) ? false : seen.add(x.url)));
  byFolder[f] = byFolder[f].map(x => x.url);
}

console.log('Found in transcript:');
for (const f in byFolder) console.log('  ', folderToSlug[f].padEnd(12), byFolder[f].length, 'images');

const base = '/Users/rafa/Projects/night-and-rain/site/assets/library';
let ok = 0, fail = 0;
for (const f in byFolder) {
  const slug = folderToSlug[f];
  const dir = path.join(base, slug);
  fs.mkdirSync(dir, { recursive: true });
  const urls = byFolder[f];
  let idx = 0;
  const worker = async () => {
    while (idx < urls.length) {
      const i = idx++;
      const dest = path.join(dir, String(i + 1).padStart(2, '0') + '.jpg');
      try {
        if (fs.existsSync(dest) && fs.statSync(dest).size > 20000) { ok++; continue; }
        const r = await fetch(urls[i]);
        if (!r.ok) { fail++; continue; }
        fs.writeFileSync(dest, Buffer.from(await r.arrayBuffer()));
        ok++;
      } catch { fail++; }
    }
  };
  await Promise.all(Array.from({ length: 8 }, worker));
  console.log(`  ✓ ${slug}: saved to ${dir}`);
}
console.log(`\nDone. downloaded ok=${ok} fail=${fail}`);
// write a manifest for the build to reference
const manifest = {};
for (const f in byFolder) manifest[folderToSlug[f]] = byFolder[f];
fs.writeFileSync('/Users/rafa/Projects/night-and-rain/site/data/all-images.json', JSON.stringify(manifest, null, 2));
console.log('Manifest → site/data/all-images.json');

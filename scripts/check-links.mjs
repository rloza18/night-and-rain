// Verify every local href/src across the site resolves to a real file.
import fs from 'fs';
import path from 'path';
const ROOT = '/Users/rafa/Projects/night-and-rain/site';

function htmlFiles(dir) {
  let out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out = out.concat(htmlFiles(p));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

function resolveLocal(ref) {
  let u = ref.split('#')[0].split('?')[0];
  if (!u) return null;                       // pure anchor
  if (/^(https?:|mailto:|tel:|data:)/.test(u)) return null;
  if (u.startsWith('//')) return null;
  let target = u.startsWith('/') ? path.join(ROOT, u) : path.join(ROOT, u); // all absolute in this site
  if (u.endsWith('/')) target = path.join(target, 'index.html');
  else if (!path.extname(target)) target = path.join(target, 'index.html');
  return target;
}

let checked = 0, broken = [];
for (const f of htmlFiles(ROOT)) {
  const html = fs.readFileSync(f, 'utf8');
  const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map(m => m[1]);
  for (const r of refs) {
    const t = resolveLocal(r);
    if (t === null) continue;
    checked++;
    if (!fs.existsSync(t)) broken.push(`${path.relative(ROOT, f)}  ->  ${r}`);
  }
}
console.log(`Checked ${checked} local links.`);
if (broken.length) { console.log('BROKEN:'); broken.forEach(b => console.log('  ✗ ' + b)); process.exit(1); }
else console.log('✓ All local links resolve.');

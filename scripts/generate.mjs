// Renders site/stays/<slug>/index.html from site/data/*.json + scripts/stay-template.html.
// Zero dependencies. Usage: node scripts/generate.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");

const brand = JSON.parse(read("site/data/properties.json"));
const raw = JSON.parse(read("site/data/raw-properties.json"));
const template = read("scripts/stay-template.html");
const header = read("site/partials/header.html");
const footer = read("site/partials/footer.html");

const esc = (s) =>
  s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

// OTA summary -> light HTML: escape, then bold the ✔ feature lines.
const descHtml = (summary) =>
  esc(summary.trim())
    .split("\n")
    .map((line) =>
      line.trim().startsWith("✔")
        ? `<span class="check">${line.trim()}</span>`
        : line
    )
    .join("\n");

for (const p of brand) {
  const r = raw.find((x) => x.id === p.uuid);
  if (!r) throw new Error(`No raw data for ${p.slug} (${p.uuid})`);

  const gallery = p.images
    .map(
      (img, i) =>
        `      <img src="/assets/img/${p.slug}/${img}" alt="${esc(p.stayName)} — photo ${i + 1}" loading="${i < 2 ? "eager" : "lazy"}">`
    )
    .join("\n");

  const pills = p.amenitiesTop
    .map((a) => `      <span class="amenity-pill">${esc(a)}</span>`)
    .join("\n");

  const checkin = (r.checkin || "16:00").replace(/^(\d{2}):00$/, (m, h) =>
    Number(h) > 12 ? `${Number(h) - 12} PM` : `${Number(h)} AM`
  );

  const html = template
    .replaceAll("{{header}}", header)
    .replaceAll("{{footer}}", footer)
    .replaceAll("{{stayName}}", esc(p.stayName))
    .replaceAll("{{tagline}}", esc(p.tagline))
    .replaceAll("{{slug}}", p.slug)
    .replaceAll("{{heroImage}}", p.heroImage)
    .replaceAll("{{town}}", esc(p.town))
    .replaceAll("{{sleeps}}", String(p.sleeps))
    .replaceAll("{{bedrooms}}", String(p.bedrooms))
    .replaceAll("{{bedroomsPlural}}", p.bedrooms === 1 ? "" : "s")
    .replaceAll("{{bathrooms}}", String(p.bathrooms))
    .replaceAll("{{checkin}}", checkin)
    .replaceAll("{{uuid}}", p.uuid)
    .replaceAll("{{gallery}}", gallery)
    .replaceAll("{{amenities_pills}}", pills)
    .replaceAll("{{description_html}}", descHtml(r.summary || ""));

  const leftover = html.match(/{{\w+}}/);
  if (leftover) throw new Error(`Unreplaced token ${leftover[0]} in ${p.slug}`);

  const out = join(root, "site/stays", p.slug, "index.html");
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  console.log(`✓ site/stays/${p.slug}/index.html`);
}

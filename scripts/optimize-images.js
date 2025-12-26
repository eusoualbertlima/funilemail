/*
  scripts/optimize-images.js
  - Scans /assets for dashboard-menu.* (svg/png/jpg) and generates resized WebP and PNG variants
  - Outputs files as dashboard-menu-{WIDTH}.{ext}
*/

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ASSETS_DIR = path.join(__dirname, '..', 'assets');
const SOURCE_BASENAME = 'dashboard-menu';
const WIDTHS = [360, 720, 1200];

async function fileExists(p) {
  try { await fs.promises.access(p); return true; } catch (e) { return false; }
}

async function findSource() {
  const exts = ['svg', 'png', 'jpg', 'jpeg', 'webp'];
  for (const ext of exts) {
    const p = path.join(ASSETS_DIR, `${SOURCE_BASENAME}.${ext}`);
    if (await fileExists(p)) return p;
  }
  return null;
}

async function ensureDir(dir) {
  try { await fs.promises.mkdir(dir, { recursive: true }); } catch (e) { }
}

(async function main(){
  await ensureDir(ASSETS_DIR);
  const src = await findSource();
  if (!src) {
    console.error('No source image found. Place one of: dashboard-menu.svg|png|jpg|jpeg|webp in /assets and re-run.');
    process.exit(1);
  }

  const ext = path.extname(src).slice(1).toLowerCase();
  const buffer = await fs.promises.readFile(src);

  for (const w of WIDTHS) {
    // WebP
    const outWebp = path.join(ASSETS_DIR, `${SOURCE_BASENAME}-${w}.webp`);
    await sharp(buffer)
      .resize({ width: w })
      .webp({ quality: 80 })
      .toFile(outWebp);
    console.log('Written', outWebp);

    // PNG fallback
    const outPng = path.join(ASSETS_DIR, `${SOURCE_BASENAME}-${w}.png`);
    await sharp(buffer)
      .resize({ width: w })
      .png({ quality: 80, compressionLevel: 8 })
      .toFile(outPng);
    console.log('Written', outPng);
  }

  // Additionally create a large webp with original width if needed
  const outWebpLarge = path.join(ASSETS_DIR, `${SOURCE_BASENAME}-orig.webp`);
  await sharp(buffer).webp({ quality: 85 }).toFile(outWebpLarge);
  console.log('Written', outWebpLarge);

  console.log('Optimization complete');
})();

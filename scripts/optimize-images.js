/*
  scripts/optimize-images.js
  - Scans /assets for dashboard-menu.* (svg/png/jpg) and generates resized WebP and PNG variants
  - Outputs files as dashboard-menu-{WIDTH}.{ext}
*/

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ASSETS_DIR = path.join(__dirname, '..', 'assets');
const WIDTHS = [360, 720, 1200];

async function fileExists(p) {
  try { await fs.promises.access(p); return true; } catch (e) { return false; }
}

// Find all image sources in assets with supported extensions (we process each base name found)
async function listSources() {
  const files = await fs.promises.readdir(ASSETS_DIR);
  const exts = ['.svg', '.png', '.jpg', '.jpeg', '.webp'];
  const sources = files.filter(f => exts.includes(path.extname(f).toLowerCase())).map(f => path.join(ASSETS_DIR, f));
  return sources;
}

async function ensureDir(dir) {
  try { await fs.promises.mkdir(dir, { recursive: true }); } catch (e) { }
}

(async function main(){
  await ensureDir(ASSETS_DIR);
  const sources = await listSources();
  if (!sources || sources.length === 0) {
    console.error('No source images found in /assets. Place svg/png/jpg/jpeg/webp files and re-run.');
    process.exit(1);
  }

  for (const src of sources) {
    try {
      const buffer = await fs.promises.readFile(src);
      const base = path.basename(src, path.extname(src));

      for (const w of WIDTHS) {
        // WebP
        const outWebp = path.join(ASSETS_DIR, `${base}-${w}.webp`);
        await sharp(buffer)
          .resize({ width: w })
          .webp({ quality: 80 })
          .toFile(outWebp);
        console.log('Written', outWebp);

        // PNG fallback
        const outPng = path.join(ASSETS_DIR, `${base}-${w}.png`);
        await sharp(buffer)
          .resize({ width: w })
          .png({ quality: 80, compressionLevel: 8 })
          .toFile(outPng);
        console.log('Written', outPng);
      }

      // Additionally create a large webp with original width if needed
      const outWebpLarge = path.join(ASSETS_DIR, `${base}-orig.webp`);
      await sharp(buffer).webp({ quality: 85 }).toFile(outWebpLarge);
      console.log('Written', outWebpLarge);
    } catch (err) {
      console.error('Failed to process', src, err.message);
    }
  }

  console.log('Optimization complete');
})();

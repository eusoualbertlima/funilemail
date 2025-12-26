const fs = require('fs');
const sharp = require('sharp');
const svgPath = 'og-image-2.svg';
const outPath = 'og-image.png';

(async () => {
  try {
    if (!fs.existsSync(svgPath)) {
      console.error('SVG source not found:', svgPath);
      process.exit(1);
    }

    const svgBuffer = fs.readFileSync(svgPath);
    await sharp(svgBuffer)
      .resize(1200, 630, { fit: 'cover' })
      .png({ quality: 90 })
      .toFile(outPath);

    console.log('Rendered', outPath);
  } catch (err) {
    console.error('Error rendering OG image:', err);
    process.exit(1);
  }
})();
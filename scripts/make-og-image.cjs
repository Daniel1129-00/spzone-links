// Generates assets/og-image.png (1200x630 link preview) from assets/logo.png.
// Needs sharp, which isn't a project dependency (a package.json would make Vercel run a build):
//   npm i --prefix /tmp/og sharp && NODE_PATH=/tmp/og/node_modules node scripts/make-og-image.cjs
const path = require("path");
const sharp = require("sharp");

const W = 1200;
const H = 630;
const BAR_H = 110;
const NAVY = "#2E3092"; // --brand in styles.css
const TEXT = "Find us on Facebook, WhatsApp &amp; Google Maps";

const assets = path.join(__dirname, "..", "assets");

async function main() {
  // Logo at 50% of the width, centred in the white area above the bar
  const logo = await sharp(path.join(assets, "logo.png")).resize({ width: W / 2 }).toBuffer();
  const { height: logoH } = await sharp(logo).metadata();
  const logoTop = Math.round((H - BAR_H - logoH) / 2);

  const bar = Buffer.from(
    `<svg width="${W}" height="${BAR_H}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${NAVY}"/>
      <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle"
            font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-weight="600"
            font-size="40" fill="#FFFFFF">${TEXT}</text>
    </svg>`
  );

  await sharp({ create: { width: W, height: H, channels: 3, background: "#FFFFFF" } })
    .composite([
      { input: logo, top: logoTop, left: W / 4 },
      { input: bar, top: H - BAR_H, left: 0 },
    ])
    .png({ compressionLevel: 9 })
    .toFile(path.join(assets, "og-image.png"));

  console.log("Wrote assets/og-image.png");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

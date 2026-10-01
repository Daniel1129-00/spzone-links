# assets

| File | Size | Used for |
|---|---|---|
| `logo.png` | 960×464 | Header wordmark (shown at 220px wide; 960px keeps it sharp on 3x+ screens) |
| `og-image.png` | 1200×630 | Link preview on WhatsApp / Facebook / X (placeholder: logo on white with navy band) |
| `favicon.ico` | 16–64 | Browser tab icon |
| `favicon-512.png` | 512×512 | High-res favicon / PWA-style icon |
| `apple-touch-icon.png` | 180×180 | iOS "Add to Home Screen" |

## Source

All images were generated from `~/Downloads/SPZONE Logo with white border.png`
(2000×2000, logo on black). The black background and white outline were converted
to white, then the artwork was trimmed to a wide crop.

Brand colours sampled from that file:

- Navy `#2E3092` — `--brand` in `styles.css`
- Red `#ED1D24` — `--accent` in `styles.css`

## Replacing

- **Logo:** keep it a wide image on a white background. If the aspect ratio changes,
  update the `width`/`height` attributes on the `<img>` in `index.html` to avoid layout shift.
- **OG image:** keep it at exactly 1200×630. After deploying, update the
  `https://YOUR-DOMAIN` placeholders in `index.html` (og:image needs an absolute URL),
  then re-scrape with the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
  because WhatsApp/Facebook cache previews.

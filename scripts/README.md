# Utility Scripts

These scripts are not part of the build process and should be run manually when needed.

## Asset Extraction Scripts

These scripts use Puppeteer to extract assets from the original site. To avoid installing Puppeteer as a dependency (which would slow down Cloudflare builds), use `pnpx` to run them on-demand:

### download-assets.js
Extracts all images and assets from gohalallife.com
```bash
pnpx puppeteer@latest node download-assets.js
```

### crawl-sitemap.js
Crawls the sitemap to analyze site structure
```bash
pnpx puppeteer@latest node crawl-sitemap.js
```

### analyze-differences.js
Compares the copy with the original site
```bash
pnpx puppeteer@latest node analyze-differences.js
```

## Why pnpx?

Using `pnpx puppeteer@latest` runs Puppeteer without installing it as a project dependency. This:
- Keeps the project lightweight
- Prevents Chromium download during Cloudflare builds
- Still allows asset extraction when needed locally

## Alternative: Simple Asset Extraction

If you already have the asset URLs, use the simple extraction script that doesn't require Puppeteer:
```bash
node extract-assets-simple.js
```

This uses only Node's built-in `https` module.
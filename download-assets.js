const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');
const https = require('https');
const http = require('http');

async function downloadFile(url, filepath) {
  const dir = path.dirname(filepath);
  await fs.mkdir(dir, { recursive: true });
  
  return new Promise((resolve, reject) => {
    const file = require('fs').createWriteStream(filepath);
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded: ${path.basename(filepath)}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath);
      console.error(`✗ Failed: ${url} - ${err.message}`);
      reject(err);
    });
  });
}

async function extractAssets() {
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: { width: 1920, height: 1080 }
  });
  
  const page = await browser.newPage();
  const baseUrl = 'https://gohalallife.com';
  const outputDir = './public';
  
  console.log('🚀 Starting asset extraction from gohalallife.com...\n');
  
  try {
    await page.goto(baseUrl, { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    // Extract all image URLs
    const images = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src,
        alt: img.alt || 'unnamed'
      }));
    });
    
    // Extract CSS to find background images
    const backgroundImages = await page.evaluate(() => {
      const urls = [];
      const sheets = document.styleSheets;
      
      for (let i = 0; i < sheets.length; i++) {
        try {
          const rules = sheets[i].cssRules || sheets[i].rules;
          for (let j = 0; j < rules.length; j++) {
            const rule = rules[j];
            if (rule.style && rule.style.backgroundImage) {
              const match = rule.style.backgroundImage.match(/url\(["']?([^"')]+)["']?\)/);
              if (match) {
                urls.push(match[1]);
              }
            }
          }
        } catch (e) {
          // Cross-origin stylesheets
        }
      }
      return urls;
    });
    
    // Extract favicon
    const favicon = await page.evaluate(() => {
      const link = document.querySelector('link[rel*="icon"]');
      return link ? link.href : null;
    });
    
    // Combine all assets
    const allAssets = [];
    
    // Add images
    images.forEach(img => {
      if (img.src && img.src.startsWith('http')) {
        const url = new URL(img.src);
        const filepath = url.pathname;
        allAssets.push({
          url: img.src,
          path: filepath,
          type: 'image'
        });
      }
    });
    
    // Add background images
    backgroundImages.forEach(bgUrl => {
      if (bgUrl.startsWith('http')) {
        const url = new URL(bgUrl);
        const filepath = url.pathname;
        allAssets.push({
          url: bgUrl,
          path: filepath,
          type: 'background'
        });
      } else if (bgUrl.startsWith('/')) {
        allAssets.push({
          url: baseUrl + bgUrl,
          path: bgUrl,
          type: 'background'
        });
      }
    });
    
    // Add favicon
    if (favicon) {
      const url = new URL(favicon);
      allAssets.push({
        url: favicon,
        path: url.pathname,
        type: 'favicon'
      });
    }
    
    // Remove duplicates
    const uniqueAssets = Array.from(
      new Map(allAssets.map(item => [item.url, item])).values()
    );
    
    console.log(`Found ${uniqueAssets.length} unique assets to download:\n`);
    
    // Download all assets
    for (const asset of uniqueAssets) {
      const localPath = path.join(outputDir, asset.path);
      try {
        await downloadFile(asset.url, localPath);
      } catch (error) {
        console.error(`Failed to download ${asset.url}: ${error.message}`);
      }
    }
    
    // Save asset manifest
    const manifest = {
      timestamp: new Date().toISOString(),
      totalAssets: uniqueAssets.length,
      assets: uniqueAssets.map(a => ({
        ...a,
        localPath: path.join('/public', a.path)
      }))
    };
    
    await fs.writeFile(
      path.join(outputDir, 'asset-manifest.json'),
      JSON.stringify(manifest, null, 2)
    );
    
    console.log('\n✅ Asset extraction complete!');
    console.log(`📁 Assets saved to: ${path.resolve(outputDir)}`);
    console.log(`📄 Manifest saved to: ${path.resolve(outputDir, 'asset-manifest.json')}`);
    
  } catch (error) {
    console.error('Error during asset extraction:', error);
  } finally {
    await browser.close();
  }
}

// Run the extraction
console.log('HalalLife Asset Extractor\n');
console.log('This script will download all images and assets from gohalallife.com\n');

extractAssets().catch(console.error);
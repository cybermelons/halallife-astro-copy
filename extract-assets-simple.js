const fs = require('fs').promises;
const path = require('path');
const https = require('https');

// List of assets discovered from the site analysis
const assets = [
  // Logo and branding
  '/assets/logos/gohalallifelogo.png',
  '/assets/logos/websitelogo.png',
  
  // Trust badges
  '/assets/images/trustedby-1.svg',
  '/assets/images/trustedby-2.svg',
  '/assets/images/trustedby-3.svg',
  '/assets/images/trustedby-4.svg',
  
  // Decorative images
  '/assets/images/home-semicircle.png',
  '/assets/images/egligible.png',
  '/assets/images/findcleanhalalfood.png',
  '/assets/images/verify-halal.png',
  '/assets/images/contactelement.png',
  '/assets/images/footerimage.png',
  
  // Blog images
  '/assets/images/blog1.png',
  '/assets/images/blog2.png',
  '/assets/images/blog3.png',
  '/assets/images/blog4.png',
  
  // Icons
  '/assets/icons/trust.png',
  '/assets/icons/shield.svg',
  '/assets/icons/accessibility.svg',
  '/assets/icons/instagram.svg',
  '/assets/icons/facebook.svg',
  
  // Cuisine icons
  '/assets/icons/america.png',
  '/assets/icons/mexican.png',
  '/assets/icons/chinese.png',
  '/assets/icons/italian.png',
  '/assets/icons/japanese.png',
  '/assets/icons/indian.png',
  '/assets/icons/pakistan.png',
  '/assets/icons/thai.png',
  '/assets/icons/korean.png',
  '/assets/icons/vietnamese.png'
];

async function downloadFile(url, filepath) {
  const dir = path.dirname(filepath);
  await fs.mkdir(dir, { recursive: true });
  
  return new Promise((resolve, reject) => {
    const file = require('fs').createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded: ${path.basename(filepath)}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath);
      reject(err);
    });
  });
}

async function extractAssets() {
  const baseUrl = 'https://gohalallife.com';
  const outputDir = './public';
  
  console.log('🚀 Starting asset extraction from gohalallife.com...\n');
  
  let successCount = 0;
  let failCount = 0;
  
  for (const assetPath of assets) {
    const url = baseUrl + assetPath;
    const localPath = path.join(outputDir, assetPath);
    
    try {
      await downloadFile(url, localPath);
      successCount++;
    } catch (error) {
      console.error(`✗ Failed: ${assetPath} - ${error.message}`);
      failCount++;
    }
  }
  
  // Create asset manifest
  const manifest = {
    timestamp: new Date().toISOString(),
    totalAssets: assets.length,
    downloaded: successCount,
    failed: failCount,
    assets: assets.map(a => ({
      path: a,
      url: baseUrl + a,
      localPath: path.join('/public', a)
    }))
  };
  
  await fs.writeFile(
    path.join(outputDir, 'asset-manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  
  console.log('\n✅ Asset extraction complete!');
  console.log(`📊 Results: ${successCount} downloaded, ${failCount} failed`);
  console.log(`📁 Assets saved to: ${path.resolve(outputDir)}`);
  console.log(`📄 Manifest saved to: ${path.resolve(outputDir, 'asset-manifest.json')}`);
}

// Run the extraction
console.log('HalalLife Asset Extractor (Simple Version)\n');
extractAssets().catch(console.error);
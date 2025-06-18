const puppeteer = require('puppeteer');

async function analyzeDifferences() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  // Set viewport
  await page.setViewport({ width: 1440, height: 900 });
  
  console.log('Analyzing original site...');
  await page.goto('https://gohalallife.com', { waitUntil: 'networkidle2' });
  
  // Analyze key elements
  const originalAnalysis = await page.evaluate(() => {
    const getStyles = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      const styles = window.getComputedStyle(el);
      return {
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        color: styles.color,
        backgroundColor: styles.backgroundColor,
        padding: styles.padding,
        margin: styles.margin,
        lineHeight: styles.lineHeight,
        fontFamily: styles.fontFamily
      };
    };
    
    return {
      header: {
        height: document.querySelector('header')?.offsetHeight,
        backgroundColor: getStyles('header')?.backgroundColor,
        shadow: getStyles('header')?.boxShadow
      },
      hero: {
        title: document.querySelector('h1')?.textContent,
        titleStyles: getStyles('h1'),
        searchInput: getStyles('input[type="text"]'),
        searchButton: getStyles('button[type="submit"]')
      },
      navigation: {
        linkStyles: getStyles('nav a'),
        dropdownStyles: getStyles('.dropdown-menu')
      },
      colors: {
        primary: getStyles('.btn-primary')?.backgroundColor,
        text: getStyles('body')?.color,
        background: getStyles('body')?.backgroundColor
      },
      restaurantCard: {
        styles: getStyles('.restaurant-card'),
        titleStyles: getStyles('.restaurant-card h3'),
        shadow: getStyles('.restaurant-card')?.boxShadow
      }
    };
  });
  
  console.log('\nOriginal Site Analysis:');
  console.log(JSON.stringify(originalAnalysis, null, 2));
  
  // Now analyze our copy
  console.log('\nAnalyzing our copy...');
  await page.goto('http://localhost:4325', { waitUntil: 'networkidle2' });
  
  const copyAnalysis = await page.evaluate(() => {
    const getStyles = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      const styles = window.getComputedStyle(el);
      return {
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        color: styles.color,
        backgroundColor: styles.backgroundColor,
        padding: styles.padding,
        margin: styles.margin,
        lineHeight: styles.lineHeight,
        fontFamily: styles.fontFamily
      };
    };
    
    return {
      header: {
        height: document.querySelector('header')?.offsetHeight,
        backgroundColor: getStyles('header')?.backgroundColor,
        shadow: getStyles('header')?.boxShadow
      },
      hero: {
        title: document.querySelector('h1')?.textContent,
        titleStyles: getStyles('h1'),
        searchInput: getStyles('input[type="text"]'),
        searchButton: getStyles('button[type="submit"]')
      },
      navigation: {
        linkStyles: getStyles('nav a'),
        dropdownStyles: getStyles('.dropdown-menu')
      },
      colors: {
        primary: getStyles('.btn-primary')?.backgroundColor,
        text: getStyles('body')?.color,
        background: getStyles('body')?.backgroundColor
      }
    };
  });
  
  console.log('\nOur Copy Analysis:');
  console.log(JSON.stringify(copyAnalysis, null, 2));
  
  // Visual comparison
  console.log('\nTaking screenshots for comparison...');
  
  // Original site
  await page.goto('https://gohalallife.com', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'original-site.png', fullPage: false });
  
  // Our copy
  await page.goto('http://localhost:4325', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'our-copy.png', fullPage: false });
  
  console.log('\nScreenshots saved:');
  console.log('- original-site.png');
  console.log('- our-copy.png');
  
  await browser.close();
}

analyzeDifferences().catch(console.error);
import puppeteer from 'puppeteer';
import fs from 'fs';

async function crawlSitemap() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  const baseUrl = 'https://gohalallife.com';
  const visitedUrls = new Set();
  const urlsToVisit = [baseUrl];
  const siteStructure = {
    pages: [],
    navigation: [],
    components: []
  };

  console.log('Starting sitemap crawl...\n');

  while (urlsToVisit.length > 0) {
    const currentUrl = urlsToVisit.shift();
    
    // Skip if already visited or external URL
    if (visitedUrls.has(currentUrl) || !currentUrl.startsWith(baseUrl)) {
      continue;
    }
    
    visitedUrls.add(currentUrl);
    console.log(`Crawling: ${currentUrl}`);
    
    try {
      await page.goto(currentUrl, { waitUntil: 'networkidle2', timeout: 30000 });
      
      // Extract page info and links
      const pageInfo = await page.evaluate((url) => {
        // Get page title
        const title = document.title;
        
        // Get meta description
        const metaDesc = document.querySelector('meta[name="description"]')?.content;
        
        // Get all internal links
        const links = Array.from(document.querySelectorAll('a[href]'))
          .map(a => a.href)
          .filter(href => href.startsWith(window.location.origin));
        
        // Analyze page structure
        const structure = {
          hasHero: !!document.querySelector('.hero, [class*="hero"], section:first-of-type h1'),
          hasRestaurantGrid: !!document.querySelector('[class*="restaurant"], [class*="grid"]'),
          hasSearch: !!document.querySelector('input[type="search"], input[placeholder*="search"], input[placeholder*="Search"]'),
          hasFooter: !!document.querySelector('footer'),
          hasContactForm: !!document.querySelector('form[class*="contact"], [class*="contact"] form'),
          sections: Array.from(document.querySelectorAll('section, [class*="section"]')).map(s => ({
            className: s.className,
            heading: s.querySelector('h1, h2, h3')?.textContent?.trim()
          }))
        };
        
        // Get navigation structure
        const navItems = Array.from(document.querySelectorAll('nav a, header a')).map(a => ({
          text: a.textContent.trim(),
          href: a.href,
          hasDropdown: !!a.parentElement.querySelector('[class*="dropdown"], ul')
        }));
        
        return {
          url,
          title,
          metaDesc,
          links,
          structure,
          navItems
        };
      }, currentUrl);
      
      // Add to site structure
      siteStructure.pages.push({
        url: currentUrl,
        title: pageInfo.title,
        description: pageInfo.metaDesc,
        structure: pageInfo.structure
      });
      
      // Add new URLs to visit
      pageInfo.links.forEach(link => {
        if (!visitedUrls.has(link) && !urlsToVisit.includes(link)) {
          urlsToVisit.push(link);
        }
      });
      
      // Update navigation (from first page only)
      if (siteStructure.navigation.length === 0) {
        siteStructure.navigation = pageInfo.navItems;
      }
      
    } catch (error) {
      console.error(`Error crawling ${currentUrl}:`, error.message);
    }
  }
  
  // Analyze common components across pages
  console.log('\nAnalyzing common components...');
  
  const commonSections = {};
  siteStructure.pages.forEach(page => {
    page.structure.sections.forEach(section => {
      if (section.heading) {
        commonSections[section.heading] = (commonSections[section.heading] || 0) + 1;
      }
    });
  });
  
  siteStructure.components = Object.entries(commonSections)
    .filter(([_, count]) => count > 1)
    .map(([name, count]) => ({ name, occurrences: count }));
  
  // Save sitemap
  const sitemap = {
    baseUrl,
    crawledAt: new Date().toISOString(),
    totalPages: visitedUrls.size,
    ...siteStructure
  };
  
  fs.writeFileSync('sitemap.json', JSON.stringify(sitemap, null, 2));
  
  // Generate markdown report
  let report = `# GoHalalLife Site Structure Analysis\n\n`;
  report += `**Base URL:** ${baseUrl}\n`;
  report += `**Total Pages:** ${visitedUrls.size}\n`;
  report += `**Crawled At:** ${new Date().toLocaleString()}\n\n`;
  
  report += `## Pages\n\n`;
  siteStructure.pages.forEach(page => {
    report += `### ${page.title}\n`;
    report += `- **URL:** ${page.url}\n`;
    if (page.description) report += `- **Description:** ${page.description}\n`;
    report += `- **Components:** ${Object.entries(page.structure)
      .filter(([_, has]) => has === true)
      .map(([comp]) => comp)
      .join(', ')}\n\n`;
  });
  
  report += `## Navigation Structure\n\n`;
  siteStructure.navigation.forEach(nav => {
    report += `- ${nav.text} (${nav.href})${nav.hasDropdown ? ' [Has Dropdown]' : ''}\n`;
  });
  
  report += `\n## Common Components\n\n`;
  siteStructure.components.forEach(comp => {
    report += `- ${comp.name} (appears on ${comp.occurrences} pages)\n`;
  });
  
  fs.writeFileSync('sitemap-report.md', report);
  
  console.log('\n✅ Sitemap crawl complete!');
  console.log(`📄 Saved to: sitemap.json`);
  console.log(`📄 Report saved to: sitemap-report.md`);
  
  await browser.close();
}

crawlSitemap().catch(console.error);
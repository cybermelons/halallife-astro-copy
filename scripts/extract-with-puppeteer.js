/**
 * Extract content from GoHalalLife SPA using Puppeteer
 * Run with: pnpx puppeteer@latest node scripts/extract-with-puppeteer.js
 */

import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = [
  { url: 'https://gohalallife.com/', name: 'home', waitFor: '.mainheading' },
  { url: 'https://gohalallife.com/about-us', name: 'about', waitFor: 'h1' },
  { url: 'https://gohalallife.com/blogs', name: 'blog', waitFor: 'h1' },
  { url: 'https://gohalallife.com/contact', name: 'contact', waitFor: 'h1' },
  { url: 'https://gohalallife.com/terms-conditions', name: 'terms', waitFor: 'h1' },
  { url: 'https://gohalallife.com/privacy-policy', name: 'privacy', waitFor: 'h1' },
  { url: 'https://gohalallife.com/faq', name: 'faq', waitFor: 'h1' },
  { url: 'https://gohalallife.com/login', name: 'login', waitFor: 'form' },
  { url: 'https://gohalallife.com/signup', name: 'signup', waitFor: 'form' }
];

async function extractPageContent(page, pageInfo) {
  console.log(`Navigating to ${pageInfo.url}...`);
  await page.goto(pageInfo.url, { waitUntil: 'networkidle2', timeout: 60000 });
  
  // Wait for specific element to ensure page is loaded
  try {
    await page.waitForSelector(pageInfo.waitFor, { timeout: 10000 });
  } catch (e) {
    console.log(`Warning: Could not find ${pageInfo.waitFor} on ${pageInfo.name}`);
  }
  
  // Additional wait for dynamic content
  await page.waitForTimeout(3000);
  
  // Take screenshot for reference
  await page.screenshot({ 
    path: path.join(__dirname, `../content/screenshots/${pageInfo.name}.png`),
    fullPage: true 
  });
  
  // Extract all text content
  const content = await page.evaluate(() => {
    const data = {
      title: document.title,
      url: window.location.href,
      headings: [],
      paragraphs: [],
      lists: [],
      buttons: [],
      links: [],
      images: [],
      forms: [],
      allText: []
    };
    
    // Get page title from h1 or first heading
    const h1 = document.querySelector('h1');
    if (h1) data.pageTitle = h1.textContent.trim();
    
    // Get all headings with hierarchy
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
      const text = h.textContent.trim();
      if (text) {
        data.headings.push({
          level: h.tagName.toLowerCase(),
          text: text,
          className: h.className
        });
      }
    });
    
    // Get all paragraphs
    document.querySelectorAll('p').forEach(p => {
      const text = p.textContent.trim();
      if (text && text.length > 10) {
        data.paragraphs.push(text);
      }
    });
    
    // Get all list items
    document.querySelectorAll('ul li, ol li').forEach(li => {
      const text = li.textContent.trim();
      if (text) {
        data.lists.push(text);
      }
    });
    
    // Get all buttons and CTAs
    document.querySelectorAll('button, a.btn, a[class*="button"], a[class*="btn"]').forEach(btn => {
      const text = btn.textContent.trim();
      const href = btn.href || '';
      if (text) {
        data.buttons.push({ text, href });
      }
    });
    
    // Get navigation links
    document.querySelectorAll('nav a, header a').forEach(link => {
      const text = link.textContent.trim();
      const href = link.href || '';
      if (text && href) {
        data.links.push({ text, href });
      }
    });
    
    // Get images
    document.querySelectorAll('img').forEach(img => {
      if (img.src && !img.src.includes('data:')) {
        data.images.push({
          src: img.src,
          alt: img.alt || '',
          className: img.className
        });
      }
    });
    
    // Get form elements
    document.querySelectorAll('form').forEach(form => {
      const formData = {
        action: form.action || '',
        method: form.method || 'GET',
        fields: []
      };
      
      // Get all inputs
      form.querySelectorAll('input, textarea, select').forEach(field => {
        formData.fields.push({
          type: field.type || field.tagName.toLowerCase(),
          name: field.name || '',
          placeholder: field.placeholder || '',
          required: field.required,
          label: ''
        });
      });
      
      // Try to match labels
      form.querySelectorAll('label').forEach(label => {
        const text = label.textContent.trim();
        const forAttr = label.getAttribute('for');
        if (forAttr && text) {
          const field = formData.fields.find(f => f.name === forAttr);
          if (field) field.label = text;
        }
      });
      
      data.forms.push(formData);
    });
    
    // Get all visible text for context
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function(node) {
          if (node.parentElement.tagName === 'SCRIPT' || 
              node.parentElement.tagName === 'STYLE' ||
              node.parentElement.tagName === 'NOSCRIPT') {
            return NodeFilter.FILTER_REJECT;
          }
          const text = node.textContent.trim();
          if (text.length > 5) {
            return NodeFilter.FILTER_ACCEPT;
          }
          return NodeFilter.FILTER_REJECT;
        }
      }
    );
    
    let node;
    while (node = walker.nextNode()) {
      data.allText.push(node.textContent.trim());
    }
    
    return data;
  });
  
  return content;
}

async function saveContent(content, pageName) {
  const pagesDir = path.join(__dirname, '../content/pages');
  const screenshotsDir = path.join(__dirname, '../content/screenshots');
  
  await fs.mkdir(pagesDir, { recursive: true });
  await fs.mkdir(screenshotsDir, { recursive: true });
  
  // Create detailed markdown
  let markdown = `# ${content.pageTitle || content.title}\n\n`;
  markdown += `**URL:** ${content.url}\n\n`;
  
  if (content.headings.length > 0) {
    markdown += `## Page Structure\n\n`;
    content.headings.forEach(h => {
      const level = parseInt(h.level.charAt(1));
      markdown += `${'#'.repeat(level + 1)} ${h.text}\n`;
    });
    markdown += '\n';
  }
  
  if (content.paragraphs.length > 0) {
    markdown += `## Content\n\n`;
    content.paragraphs.forEach(p => {
      markdown += `${p}\n\n`;
    });
  }
  
  if (content.lists.length > 0) {
    markdown += `## List Items\n\n`;
    content.lists.forEach(item => {
      markdown += `- ${item}\n`;
    });
    markdown += '\n';
  }
  
  if (content.buttons.length > 0) {
    markdown += `## CTAs/Buttons\n\n`;
    content.buttons.forEach(btn => {
      markdown += `- **${btn.text}**${btn.href ? ` → ${btn.href}` : ''}\n`;
    });
    markdown += '\n';
  }
  
  if (content.forms.length > 0) {
    markdown += `## Forms\n\n`;
    content.forms.forEach((form, i) => {
      markdown += `### Form ${i + 1}\n`;
      markdown += `- Action: ${form.action}\n`;
      markdown += `- Method: ${form.method}\n`;
      markdown += `- Fields:\n`;
      form.fields.forEach(field => {
        markdown += `  - ${field.label || field.placeholder || field.name} (${field.type})${field.required ? ' *required' : ''}\n`;
      });
      markdown += '\n';
    });
  }
  
  if (content.images.length > 0) {
    markdown += `## Images\n\n`;
    content.images.forEach(img => {
      markdown += `- Alt: "${img.alt}" - ${img.src}\n`;
    });
    markdown += '\n';
  }
  
  // Save files
  await fs.writeFile(
    path.join(pagesDir, `${pageName}-full.md`), 
    markdown
  );
  
  await fs.writeFile(
    path.join(pagesDir, `${pageName}-full.json`), 
    JSON.stringify(content, null, 2)
  );
  
  // Save all text for reference
  await fs.writeFile(
    path.join(pagesDir, `${pageName}-text.txt`), 
    content.allText.join('\n')
  );
}

async function extractAllPages() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ 
    headless: false, // Set to false to see what's happening
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  // Block unnecessary resources for faster loading
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    if (req.resourceType() === 'stylesheet' || req.resourceType() === 'font') {
      req.continue();
    } else {
      req.continue();
    }
  });
  
  console.log('Starting content extraction...\n');
  
  for (const pageInfo of pages) {
    try {
      const content = await extractPageContent(page, pageInfo);
      await saveContent(content, pageInfo.name);
      console.log(`✓ Extracted ${pageInfo.name} - Found ${content.headings.length} headings, ${content.paragraphs.length} paragraphs`);
    } catch (error) {
      console.error(`✗ Error extracting ${pageInfo.name}:`, error.message);
    }
  }
  
  await browser.close();
  console.log('\nExtraction complete! Check /content/pages/ for results');
}

extractAllPages().catch(console.error);
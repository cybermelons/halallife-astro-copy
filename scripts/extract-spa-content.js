/**
 * Extract content from GoHalalLife SPA using Puppeteer
 * Run with: pnpx puppeteer@latest node scripts/extract-spa-content.js
 */

import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = [
  { url: 'https://gohalallife.com/about-us', name: 'about' },
  { url: 'https://gohalallife.com/blogs', name: 'blog' },
  { url: 'https://gohalallife.com/contact', name: 'contact' },
  { url: 'https://gohalallife.com/terms-conditions', name: 'terms' },
  { url: 'https://gohalallife.com/privacy-policy', name: 'privacy' },
  { url: 'https://gohalallife.com/faq', name: 'faq' }
];

async function extractPageContent(page, url) {
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  
  // Wait for content to load
  await page.waitForTimeout(2000);
  
  // Extract content from the page
  const content = await page.evaluate(() => {
    const data = {
      title: document.title,
      headings: [],
      paragraphs: [],
      lists: [],
      buttons: [],
      images: [],
      forms: []
    };
    
    // Get all headings
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
      const text = h.textContent.trim();
      if (text) {
        data.headings.push({
          level: h.tagName.toLowerCase(),
          text: text
        });
      }
    });
    
    // Get paragraphs
    document.querySelectorAll('p').forEach(p => {
      const text = p.textContent.trim();
      if (text && text.length > 20) {
        data.paragraphs.push(text);
      }
    });
    
    // Get list items
    document.querySelectorAll('ul li, ol li').forEach(li => {
      const text = li.textContent.trim();
      if (text) {
        data.lists.push(text);
      }
    });
    
    // Get buttons and CTAs
    document.querySelectorAll('button, a.btn, a[class*="button"]').forEach(btn => {
      const text = btn.textContent.trim();
      if (text) {
        data.buttons.push(text);
      }
    });
    
    // Get images with alt text
    document.querySelectorAll('img[alt]').forEach(img => {
      if (img.alt) {
        data.images.push({
          alt: img.alt,
          src: img.src
        });
      }
    });
    
    // Get form labels and inputs
    document.querySelectorAll('label').forEach(label => {
      const text = label.textContent.trim();
      if (text) {
        data.forms.push({ type: 'label', text });
      }
    });
    
    document.querySelectorAll('input[placeholder]').forEach(input => {
      data.forms.push({ 
        type: 'input', 
        placeholder: input.placeholder,
        inputType: input.type 
      });
    });
    
    return data;
  });
  
  return content;
}

async function saveContent(content, pageName) {
  const dir = path.join(__dirname, '../content/pages');
  await fs.mkdir(dir, { recursive: true });
  
  // Create markdown file
  let markdown = `# ${content.title}\n\n`;
  
  if (content.headings.length > 0) {
    markdown += `## Page Structure\n\n`;
    content.headings.forEach(h => {
      const level = parseInt(h.level.charAt(1));
      markdown += `${'#'.repeat(level)} ${h.text}\n`;
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
    markdown += `## Lists\n\n`;
    content.lists.forEach(item => {
      markdown += `- ${item}\n`;
    });
    markdown += '\n';
  }
  
  if (content.buttons.length > 0) {
    markdown += `## CTAs\n\n`;
    content.buttons.forEach(btn => {
      markdown += `- ${btn}\n`;
    });
    markdown += '\n';
  }
  
  if (content.forms.length > 0) {
    markdown += `## Form Elements\n\n`;
    content.forms.forEach(f => {
      markdown += `- ${f.type}: ${f.text || f.placeholder || ''}\n`;
    });
  }
  
  // Save files
  await fs.writeFile(
    path.join(dir, `${pageName}-spa.md`), 
    markdown
  );
  
  await fs.writeFile(
    path.join(dir, `${pageName}-spa.json`), 
    JSON.stringify(content, null, 2)
  );
}

async function extractAllPages() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  console.log('Starting SPA content extraction...\n');
  
  for (const pageInfo of pages) {
    try {
      console.log(`Extracting ${pageInfo.url}...`);
      const content = await extractPageContent(page, pageInfo.url);
      await saveContent(content, pageInfo.name);
      console.log(`✓ Saved ${pageInfo.name} content`);
    } catch (error) {
      console.error(`✗ Error extracting ${pageInfo.url}:`, error.message);
    }
  }
  
  await browser.close();
  console.log('\nSPA content extraction complete!');
}

extractAllPages().catch(console.error);
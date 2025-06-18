/**
 * Extract page content from GoHalalLife site
 * Run with: node scripts/extract-page-content.js
 */

import https from 'https';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pages to extract content from
const pages = [
  { url: '/about-us', name: 'about' },
  { url: '/blogs', name: 'blog' },
  { url: '/contact', name: 'contact' },
  { url: '/terms-conditions', name: 'terms' },
  { url: '/privacy-policy', name: 'privacy' },
  { url: '/login', name: 'login' },
  { url: '/signup', name: 'signup' },
  { url: '/onboarding-form', name: 'submit-restaurant' },
  { url: '/faq', name: 'faq' }
];

async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(`https://gohalallife.com${url}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function extractContent(html, pageName) {
  // Remove scripts and styles
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  html = html.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  
  // Extract specific content based on page
  const content = {
    pageName,
    title: '',
    headings: [],
    paragraphs: [],
    buttons: [],
    forms: [],
    meta: {}
  };
  
  // Extract title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (titleMatch) content.title = titleMatch[1].trim();
  
  // Extract headings
  const headingRegex = /<h([1-6])[^>]*>([^<]+)<\/h\1>/gi;
  let match;
  while ((match = headingRegex.exec(html)) !== null) {
    content.headings.push({
      level: match[1],
      text: match[2].trim()
    });
  }
  
  // Extract paragraphs
  const paragraphRegex = /<p[^>]*>([^<]+)<\/p>/gi;
  while ((match = paragraphRegex.exec(html)) !== null) {
    const text = match[1].trim();
    if (text.length > 20) { // Filter out short/empty paragraphs
      content.paragraphs.push(text);
    }
  }
  
  // Extract button/CTA text
  const buttonRegex = /<(?:button|a)[^>]*class="[^"]*btn[^"]*"[^>]*>([^<]+)</gi;
  while ((match = buttonRegex.exec(html)) !== null) {
    content.buttons.push(match[1].trim());
  }
  
  // Extract form labels and placeholders
  const labelRegex = /<label[^>]*>([^<]+)<\/label>/gi;
  while ((match = labelRegex.exec(html)) !== null) {
    content.forms.push({ type: 'label', text: match[1].trim() });
  }
  
  const inputRegex = /<input[^>]*placeholder="([^"]+)"/gi;
  while ((match = inputRegex.exec(html)) !== null) {
    content.forms.push({ type: 'placeholder', text: match[1] });
  }
  
  return content;
}

async function saveContent(content, pageName) {
  const dir = path.join(__dirname, '../content/pages');
  await fs.mkdir(dir, { recursive: true });
  
  // Create markdown file with extracted content
  let markdown = `# ${content.title}\n\n`;
  
  if (content.headings.length > 0) {
    markdown += `## Headings\n\n`;
    content.headings.forEach(h => {
      markdown += `${'#'.repeat(parseInt(h.level))} ${h.text}\n`;
    });
    markdown += '\n';
  }
  
  if (content.paragraphs.length > 0) {
    markdown += `## Content\n\n`;
    content.paragraphs.forEach(p => {
      markdown += `${p}\n\n`;
    });
  }
  
  if (content.buttons.length > 0) {
    markdown += `## CTAs/Buttons\n\n`;
    content.buttons.forEach(b => {
      markdown += `- ${b}\n`;
    });
    markdown += '\n';
  }
  
  if (content.forms.length > 0) {
    markdown += `## Form Elements\n\n`;
    content.forms.forEach(f => {
      markdown += `- ${f.type}: ${f.text}\n`;
    });
  }
  
  // Save markdown
  await fs.writeFile(
    path.join(dir, `${pageName}.md`), 
    markdown
  );
  
  // Save raw JSON for reference
  await fs.writeFile(
    path.join(dir, `${pageName}.json`), 
    JSON.stringify(content, null, 2)
  );
}

async function extractAllPages() {
  console.log('Starting content extraction...\n');
  
  for (const page of pages) {
    try {
      console.log(`Extracting ${page.url}...`);
      const html = await fetchPage(page.url);
      const content = extractContent(html, page.name);
      await saveContent(content, page.name);
      console.log(`✓ Saved ${page.name} content`);
    } catch (error) {
      console.error(`✗ Error extracting ${page.url}:`, error.message);
    }
  }
  
  console.log('\nContent extraction complete!');
  console.log('Check /content/pages/ for extracted content');
}

extractAllPages().catch(console.error);
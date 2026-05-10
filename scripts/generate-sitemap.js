#!/usr/bin/env node
// Generates public/sitemap.xml from src/posts/*.md frontmatter + static routes + /public/articles/*.html
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const POSTS_DIR = join(ROOT, 'src', 'posts');
const ARTICLES_DIR = join(ROOT, 'public', 'articles');
const OUTPUT = join(ROOT, 'public', 'sitemap.xml');
const BASE_URL = 'https://calculadora-sueno.com';

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split('\n')) {
    const [key, ...rest] = line.split(':');
    if (key && rest.length) fm[key.trim()] = rest.join(':').trim().replace(/^["']|["']$/g, '');
  }
  return fm;
}

function extractCanonical(html) {
  const m = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  if (!m) return null;
  const url = m[1].replace(BASE_URL, '');
  return url || null;
}

function extractDateModified(html) {
  const m = html.match(/"dateModified"\s*:\s*"([^"]+)"/);
  return m ? m[1] : null;
}

// Static pages for the React SPA
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/blog', priority: '0.9', changefreq: 'weekly' },
  { url: '/articulos/', priority: '0.9', changefreq: 'weekly' },
  { url: '/recursos', priority: '0.7', changefreq: 'monthly' },
  { url: '/contacto', priority: '0.4', changefreq: 'yearly' },
  { url: '/legal/privacidad', priority: '0.3', changefreq: 'yearly' },
  { url: '/legal/terminos', priority: '0.3', changefreq: 'yearly' },
  { url: '/privacidad', priority: '0.3', changefreq: 'yearly' },
  { url: '/aviso-legal', priority: '0.3', changefreq: 'yearly' },
  { url: '/cookies', priority: '0.3', changefreq: 'yearly' },
];

// Read blog posts from src/posts/*.md
const postFiles = readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
const postPages = [];
for (const file of postFiles) {
  const content = readFileSync(join(POSTS_DIR, file), 'utf-8');
  const fm = parseFrontmatter(content);
  if (fm.slug) {
    postPages.push({
      url: `/blog/${fm.slug}`,
      lastmod: fm.date || '',
      priority: '0.8',
      changefreq: 'monthly',
    });
  }
}

// Read static HTML articles from public/articles/*.html
const articleFiles = readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.html'));
const articlePages = [];
for (const file of articleFiles) {
  const html = readFileSync(join(ARTICLES_DIR, file), 'utf-8');
  const canonical = extractCanonical(html);
  const lastmod = extractDateModified(html);
  if (canonical) {
    articlePages.push({
      url: canonical,
      lastmod: lastmod || '',
      priority: '0.8',
      changefreq: 'monthly',
    });
  }
}

// Build XML
function urlEntry({ url, lastmod, priority, changefreq }) {
  return `  <url>\n    <loc>${BASE_URL}${url}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

const today = new Date().toISOString().split('T')[0];
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${staticPages.map(p => urlEntry({ ...p, lastmod: today })).join('\n')}\n${postPages.map(p => urlEntry(p)).join('\n')}\n${articlePages.map(p => urlEntry(p)).join('\n')}\n</urlset>\n`;

writeFileSync(OUTPUT, xml, 'utf-8');
console.log(`✅ Sitemap generated: ${OUTPUT} (${staticPages.length + postPages.length + articlePages.length} URLs)`);

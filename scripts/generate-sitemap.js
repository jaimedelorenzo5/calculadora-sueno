#!/usr/bin/env node
// Generates public/sitemap.xml from src/posts/*.md frontmatter + static routes
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const POSTS_DIR = join(ROOT, 'src', 'posts');
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

// Static pages with priorities
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/blog', priority: '0.9', changefreq: 'weekly' },
  { url: '/recursos', priority: '0.7', changefreq: 'monthly' },
  { url: '/privacidad', priority: '0.3', changefreq: 'yearly' },
  { url: '/aviso-legal', priority: '0.3', changefreq: 'yearly' },
  { url: '/cookies', priority: '0.3', changefreq: 'yearly' },
  { url: '/contacto', priority: '0.4', changefreq: 'yearly' },
];

// Read all posts
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

// Build XML
function urlEntry({ url, lastmod, priority, changefreq }) {
  return `  <url>
    <loc>${BASE_URL}${url}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const today = new Date().toISOString().split('T')[0];
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(p => urlEntry({ ...p, lastmod: today })).join('\n')}
${postPages.map(p => urlEntry(p)).join('\n')}
</urlset>
`;

writeFileSync(OUTPUT, xml, 'utf-8');
console.log(`✅ Sitemap generated: ${OUTPUT} (${staticPages.length + postPages.length} URLs)`);

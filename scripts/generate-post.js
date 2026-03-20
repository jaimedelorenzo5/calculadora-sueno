#!/usr/bin/env node
// Generates a new blog post using Apify (SERP scraping) + Claude API
// Usage: node scripts/generate-post.js "keyword to target"
// Requires: APIFY_TOKEN and ANTHROPIC_API_KEY in .env

import { writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import Anthropic from '@anthropic-ai/sdk';

const __dirname = dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = join(__dirname, '..', 'src', 'posts');

// Load .env if dotenv is available
try {
  const { config } = await import('dotenv');
  config();
} catch {
  // dotenv not installed — rely on process.env
}

const keyword = process.argv[2];
if (!keyword) {
  console.error('Usage: node scripts/generate-post.js "keyword"');
  process.exit(1);
}

const APIFY_TOKEN = process.env.APIFY_TOKEN;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

if (!ANTHROPIC_API_KEY) {
  console.error('Missing ANTHROPIC_API_KEY in environment');
  process.exit(1);
}

// --- 1. SERP scraping via Apify (optional) ---
let serpContext = '';
if (APIFY_TOKEN) {
  console.log(`🔍 Scraping SERP for: "${keyword}"...`);
  try {
    // Start Apify run
    const startRes = await fetch(
      `https://api.apify.com/v2/acts/apify~google-search-scraper/runs?token=${APIFY_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          queries: keyword,
          maxPagesPerQuery: 1,
          resultsPerPage: 10,
          countryCode: 'es',
          languageCode: 'es',
        }),
      }
    );
    const { data: run } = await startRes.json();
    const runId = run.id;

    // Poll for completion
    let status = 'RUNNING';
    while (status === 'RUNNING' || status === 'READY') {
      await new Promise(r => setTimeout(r, 3000));
      const statusRes = await fetch(`https://api.apify.com/v2/actor-runs/${runId}?token=${APIFY_TOKEN}`);
      const { data } = await statusRes.json();
      status = data.status;
    }

    // Fetch results
    const resultsRes = await fetch(
      `https://api.apify.com/v2/actor-runs/${runId}/dataset/items?token=${APIFY_TOKEN}&limit=10`
    );
    const results = await resultsRes.json();

    if (results.length > 0) {
      serpContext = results[0].organicResults
        ?.slice(0, 5)
        .map(r => `- ${r.title}: ${r.description}`)
        .join('\n') || '';
      console.log(`✅ SERP context fetched (${results[0].organicResults?.length || 0} results)`);
    }
  } catch (err) {
    console.warn('⚠️  Apify scraping failed, proceeding without SERP context:', err.message);
  }
} else {
  console.log('ℹ️  No APIFY_TOKEN — skipping SERP research');
}

// --- 2. Generate post with Claude ---
console.log(`✍️  Generating article for: "${keyword}"...`);

const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

const systemPrompt = `Eres un experto en medicina del sueño y SEO de contenido.
Escribes artículos de blog en español neutro, científicamente precisos y con estructura clara para SEO.
Los artículos deben tener mínimo 900 palabras, incluir secciones H2 y H3, datos concretos y enlaces internos a "/" (calculadora de sueño).`;

const userPrompt = `Escribe un artículo completo de blog sobre: "${keyword}"

${serpContext ? `Contexto de búsqueda (primeros resultados de Google España):\n${serpContext}\n` : ''}

El artículo debe:
1. Empezar directamente con el contenido (sin introducción meta)
2. Tener mínimo 5 secciones H2
3. Incluir datos y estadísticas concretas
4. Terminar con un CTA a nuestra [calculadora de sueño](/)
5. Estar escrito en español neutro, tono informativo pero cercano

Devuelve SOLO el frontmatter YAML + el contenido Markdown, en este formato exacto:

---
title: "Título del artículo"
date: ${new Date().toISOString().split('T')[0]}
description: "Meta descripción de 150-160 caracteres"
slug: slug-del-articulo
keywords: "keyword principal, keyword2, keyword3"
readTime: "X min"
category: guias
---

[contenido del artículo aquí]`;

const message = await client.messages.create({
  model: 'claude-opus-4-6',
  max_tokens: 4096,
  messages: [{ role: 'user', content: userPrompt }],
  system: systemPrompt,
});

const content = message.content[0].text;

// Extract slug from frontmatter
const slugMatch = content.match(/^slug:\s*(.+)$/m);
const slug = slugMatch ? slugMatch[1].trim() : keyword.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

const outputPath = join(POSTS_DIR, `${slug}.md`);

if (existsSync(outputPath)) {
  console.warn(`⚠️  File already exists: ${outputPath}`);
  const backupPath = outputPath.replace('.md', `-${Date.now()}.md`);
  writeFileSync(backupPath, content, 'utf-8');
  console.log(`✅ Saved as backup: ${backupPath}`);
} else {
  writeFileSync(outputPath, content, 'utf-8');
  console.log(`✅ Article saved: ${outputPath}`);
}

console.log(`\n📝 Next steps:
1. Review the article: ${outputPath}
2. Run: node scripts/generate-sitemap.js
3. Commit and deploy`);

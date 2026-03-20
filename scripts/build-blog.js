#!/usr/bin/env node
/**
 * build-blog.js
 * Convierte los archivos Markdown de /content/posts/ en HTML estático
 * dentro de /public/blog/. Vite copia /public/ a /dist/ en el build.
 *
 * Uso:  node scripts/build-blog.js
 * Deps: markdown-it (devDependency)
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import MarkdownIt from 'markdown-it';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = join(__dirname, '..');
const POSTS_DIR = join(ROOT, 'content', 'posts');
const OUT_DIR   = join(ROOT, 'public', 'blog');
const md        = new MarkdownIt({ html: true, linkify: true, typographer: true });

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Parsea el frontmatter YAML básico de un archivo .md */
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };

  const data = {};
  match[1].split('\n').forEach(line => {
    const colon = line.indexOf(':');
    if (colon === -1) return;
    const key   = line.slice(0, colon).trim();
    const value = line.slice(colon + 1).trim().replace(/^["']|["']$/g, '');
    data[key] = value;
  });

  return { data, body: match[2] };
}

/** Formatea una fecha ISO (YYYY-MM-DD) en español */
function formatDate(iso) {
  const months = ['enero','febrero','marzo','abril','mayo','junio',
                  'julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const [year, month, day] = iso.split('-');
  return `${parseInt(day)} de ${months[parseInt(month) - 1]} de ${year}`;
}

/** Genera el HTML para una entrada de blog individual */
function postHtml({ title, date, category, readingTime, description, slug, contentHtml, relatedPosts }) {
  const formattedDate = formatDate(date);
  const relatedCards = relatedPosts.map(p => `
      <a class="article-card" href="/blog/${p.slug}">
        <span class="badge">${p.category}</span>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <span class="article-card-cta">Leer artículo →</span>
      </a>`).join('');

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} | Blog Calculadora de Sueño</title>
  <meta name="description" content="${description}" />
  <link rel="canonical" href="https://calculadora-sueno.com/blog/${slug}" />
  <meta name="robots" content="index, follow" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:url" content="https://calculadora-sueno.com/blog/${slug}" />
  <link rel="stylesheet" href="/styles/article.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${title}",
    "description": "${description}",
    "datePublished": "${date}",
    "author": {"@type": "Organization", "name": "Calculadora de Sueño"},
    "publisher": {"@type": "Organization", "name": "Calculadora de Sueño", "url": "https://calculadora-sueno.com"},
    "mainEntityOfPage": "https://calculadora-sueno.com/blog/${slug}"
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Inicio", "item": "/"},
      {"@type": "ListItem", "position": 2, "name": "Blog", "item": "/blog"},
      {"@type": "ListItem", "position": 3, "name": "${title}", "item": "/blog/${slug}"}
    ]
  }
  </script>
</head>
<body>

  <header class="article-hero">
    <div class="hero-content">
      <div class="hero-left">
        <nav class="breadcrumb">
          <a href="/">Inicio</a> &rsaquo; <a href="/blog">Blog</a> &rsaquo; <span>${title}</span>
        </nav>
        <h1>${title}</h1>
        <div class="article-meta">
          <span>📅 ${formattedDate}</span>
          <span>🏷️ ${category}</span>
          <span>⏱️ ${readingTime} de lectura</span>
        </div>
      </div>
      <aside class="cta-hero">
        <div class="cta-icon">🌙</div>
        <h3>Calcula tu horario ideal</h3>
        <p>Descubre a qué hora acostarte para despertar descansado, basado en ciclos de 90 minutos.</p>
        <a href="/" class="cta-button-large" style="font-size:0.95rem; padding:0.75rem 1.5rem;">Usar la calculadora gratis</a>
      </aside>
    </div>
  </header>

  <div class="article-layout" style="padding-top: 2.5rem; padding-bottom: 2.5rem;">

    <aside class="article-sidebar">
      <div class="sidebar-section">
        <h3>🔗 Artículos relacionados</h3>
        <div class="related-articles">
          <ul>
            <li><a href="/articulos/fases-sueno">Fases del sueño: cómo funcionan</a></li>
            <li><a href="/articulos/horas-sueno-por-edad">Horas de sueño por edad</a></li>
            <li><a href="/articulos/higiene-sueno">Higiene del sueño</a></li>
            <li><a href="/articulos/problemas-sueno">Problemas de sueño comunes</a></li>
            <li><a href="/articulos/cronobiologia">Tu reloj biológico</a></li>
          </ul>
        </div>
      </div>
      <div class="sidebar-section" style="text-align:center;">
        <div class="cta-icon">⏰</div>
        <p style="font-size:0.9rem; color:var(--muted); margin-bottom:1rem;">¿Cuándo deberías acostarte esta noche?</p>
        <a href="/" class="cta-button-large" style="font-size:0.85rem; padding:0.6rem 1.2rem;">Calculadora de Sueño</a>
      </div>
    </aside>

    <main>
      <article class="article-content">
        ${contentHtml}

        <div class="final-cta">
          <h3>Pon en práctica lo que has aprendido</h3>
          <p>Usa nuestra calculadora para encontrar el horario de sueño perfecto basado en ciclos de 90 minutos.</p>
          <a href="/" class="cta-button-large">Calcular mi horario de sueño →</a>
        </div>
      </article>

      ${relatedCards ? `
      <section class="related-articles" style="margin-top:2rem;">
        <h3>Más artículos del blog</h3>
        <div class="articles-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px,1fr)); gap:1.25rem; margin-top:1rem;">
          ${relatedCards}
        </div>
      </section>` : ''}
    </main>

  </div>

  <footer class="article-footer">
    <div class="container">
      <p style="margin-bottom:0.75rem;">© ${new Date().getFullYear()} Calculadora de Sueño · <a href="/legal/privacidad" style="color:var(--brand)">Privacidad</a> · <a href="/legal/terminos" style="color:var(--brand)">Términos</a></p>
      <a href="/blog" class="back-home">← Volver al Blog</a>
    </div>
  </footer>

</body>
</html>`;
}

/** Genera el HTML del índice del blog */
function indexHtml(posts) {
  const cards = posts.map(p => `
      <a class="article-card" href="/blog/${p.slug}">
        <span class="badge">${p.category}</span>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <span style="font-size:0.8rem; color:var(--muted)">📅 ${formatDate(p.date)} · ⏱️ ${p.readingTime}</span>
        <span class="article-card-cta" style="display:block; margin-top:0.75rem;">Leer artículo →</span>
      </a>`).join('');

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Blog sobre el sueño: consejos, ciencia y bienestar</title>
  <meta name="description" content="Artículos sobre cómo mejorar el sueño, sus beneficios para la salud, hábitos de descanso y ciencia del sueño. Basados en evidencia y escritos en español." />
  <link rel="canonical" href="https://calculadora-sueno.com/blog" />
  <meta name="robots" content="index, follow" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Blog sobre el sueño: consejos, ciencia y bienestar" />
  <meta property="og:description" content="Artículos sobre cómo mejorar el sueño, sus beneficios para la salud, hábitos de descanso y ciencia del sueño." />
  <meta property="og:url" content="https://calculadora-sueno.com/blog" />
  <link rel="stylesheet" href="/styles/article.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Inicio", "item": "/"},
      {"@type": "ListItem", "position": 2, "name": "Blog", "item": "/blog"}
    ]
  }
  </script>
  <style>
    .blog-hero { background: white; border-bottom: 1px solid #f0f0f0; padding: 3rem 0; }
    .blog-index { max-width: 1200px; margin: 0 auto; padding: 2rem; }
    .articles-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 2rem; }
    .article-card { display: block; background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 1.25rem; text-decoration: none; color: var(--text); box-shadow: 0 4px 16px var(--shadow); transition: var(--transition); }
    .article-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px var(--shadow-hover); }
    .article-card h3 { margin: 0.5rem 0; font-size: 1.05rem; line-height: 1.4; }
    .article-card p { color: var(--muted); margin-bottom: 0.75rem; font-size: 0.92rem; }
    .article-card-cta { color: var(--brand); font-weight: 600; font-size: 0.9rem; }
    .badge { display: inline-block; font-size: .8rem; color: white; background: var(--brand); border-radius: 999px; padding: .2rem .6rem; margin-bottom: .5rem; }
    @media (max-width: 960px) { .articles-grid { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 600px) { .articles-grid { grid-template-columns: 1fr; } }
  </style>
</head>
<body>

  <header class="blog-hero">
    <div class="blog-index">
      <nav class="breadcrumb">
        <a href="/">Inicio</a> &rsaquo; <span>Blog</span>
      </nav>
      <h1>Blog sobre el sueño</h1>
      <p style="color:var(--muted); margin-top:0.5rem; max-width:600px;">Guías prácticas, ciencia del sueño y consejos para descansar mejor. Todo basado en evidencia y escrito en español.</p>
    </div>
  </header>

  <main class="blog-index">
    <section class="articles-grid">
      ${cards}
    </section>

    <div class="final-cta" style="margin-top:2.5rem;">
      <h3>¿Cuándo deberías acostarte esta noche?</h3>
      <p>Nuestra calculadora calcula el horario ideal basándose en ciclos de sueño de 90 minutos.</p>
      <a href="/" class="cta-button-large">Usar la Calculadora de Sueño gratis</a>
    </div>
  </main>

  <footer class="article-footer">
    <div class="container">
      <p style="margin-bottom:0.75rem;">© ${new Date().getFullYear()} Calculadora de Sueño · <a href="/legal/privacidad" style="color:var(--brand)">Privacidad</a> · <a href="/legal/terminos" style="color:var(--brand)">Términos</a></p>
      <a href="/" class="back-home">← Volver a la Calculadora</a>
    </div>
  </footer>

</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

if (!existsSync(POSTS_DIR)) {
  console.error('❌  No existe /content/posts/. Crea al menos un archivo .md.');
  process.exit(1);
}

mkdirSync(OUT_DIR, { recursive: true });

// Leer y parsear todos los posts
const files = readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
if (files.length === 0) {
  console.warn('⚠️  No hay archivos .md en /content/posts/');
  process.exit(0);
}

const posts = files.map(file => {
  const raw           = readFileSync(join(POSTS_DIR, file), 'utf-8');
  const { data, body } = parseFrontmatter(raw);
  return {
    title:       data.title       || 'Sin título',
    slug:        data.slug        || file.replace('.md', ''),
    date:        data.date        || '2025-01-01',
    description: data.description || '',
    category:    data.category    || 'General',
    readingTime: data.readingTime || '5 min',
    contentHtml: md.render(body),
  };
}).sort((a, b) => b.date.localeCompare(a.date)); // más reciente primero

// Generar HTML de cada post
posts.forEach(post => {
  const related = posts.filter(p => p.slug !== post.slug).slice(0, 2);
  const html    = postHtml({ ...post, relatedPosts: related });
  writeFileSync(join(OUT_DIR, `${post.slug}.html`), html, 'utf-8');
  console.log(`✅  /blog/${post.slug}.html`);
});

// Generar índice del blog
writeFileSync(join(OUT_DIR, 'index.html'), indexHtml(posts), 'utf-8');
console.log('✅  /blog/index.html');
console.log(`\n🎉  Blog generado: ${posts.length} artículo(s) en /public/blog/`);

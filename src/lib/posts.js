import { marked } from 'marked';

// Cargar todos los archivos Markdown en build time
const rawFiles = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true });

/** Parsea el bloque frontmatter YAML de un .md */
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const data = {};
  match[1].split('\n').forEach(line => {
    const colon = line.indexOf(':');
    if (colon === -1) return;
    const key = line.slice(0, colon).trim();
    const val = line.slice(colon + 1).trim().replace(/^["']|["']$/g, '');
    data[key] = val;
  });

  return { data, content: match[2] };
}

// Configurar marked para IDs en headings (tabla de contenidos)
marked.use({
  renderer: {
    heading({ text, depth }) {
      const id = text.toLowerCase()
        .replace(/[áàä]/g, 'a').replace(/[éèë]/g, 'e')
        .replace(/[íìï]/g, 'i').replace(/[óòö]/g, 'o')
        .replace(/[úùü]/g, 'u').replace(/ñ/g, 'n')
        .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
      return `<h${depth} id="${id}">${text}</h${depth}>\n`;
    }
  }
});

/** Devuelve todos los posts ordenados por fecha descendente */
export function getAllPosts() {
  return Object.entries(rawFiles)
    .map(([filepath, raw]) => {
      const { data, content } = parseFrontmatter(raw);
      const slug = data.slug || filepath.split('/').pop().replace('.md', '');
      return {
        title: data.title || 'Sin título',
        date: data.date || '2025-01-01',
        description: data.description || '',
        slug,
        keywords: data.keywords || '',
        readTime: data.readTime || '5 min',
        category: data.category || 'general',
        contentHtml: marked.parse(content),
        // Extraer H2 para tabla de contenidos
        toc: [...content.matchAll(/^## (.+)$/gm)].map(m => ({
          text: m[1],
          id: m[1].toLowerCase()
            .replace(/[áàä]/g, 'a').replace(/[éèë]/g, 'e')
            .replace(/[íìï]/g, 'i').replace(/[óòö]/g, 'o')
            .replace(/[úùü]/g, 'u').replace(/ñ/g, 'n')
            .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
        }))
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

/** Devuelve un post por slug */
export function getPostBySlug(slug) {
  return getAllPosts().find(p => p.slug === slug) || null;
}

/** Devuelve posts de la misma categoría (excluye el actual) */
export function getRelatedPosts(currentSlug, category, limit = 3) {
  return getAllPosts()
    .filter(p => p.slug !== currentSlug && p.category === category)
    .slice(0, limit);
}

import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getPostBySlug, getRelatedPosts } from '../lib/posts';
import AdSlot from '../components/ads/AdSlot';
import '../styles/blog.css';

function formatDate(iso) {
  const months = ['enero','febrero','marzo','abril','mayo','junio',
                  'julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const [y, m, d] = iso.split('-');
  return `${parseInt(d)} de ${months[parseInt(m)-1]} de ${y}`;
}

const CATEGORY_LABELS = {
  guias: 'Guía',
  ciencia: 'Ciencia',
  problemas: 'Problemas',
  general: 'General',
};

function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) return <Navigate to="/blog" replace />;

  const related = getRelatedPosts(slug, post.category, 3);
  const url = `https://calculadora-sueno.com/blog/${slug}`;

  return (
    <div className="blog-page">
      <Helmet>
        <title>{post.title} | Calculadora de Sueño</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.date,
          author: { '@type': 'Organization', name: 'Calculadora de Sueño' },
          publisher: { '@type': 'Organization', name: 'Calculadora de Sueño', url: 'https://calculadora-sueno.com' },
          mainEntityOfPage: url,
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://calculadora-sueno.com/' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://calculadora-sueno.com/blog' },
            { '@type': 'ListItem', position: 3, name: post.title, item: url },
          ]
        })}</script>
      </Helmet>

      {/* Hero */}
      <header className="post-hero">
        <div className="post-hero-grid">
          <div>
            <nav className="blog-breadcrumb">
              <Link to="/">Inicio</Link> › <Link to="/blog">Blog</Link> › <span>{post.title}</span>
            </nav>
            <h1>{post.title}</h1>
            <div className="post-meta">
              <span>📅 {formatDate(post.date)}</span>
              <span>🏷️ {CATEGORY_LABELS[post.category] || post.category}</span>
              <span>⏱️ {post.readTime} de lectura</span>
            </div>
          </div>

          <aside className="post-cta-card">
            <h3>🌙 Calcula tu horario ideal</h3>
            <p>Descubre a qué hora acostarte para despertar descansado, basado en ciclos de 90 minutos.</p>
            <Link to="/" className="post-cta-btn">Usar la calculadora gratis</Link>
          </aside>
        </div>
      </header>

      {/* Layout dos columnas */}
      <div className="post-layout">

        {/* Sidebar */}
        <aside className="post-sidebar">
          {post.toc.length > 0 && (
            <div className="toc-box">
              <h4>Contenido</h4>
              <ul className="toc-list">
                {post.toc.map(item => (
                  <li key={item.id}>
                    <a href={`#${item.id}`}>{item.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="sidebar-cta">
            <p>¿Cuándo deberías acostarte esta noche?</p>
            <Link to="/" className="post-cta-btn" style={{ fontSize: '0.85rem', padding: '0.55rem 1.1rem' }}>
              Calculadora de Sueño ⏰
            </Link>
          </div>
        </aside>

        {/* Contenido principal */}
        <main className="post-main">
          <AdSlot slot="article-top" />

          <article
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          <AdSlot slot="article-bottom" />

          {/* CTA final */}
          <div className="post-final-cta">
            <h3>Pon en práctica lo que has aprendido</h3>
            <p>Usa nuestra calculadora para encontrar el horario de sueño perfecto basado en ciclos de 90 minutos.</p>
            <Link to="/" className="post-cta-btn" style={{ fontSize: '1rem', padding: '0.8rem 2rem' }}>
              Calcular mi horario de sueño →
            </Link>
          </div>

          {/* Artículos relacionados */}
          {related.length > 0 && (
            <div className="related-posts">
              <h3>Artículos relacionados</h3>
              <div className="related-posts-grid">
                {related.map(rp => (
                  <Link key={rp.slug} to={`/blog/${rp.slug}`} className="blog-card" style={{ textDecoration: 'none' }}>
                    <span className="blog-card-badge">{CATEGORY_LABELS[rp.category] || rp.category}</span>
                    <h2 style={{ fontSize: '0.95rem' }}>{rp.title}</h2>
                    <p style={{ fontSize: '0.85rem' }}>{rp.description}</p>
                    <span className="blog-card-cta">Leer →</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      <footer className="blog-footer">
        <div className="blog-container">
          <Link to="/blog">← Volver al Blog</Link>
        </div>
      </footer>
    </div>
  );
}

export default BlogPost;

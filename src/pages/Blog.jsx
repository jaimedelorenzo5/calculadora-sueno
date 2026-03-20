import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getAllPosts } from '../lib/posts';
import '../styles/blog.css';

const CATEGORY_LABELS = {
  guias: 'Guía',
  ciencia: 'Ciencia',
  problemas: 'Problemas',
  general: 'General',
};

function formatDate(iso) {
  const months = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  const [y, m, d] = iso.split('-');
  return `${parseInt(d)} ${months[parseInt(m)-1]} ${y}`;
}

function Blog() {
  const posts = getAllPosts();

  return (
    <div className="blog-page">
      <Helmet>
        <title>Blog sobre el sueño: guías, ciencia y consejos | Calculadora de Sueño</title>
        <meta name="description" content="Artículos sobre cómo mejorar el sueño, ciclos de sueño, insomnio y hábitos de descanso. Basados en evidencia y escritos en español." />
        <link rel="canonical" href="https://calculadora-sueno.com/blog" />
        <meta property="og:title" content="Blog sobre el sueño | Calculadora de Sueño" />
        <meta property="og:description" content="Artículos sobre cómo mejorar el sueño, ciclos de sueño, insomnio y hábitos de descanso." />
        <meta property="og:url" content="https://calculadora-sueno.com/blog" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://calculadora-sueno.com/' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://calculadora-sueno.com/blog' },
          ]
        })}</script>
      </Helmet>

      <header className="blog-hero">
        <div className="blog-container">
          <nav className="blog-breadcrumb">
            <Link to="/">Inicio</Link> › <span>Blog</span>
          </nav>
          <h1>Blog sobre el sueño</h1>
          <p className="blog-hero-sub">
            Guías prácticas, ciencia del sueño y consejos para descansar mejor. Todo basado en evidencia y escrito en español.
          </p>
        </div>
      </header>

      <main>
        <div className="blog-container blog-grid-section">
          {posts.length === 0 ? (
            <p style={{ color: '#78909C', marginTop: '2rem' }}>Próximamente: artículos sobre sueño.</p>
          ) : (
            <div className="blog-grid">
              {posts.map(post => (
                <Link key={post.slug} to={`/blog/${post.slug}`} className="blog-card">
                  <span className="blog-card-badge">{CATEGORY_LABELS[post.category] || post.category}</span>
                  <h2>{post.title}</h2>
                  <p>{post.description}</p>
                  <div className="blog-card-meta">
                    📅 {formatDate(post.date)} &nbsp;·&nbsp; ⏱️ {post.readTime}
                  </div>
                  <span className="blog-card-cta">Leer artículo →</span>
                </Link>
              ))}
            </div>
          )}

          <div style={{
            marginTop: '3rem',
            background: 'linear-gradient(135deg,rgba(255,138,128,0.12),rgba(129,199,132,0.12))',
            border: '2px solid #FF8A80', borderRadius: '24px', padding: '2rem',
            textAlign: 'center', boxShadow: '0 6px 24px rgba(255,138,128,0.18)'
          }}>
            <h3 style={{ color: '#FF8A80', marginBottom: '0.75rem', fontSize: '1.35rem' }}>
              Calcula tu horario de sueño ideal
            </h3>
            <p style={{ color: '#78909C', marginBottom: '1.25rem' }}>
              Usa nuestra calculadora para acostarte y despertarte en el momento óptimo.
            </p>
            <Link to="/" style={{
              display: 'inline-block', background: '#E57373', color: 'white',
              padding: '0.75rem 1.75rem', borderRadius: '16px', textDecoration: 'none',
              fontWeight: '600', fontSize: '1rem'
            }}>
              Usar Calculadora de Sueño gratis →
            </Link>
          </div>
        </div>
      </main>

      <footer className="blog-footer">
        <div className="blog-container">
          <Link to="/">← Volver a la Calculadora</Link>
        </div>
      </footer>
    </div>
  );
}

export default Blog;

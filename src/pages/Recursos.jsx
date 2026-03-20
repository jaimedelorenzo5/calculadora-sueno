import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ProductGrid from '../components/blog/ProductGrid';
import '../styles/blog.css';

function Recursos() {
  return (
    <div className="recursos-page">
      <Helmet>
        <title>Productos para dormir mejor: guía de recursos | Calculadora de Sueño</title>
        <meta name="description" content="Selección honesta de productos para mejorar la calidad del sueño: colchones, accesorios y suplementos con enlaces de afiliado a Amazon." />
        <link rel="canonical" href="https://calculadora-sueno.com/recursos" />
      </Helmet>

      <header className="recursos-hero">
        <div className="recursos-container">
          <nav className="blog-breadcrumb">
            <Link to="/">Inicio</Link> › <span>Recursos</span>
          </nav>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '700', color: '#37474F', margin: '0.5rem 0 0.75rem' }}>
            Productos recomendados para dormir mejor
          </h1>
          <p style={{ color: '#78909C', maxWidth: '640px', lineHeight: '1.6' }}>
            No existen soluciones mágicas para el sueño, pero algunos productos pueden marcar una diferencia real.
            Esta página recoge los que consideramos más útiles, con explicaciones honestas de por qué los recomendamos
            y para quién son adecuados.
          </p>
        </div>
      </header>

      <main className="recursos-body">
        <div className="affiliate-disclaimer">
          <strong>Aviso de transparencia:</strong> Algunos enlaces de esta página son de afiliado de Amazon (programa Amazon Associates).
          Si compras a través de ellos, recibimos una pequeña comisión <strong>sin ningún coste adicional para ti</strong>.
          Esto nos ayuda a mantener la calculadora gratuita. Solo recomendamos productos que consideramos genuinamente útiles.
        </div>

        <h2 className="recursos-section-title">🛏️ Colchones</h2>
        <p style={{ color: '#78909C', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
          El colchón es el factor más importante para la calidad del sueño. Un colchón inadecuado provoca
          dolores musculares, despertares nocturnos y menor tiempo en sueño profundo.
        </p>
        <ProductGrid category="colchon" />

        <h2 className="recursos-section-title">🎧 Accesorios de sueño</h2>
        <p style={{ color: '#78909C', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
          La oscuridad y el silencio son esenciales para conciliar el sueño. Estos accesorios son especialmente
          útiles para turnos de noche, viajes o si vives en una ciudad ruidosa.
        </p>
        <ProductGrid category="accesorio" />

        <h2 className="recursos-section-title">💊 Suplementos</h2>
        <p style={{ color: '#78909C', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
          Los suplementos pueden ser útiles en situaciones concretas, pero no sustituyen unos buenos hábitos de sueño.
          Consulta con tu médico antes de tomarlos si tienes alguna condición de salud.
        </p>
        <ProductGrid category="suplemento" />

        <div style={{
          marginTop: '3rem',
          background: 'linear-gradient(135deg,rgba(255,138,128,0.12),rgba(129,199,132,0.12))',
          border: '2px solid #FF8A80', borderRadius: '24px', padding: '2rem', textAlign: 'center'
        }}>
          <h3 style={{ color: '#FF8A80', marginBottom: '0.75rem' }}>El primer paso es gratuito</h3>
          <p style={{ color: '#78909C', marginBottom: '1.25rem' }}>
            Antes de comprar nada, calcula tu horario de sueño ideal. Es gratis y puede cambiar cómo te sientes cada mañana.
          </p>
          <Link to="/" style={{
            display: 'inline-block', background: '#E57373', color: 'white',
            padding: '0.75rem 1.75rem', borderRadius: '16px', textDecoration: 'none',
            fontWeight: '600', fontSize: '1rem'
          }}>
            Calcular mi horario de sueño →
          </Link>
        </div>
      </main>

      <footer className="blog-footer">
        <div className="recursos-container">
          <Link to="/">← Volver a la Calculadora</Link>
        </div>
      </footer>
    </div>
  );
}

export default Recursos;

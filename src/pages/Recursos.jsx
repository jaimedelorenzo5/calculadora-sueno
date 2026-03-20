import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import '../styles/blog.css';

function Recursos() {
  return (
    <div className="recursos-page">
      <Helmet>
        <title>Recursos para dormir mejor | Calculadora de Sueño</title>
        <meta name="description" content="Guía de recursos y consejos para mejorar la calidad del sueño: hábitos, ambiente y rutinas basadas en ciencia." />
        <link rel="canonical" href="https://calculadora-sueno.com/recursos" />
      </Helmet>

      <header className="recursos-hero">
        <div className="recursos-container">
          <nav className="blog-breadcrumb">
            <Link to="/">Inicio</Link> › <span>Recursos</span>
          </nav>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '700', color: '#37474F', margin: '0.5rem 0 0.75rem' }}>
            Recursos para dormir mejor
          </h1>
          <p style={{ color: '#78909C', maxWidth: '640px', lineHeight: '1.6' }}>
            Consejos prácticos y herramientas basadas en ciencia para mejorar la calidad de tu sueño cada noche.
          </p>
        </div>
      </header>

      <main className="recursos-body">
        <h2 className="recursos-section-title">Artículos recomendados</h2>
        <p style={{ color: '#78909C', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
          Aprende sobre los ciclos del sueño, la importancia de las rutinas y cómo el ambiente influye en tu descanso.
        </p>
        <ul style={{ lineHeight: '2', color: '#546E7A' }}>
          <li><Link to="/blog/cuantas-horas-dormir-adulto">¿Cuántas horas de sueño necesita un adulto?</Link></li>
          <li><Link to="/blog/ciclos-de-sueno-que-son">¿Qué son los ciclos de sueño?</Link></li>
          <li><Link to="/blog/como-mejorar-calidad-del-sueno">Cómo mejorar la calidad del sueño</Link></li>
          <li><Link to="/blog/temperatura-ideal-dormir">Temperatura ideal para dormir</Link></li>
          <li><Link to="/blog/insomnio-causas-soluciones">Insomnio: causas y soluciones</Link></li>
        </ul>

        <div style={{
          marginTop: '3rem',
          background: 'linear-gradient(135deg,rgba(255,138,128,0.12),rgba(129,199,132,0.12))',
          border: '2px solid #FF8A80', borderRadius: '24px', padding: '2rem', textAlign: 'center'
        }}>
          <h3 style={{ color: '#FF8A80', marginBottom: '0.75rem' }}>El primer paso es gratuito</h3>
          <p style={{ color: '#78909C', marginBottom: '1.25rem' }}>
            Calcula tu horario de sueño ideal. Es gratis y puede cambiar cómo te sientes cada mañana.
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

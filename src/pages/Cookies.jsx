import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import '../styles/blog.css';

function Cookies() {
  return (
    <div className="legal-page">
      <Helmet>
        <title>Política de Cookies | Calculadora de Sueño</title>
        <meta name="description" content="Política de cookies de calculadora-sueno.com. Información sobre los tipos de cookies usadas y cómo gestionarlas." />
        <link rel="canonical" href="https://calculadora-sueno.com/cookies" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <header className="legal-hero">
        <div className="legal-container">
          <nav className="blog-breadcrumb">
            <Link to="/">Inicio</Link> › <span>Política de Cookies</span>
          </nav>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#37474F', margin: '0.5rem 0' }}>
            Política de Cookies
          </h1>
          <p style={{ color: '#78909C', fontSize: '0.875rem' }}>Última actualización: marzo de 2026</p>
        </div>
      </header>

      <div className="legal-body">
        <div className="legal-card">
          <h2>¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo cuando
            los visitas. Sirven para recordar tus preferencias, analizar el tráfico y personalizar anuncios.
          </p>

          <h2>Cookies que usamos</h2>

          <h2 style={{ fontSize: '1.1rem', borderBottom: 'none', marginTop: '1rem' }}>1. Cookies técnicas (esenciales)</h2>
          <p>
            Necesarias para el funcionamiento básico del sitio. No requieren consentimiento.
          </p>
          <ul>
            <li><strong>cookies_consent</strong>: guarda tu preferencia de cookies (localStorage). Duración: indefinida hasta que la borres manualmente.</li>
          </ul>

          <h2 style={{ fontSize: '1.1rem', borderBottom: 'none', marginTop: '1rem' }}>2. Cookies analíticas (Google Analytics 4)</h2>
          <p>
            Solo se activan si aceptas «todas las cookies». Nos permiten entender cómo se usa el sitio
            (páginas más visitadas, tiempo de sesión, dispositivos). Los datos son anónimos y agregados.
          </p>
          <ul>
            <li><strong>_ga</strong>: identifica sesiones únicas. Duración: 2 años.</li>
            <li><strong>_ga_*</strong>: mantiene el estado de la sesión. Duración: 2 años.</li>
          </ul>

          <h2 style={{ fontSize: '1.1rem', borderBottom: 'none', marginTop: '1rem' }}>3. Cookies publicitarias (Google AdSense)</h2>
          <p>
            Solo se activan si aceptas «todas las cookies». Google AdSense usa estas cookies para mostrar
            anuncios relevantes basados en tus visitas a otros sitios. Consulta la{' '}
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
              política de publicidad de Google
            </a>.
          </p>

          <h2>Cómo gestionar las cookies</h2>
          <p>
            Puedes cambiar tus preferencias en cualquier momento borrando el ítem <code>cookies_consent</code>
            de localStorage en las herramientas de desarrollador de tu navegador. Al recargar la página
            aparecerá de nuevo el banner de consentimiento.
          </p>
          <p>También puedes gestionar las cookies directamente desde tu navegador:</p>
          <ul>
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Chrome</a></li>
            <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer">Firefox</a></li>
            <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
          </ul>

          <h2>Más información</h2>
          <p>
            Para más detalles sobre cómo tratamos tus datos, consulta nuestra{' '}
            <Link to="/privacidad">Política de Privacidad</Link>.
          </p>
        </div>
      </div>

      <footer className="blog-footer">
        <div className="legal-container">
          <Link to="/">← Volver a la Calculadora</Link>
        </div>
      </footer>
    </div>
  );
}

export default Cookies;

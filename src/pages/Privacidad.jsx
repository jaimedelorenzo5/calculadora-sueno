import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import '../styles/blog.css';

function Privacidad() {
  return (
    <div className="legal-page">
      <Helmet>
        <title>Política de Privacidad | Calculadora de Sueño</title>
        <meta name="description" content="Política de privacidad de calculadora-sueno.com. Información sobre datos recopilados, cookies, afiliados y derechos RGPD." />
        <link rel="canonical" href="https://calculadora-sueno.com/privacidad" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <header className="legal-hero">
        <div className="legal-container">
          <nav className="blog-breadcrumb">
            <Link to="/">Inicio</Link> › <span>Política de Privacidad</span>
          </nav>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#37474F', margin: '0.5rem 0' }}>
            Política de Privacidad
          </h1>
          <p style={{ color: '#78909C', fontSize: '0.875rem' }}>Última actualización: marzo de 2026</p>
        </div>
      </header>

      <div className="legal-body">
        <div className="legal-card">
          <h2>1. Responsable del tratamiento</h2>
          <p>
            El responsable del sitio web <strong>calculadora-sueno.com</strong> es el titular del proyecto.
            Para cualquier consulta relacionada con la privacidad puedes contactarnos en:{' '}
            <a href="mailto:info@calculadora-sueno.com">info@calculadora-sueno.com</a>.
          </p>

          <h2>2. Datos que recopilamos</h2>
          <p>Este sitio web recopila los siguientes tipos de datos:</p>
          <ul>
            <li><strong>Datos de navegación anónimos:</strong> páginas visitadas, tiempo de sesión y dispositivo, recogidos a través de Google Analytics 4. Estos datos no te identifican personalmente.</li>
            <li><strong>Cookies publicitarias:</strong> si aceptas todas las cookies, Google AdSense puede mostrar anuncios personalizados basándose en tu historial de navegación.</li>
            <li><strong>Datos del formulario de contacto:</strong> nombre, dirección de correo electrónico y mensaje. Se procesan mediante Netlify Forms y solo se usan para responder tu consulta.</li>
          </ul>

          <h2>3. Finalidad del tratamiento</h2>
          <ul>
            <li>Mejorar el servicio y la experiencia del usuario (analytics).</li>
            <li>Mostrar publicidad contextual y financiar el funcionamiento gratuito del sitio (AdSense).</li>
            <li>Responder a consultas enviadas a través del formulario de contacto.</li>
          </ul>

          <h2>4. Base legal (RGPD)</h2>
          <p>
            La base legal para el tratamiento de datos de análisis y publicidad es tu <strong>consentimiento</strong>,
            que puedes otorgar o retirar en cualquier momento a través del banner de cookies.
            El tratamiento de los datos del formulario de contacto se basa en tu solicitud expresa de respuesta.
          </p>

          <h2>5. Cookies de terceros</h2>
          <p>
            Si aceptas todas las cookies, se activarán los servicios de Google Analytics 4 y Google AdSense,
            que pueden establecer sus propias cookies. Consulta las políticas de privacidad de Google para más
            información. Puedes gestionar tus preferencias en cualquier momento desde la{' '}
            <Link to="/cookies">política de cookies</Link>.
          </p>

          <h2>6. Enlaces de afiliado (Amazon Associates)</h2>
          <p>
            Algunas páginas de este sitio contienen <strong>enlaces de afiliado de Amazon</strong>.
            Si haces clic en estos enlaces y realizas una compra, recibimos una comisión sin coste adicional para ti.
            Esto no influye en nuestras recomendaciones: solo incluimos productos que consideramos genuinamente útiles.
          </p>

          <h2>7. Conservación de los datos</h2>
          <p>
            Los datos de Google Analytics se conservan durante 14 meses según la configuración predeterminada de GA4.
            Los mensajes del formulario de contacto se conservan el tiempo necesario para responder tu consulta.
          </p>

          <h2>8. Tus derechos</h2>
          <p>De acuerdo con el RGPD, tienes derecho a:</p>
          <ul>
            <li><strong>Acceso:</strong> conocer qué datos tenemos sobre ti.</li>
            <li><strong>Rectificación:</strong> corregir datos inexactos.</li>
            <li><strong>Supresión:</strong> solicitar la eliminación de tus datos.</li>
            <li><strong>Oposición:</strong> oponerte al tratamiento de tus datos.</li>
            <li><strong>Portabilidad:</strong> recibir tus datos en formato estructurado.</li>
          </ul>
          <p>
            Para ejercer cualquiera de estos derechos, escríbenos a{' '}
            <a href="mailto:info@calculadora-sueno.com">info@calculadora-sueno.com</a>.
            También puedes presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD).
          </p>

          <h2>9. Seguridad</h2>
          <p>
            Este sitio web utiliza HTTPS en todas sus comunicaciones. No almacenamos contraseñas,
            datos bancarios ni información sensible.
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

export default Privacidad;

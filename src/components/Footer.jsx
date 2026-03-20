import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h3 style={{
            color: 'var(--brand)',
            marginBottom: 'var(--space-4)',
            fontSize: 'var(--font-size-xl)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-2)'
          }}>
            🌙 Calculadora de Sueño
          </h3>
          <p style={{
            color: 'var(--muted)',
            marginBottom: 'var(--space-6)',
            textAlign: 'center',
            maxWidth: '500px',
            margin: '0 auto var(--space-6) auto'
          }}>
            Herramienta gratuita para calcular tu horario de sueño ideal basado en la ciencia de los ciclos de sueño.
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-8)',
          justifyContent: 'center',
          marginBottom: 'var(--space-8)'
        }}>
          <div>
            <h4 style={{ color: 'var(--text)', marginBottom: 'var(--space-3)' }}>Contenido</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: 'var(--space-2)' }}>
                <Link to="/blog" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Blog del sueño</Link>
              </li>
              <li style={{ marginBottom: 'var(--space-2)' }}>
                <Link to="/recursos" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Recursos recomendados</Link>
              </li>
              <li style={{ marginBottom: 'var(--space-2)' }}>
                <a href="/articulos/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Artículos</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'var(--text)', marginBottom: 'var(--space-3)' }}>Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: 'var(--space-2)' }}>
                <Link to="/privacidad" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Privacidad</Link>
              </li>
              <li style={{ marginBottom: 'var(--space-2)' }}>
                <Link to="/aviso-legal" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Aviso legal</Link>
              </li>
              <li style={{ marginBottom: 'var(--space-2)' }}>
                <Link to="/cookies" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Cookies</Link>
              </li>
              <li style={{ marginBottom: 'var(--space-2)' }}>
                <Link to="/contacto" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Contacto</Link>
              </li>
            </ul>
          </div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          border: '2px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: 'var(--space-4)',
          marginBottom: 'var(--space-6)',
          textAlign: 'center',
          backdropFilter: 'blur(10px)'
        }}>
          <p style={{ color: 'var(--muted)', fontSize: 'var(--font-size-sm)', margin: 0, lineHeight: 1.6 }}>
            <strong>Importante:</strong> Esta herramienta es informativa y educativa.
            No sustituye el consejo médico profesional. Si tienes problemas de sueño persistentes,
            consulta con un especialista en medicina del sueño.
          </p>
        </div>

        <div style={{ borderTop: '2px solid var(--border)', paddingTop: 'var(--space-6)', textAlign: 'center' }}>
          <p style={{ color: 'var(--muted)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-2)' }}>
            © {currentYear} Calculadora de Sueño. Herramienta gratuita para mejorar tu descanso.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: 'var(--font-size-xs)', margin: 0 }}>
            Basado en investigación científica sobre ciclos de sueño y cronobiología.
            {' '}Participante en el Programa de Afiliados de Amazon (calculadora02-21).
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

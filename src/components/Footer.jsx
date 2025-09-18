import React from 'react';

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
            <h4 style={{ 
              color: 'var(--text)', 
              marginBottom: 'var(--space-3)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)'
            }}>
              Enlaces útiles
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: 'var(--space-2)' }}>
                <a href="#tips" style={{ 
                  color: 'var(--muted)', 
                  textDecoration: 'none',
                  transition: 'var(--transition)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)'
                }}>
                  Consejos para dormir
                </a>
              </li>
              <li style={{ marginBottom: 'var(--space-2)' }}>
                <a href="#faq" style={{ 
                  color: 'var(--muted)', 
                  textDecoration: 'none',
                  transition: 'var(--transition)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)'
                }}>
                  Preguntas frecuentes
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ 
              color: 'var(--text)', 
              marginBottom: 'var(--space-3)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)'
            }}>
              Recursos
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: 'var(--space-2)' }}>
                <a href="#ciclos-sueno" style={{ 
                  color: 'var(--muted)', 
                  textDecoration: 'none',
                  transition: 'var(--transition)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)'
                }}>
                  Ciclos de sueño
                </a>
              </li>
              <li style={{ marginBottom: 'var(--space-2)' }}>
                <a href="#higiene-sueno" style={{ 
                  color: 'var(--muted)', 
                  textDecoration: 'none',
                  transition: 'var(--transition)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)'
                }}>
                  Higiene del sueño
                </a>
              </li>
              <li style={{ marginBottom: 'var(--space-2)' }}>
                <a href="/sobre-proyecto.html" style={{ 
                  color: 'var(--muted)', 
                  textDecoration: 'none',
                  transition: 'var(--transition)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)'
                }}>
                  Sobre el proyecto
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Disclaimer médico */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          border: '2px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: 'var(--space-4)',
          marginBottom: 'var(--space-6)',
          textAlign: 'center',
          backdropFilter: 'blur(10px)'
        }}>
          <p style={{ 
            color: 'var(--muted)', 
            fontSize: 'var(--font-size-sm)',
            margin: 0,
            lineHeight: 1.6
          }}>
            <strong>Importante:</strong> Esta herramienta es informativa y educativa. 
            No sustituye el consejo médico profesional. Si tienes problemas de sueño persistentes, 
            consulta con un especialista en medicina del sueño.
          </p>
        </div>
        
        <div style={{ 
          borderTop: '2px solid var(--border)', 
          paddingTop: 'var(--space-6)',
          textAlign: 'center'
        }}>
          <p style={{ 
            color: 'var(--muted)', 
            fontSize: 'var(--font-size-sm)',
            marginBottom: 'var(--space-2)'
          }}>
            © {currentYear} Calculadora de Sueño. Herramienta gratuita para mejorar tu descanso.
          </p>
          <div style={{ 
            color: 'var(--muted)', 
            fontSize: 'var(--font-size-xs)',
            margin: 0,
            display: 'flex',
            gap: 'var(--space-4)',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <span>Basado en investigación científica sobre ciclos de sueño y cronobiología.</span>
            <a href="/legal/privacidad.html" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Privacidad</a>
            <a href="/legal/terminos.html" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Términos</a>
            <a href="/contacto.html" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Contacto</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

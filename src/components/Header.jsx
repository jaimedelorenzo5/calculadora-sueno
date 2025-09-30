import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <h1 className="scroll-fade-in" style={{ animationDelay: '0.2s' }}>Calculadora de Sueño: tu hora ideal para dormir y despertar</h1>
      <p className="scroll-fade-in" style={{ animationDelay: '0.4s' }}>
        Descubre cuándo acostarte y despertarte basándose en ciclos de sueño de 90 minutos 
        para sentirte descansado y energético cada día. Una herramienta científica para tu bienestar.
      </p>
      <nav className="scroll-fade-in" style={{ animationDelay: '0.5s', marginTop: 'var(--space-4)' }}>
        <a href="/articulos/" style={{
          color: 'var(--brand)',
          textDecoration: 'none',
          fontWeight: 600,
          border: '1px solid var(--brand)',
          padding: '0.5rem 0.75rem',
          borderRadius: 'var(--radius)'
        }}>
          Explorar artículos →
        </a>
      </nav>
      
      <div className="scroll-fade-in" style={{
        marginTop: 'var(--space-6)',
        padding: 'var(--space-4)',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
        backdropFilter: 'blur(10px)',
        fontSize: 'var(--font-size-sm)',
        color: 'var(--muted)',
        animationDelay: '0.6s'
      }}>
        <strong>Consejo:</strong> Los ciclos de sueño de 90 minutos te permiten despertar en el momento óptimo, 
        sintiéndote más descansado y alerta durante el día.
      </div>
    </header>
  );
};

export default Header;

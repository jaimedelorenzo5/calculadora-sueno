import React from 'react';

const Header = ({ theme, onThemeToggle }) => {
  return (
    <header className="header">
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 'var(--space-4)',
        fontSize: 'var(--font-size-4xl)'
      }}>
        🌙✨💤
      </div>
      
      <h1>Calculadora de Sueño: tu hora ideal para dormir y despertar</h1>
      <p>
        Descubre cuándo acostarte y despertarte basándote en ciclos de sueño de 90 minutos 
        para sentirte descansado y energético cada día. Una herramienta científica para tu bienestar.
      </p>
      
      <button 
        className="theme-toggle"
        onClick={onThemeToggle}
        aria-label={`Cambiar a tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}
        title={`Cambiar a tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
      
      <div style={{
        marginTop: 'var(--space-6)',
        padding: 'var(--space-4)',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
        backdropFilter: 'blur(10px)',
        fontSize: 'var(--font-size-sm)',
        color: 'var(--muted)'
      }}>
        💡 <strong>Consejo:</strong> Los ciclos de sueño de 90 minutos te permiten despertar en el momento óptimo, 
        sintiéndote más descansado y alerta durante el día.
      </div>
    </header>
  );
};

export default Header;

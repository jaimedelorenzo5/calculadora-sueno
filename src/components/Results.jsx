import React from 'react';
import { generateICS, formatSleepDuration } from '../lib/sleep.js';

const Results = ({ results, mode, onCopy, onShare, onAddToCalendar }) => {
  if (!results || results.length === 0) return null;

  const handleCopy = (result) => {
    const text = `${mode === 'wake' ? 'Para despertarte' : 'Para acostarte'} a las ${result.time}: ${result.label} - Calidad: ${result.quality}`;
    onCopy(text);
  };

  const handleShare = async (result) => {
    const shareData = {
      title: 'Calculadora de Sueño',
      text: `${mode === 'wake' ? 'Para despertarte' : 'Para acostarte'} a las ${result.time}: ${result.label}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error al compartir:', error);
      }
    } else {
      // Fallback: copiar al portapapeles
      onCopy(shareData.text);
    }
  };

  const handleAddToCalendar = (result) => {
    const icsContent = generateICS(result);
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `sueño-${result.quality}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    onAddToCalendar(result);
  };

  const getQualityClass = (quality) => {
    switch (quality) {
      case 'óptima': return 'optimal';
      case 'buena': return 'good';
      case 'mínima': return 'minimal';
      default: return 'minimal';
    }
  };

  return (
    <section className="results" aria-live="polite">
      <h2 className="section-title">Horarios recomendados</h2>
      
      {results.map((result, index) => (
        <div key={index} className="result-card">
          <div className="result-header">
            <div className="result-time">{result.time}</div>
            <span className={`quality-badge ${getQualityClass(result.quality)}`}>
              {result.quality}
            </span>
          </div>
          
          <div className="result-label">{result.label}</div>
          <div style={{ color: 'var(--muted)', fontSize: 'var(--font-size-sm)' }}>
            Duración total: {formatSleepDuration(result.totalMinutes)}
          </div>
          
          <div className="result-actions">
            <button
              className="btn btn-secondary"
              onClick={() => handleCopy(result)}
              aria-label="Copiar resultado"
            >
              📋 Copiar
            </button>
            
            <button
              className="btn btn-secondary"
              onClick={() => handleShare(result)}
              aria-label="Compartir resultado"
            >
              📤 Compartir
            </button>
            
            <button
              className="btn btn-secondary"
              onClick={() => handleAddToCalendar(result)}
              aria-label="Añadir al calendario"
            >
              📅 Calendario
            </button>
          </div>
        </div>
      ))}
      
      <div style={{ 
        textAlign: 'center', 
        marginTop: 'var(--space-6)', 
        color: 'var(--muted)',
        fontSize: 'var(--font-size-sm)'
      }}>
        💡 Los horarios se basan en ciclos de 90 minutos. 
        {mode === 'wake' ? ' Elige el que mejor se adapte a tu rutina.' : ' Ajusta según tu experiencia personal.'}
      </div>
    </section>
  );
};

export default Results;

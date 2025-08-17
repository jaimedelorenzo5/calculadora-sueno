import React from 'react';
import { formatSleepDuration } from '../lib/sleep.js';

const Results = ({ results, mode }) => {
  if (!results || results.length === 0) return null;

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

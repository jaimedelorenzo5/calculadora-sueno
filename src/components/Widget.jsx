import React, { useState } from 'react';
import { calculateSleepTimes } from '../lib/sleep.js';
import './widget.css';

const Widget = ({ 
  theme = 'light',
  showHeader = true,
  showTips = false,
  showFooter = false,
  height = 'auto'
}) => {
  const [config, setConfig] = useState({
    mode: 'wake',
    time: '07:00',
    latency: '15'
  });
  
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Cambiar modo
  const handleModeChange = (mode) => {
    setConfig(prev => ({ ...prev, mode }));
  };

  // Cambiar hora
  const handleTimeChange = (time) => {
    setConfig(prev => ({ ...prev, time }));
  };

  // Cambiar latencia
  const handleLatencyChange = (latency) => {
    setConfig(prev => ({ ...prev, latency }));
  };

  // Calcular horarios
  const handleCalculate = () => {
    if (!config.time) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      try {
        const sleepResults = calculateSleepTimes(
          config.mode, 
          config.time, 
          parseInt(config.latency)
        );
        setResults(sleepResults);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al calcular:', error);
        setIsLoading(false);
      }
    }, 300);
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
    <div 
      className={`sleep-widget ${theme}`} 
      style={{ height: height !== 'auto' ? height : 'auto' }}
      data-theme={theme}
    >
      {showHeader && (
        <div className="widget-header">
          <h3>🌙 Calculadora de Sueño</h3>
          <p>Descubre tu horario ideal para dormir y despertar</p>
        </div>
      )}
      
      <div className="widget-form">
        <div className="mode-toggle">
          <button
            type="button"
            className={config.mode === 'wake' ? 'active' : ''}
            onClick={() => handleModeChange('wake')}
          >
            🌅 Me levanto a
          </button>
          <button
            type="button"
            className={config.mode === 'sleep' ? 'active' : ''}
            onClick={() => handleModeChange('sleep')}
          >
            🌙 Me acuesto a
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="widget-time">
            {config.mode === 'wake' ? '⏰ ¿A qué hora quieres despertarte?' : '🛏️ ¿A qué hora quieres acostarte?'}
          </label>
          <input
            type="time"
            id="widget-time"
            value={config.time}
            onChange={(e) => handleTimeChange(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="widget-latency">
            😴 ¿Cuánto tardas en quedarte dormido?
          </label>
          <select
            id="widget-latency"
            value={config.latency}
            onChange={(e) => handleLatencyChange(e.target.value)}
          >
            <option value="0">0 minutos</option>
            <option value="10">10 minutos</option>
            <option value="15">15 minutos</option>
            <option value="20">20 minutos</option>
          </select>
        </div>

        <button
          type="button"
          className="calculate-btn"
          onClick={handleCalculate}
          disabled={!config.time || isLoading}
        >
          {isLoading ? '🧮 Calculando...' : '✨ Calcular horarios'}
        </button>
      </div>
      
      {results.length > 0 && (
        <div className="widget-results">
          <h4>Horarios recomendados:</h4>
          {results.map((result, index) => (
            <div key={index} className="result-item">
              <div className="result-time">{result.time}</div>
              <div className="result-label">{result.label}</div>
              <span className={`quality-badge ${getQualityClass(result.quality)}`}>
                {result.quality}
              </span>
            </div>
          ))}
        </div>
      )}
      
      {showTips && (
        <div className="widget-tips">
          <p>💡 Los ciclos de sueño de 90 minutos te permiten despertar en el momento óptimo.</p>
        </div>
      )}
      
      {showFooter && (
        <div className="widget-footer">
          <p>
            <a href="https://calculadora-sueno.com" target="_blank" rel="noopener noreferrer">
              Calculadora de Sueño
            </a> - Herramienta gratuita para mejorar tu descanso
          </p>
        </div>
      )}
    </div>
  );
};

export default Widget;

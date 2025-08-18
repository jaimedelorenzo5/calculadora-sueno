import React, { useState, useEffect } from 'react';
import { calculateSleepTimes } from './lib/sleep.js';
import { getConfig, getConfigSilent, syncConfig, syncConfigSilent, onURLChange, cleanDefaultURLParams } from './lib/urlState.js';
import { updateMetaTags } from './lib/seo.js';
import { 
  trackSleepCalculation, 
  trackModeChange, 
  trackThemeChange, 
  initWebVitalsTracking,
  trackUserEngagement
} from './lib/analytics.js';
import Header from './components/Header';
import SleepForm from './components/SleepForm';
import Results from './components/Results';
import Tips from './components/Tips';
import FAQ from './components/FAQ';
import ShareButtons from './components/ShareButtons';

import Footer from './components/Footer';
import './styles/app.css';

function App() {
  // Estado principal
  const [config, setConfig] = useState({
    mode: 'wake',
    time: '07:00',
    latency: '15',
    theme: 'light'
  });
  
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState('');

  // Inicialización y sincronización con URL
  useEffect(() => {
    // Usar getConfigSilent para evitar guardar en URL automáticamente
    const initialConfig = getConfigSilent();
    // Forzar tema claro
    const configWithLightTheme = { ...initialConfig, theme: 'light' };
    setConfig(configWithLightTheme);
    
    // Aplicar tema claro
    document.documentElement.setAttribute('data-theme', 'light');
    
    // Limpiar URL inmediatamente si tiene parámetros por defecto
    setTimeout(() => {
      if (window.location.search.includes('mode=wake') && 
          window.location.search.includes('time=07%3A00') && 
          window.location.search.includes('latency=15')) {
        window.history.replaceState({}, '', window.location.pathname);
      }
    }, 50);
    
    // Actualizar SEO
    updateMetaTags(configWithLightTheme);
    
    // Inicializar analytics
    initWebVitalsTracking();
    trackUserEngagement();
    
    // Escuchar cambios en URL
    const unsubscribe = onURLChange(() => {
      const newConfig = getConfig();
      // Forzar tema claro en cambios de URL
      const newConfigWithLightTheme = { ...newConfig, theme: 'light' };
      setConfig(newConfigWithLightTheme);
      document.documentElement.setAttribute('data-theme', 'light');
      updateMetaTags(newConfigWithLightTheme);
    });
    
    return unsubscribe;
  }, []);

  // Sincronizar configuración cuando cambie
  useEffect(() => {
    // Asegurar que siempre se sincronice con tema claro
    const configWithLightTheme = { ...config, theme: 'light' };
    
    // Solo sincronizar si no es la configuración inicial por defecto
    const isInitialLoad = !window.location.search;
    if (!isInitialLoad) {
      syncConfig(configWithLightTheme);
    } else {
      // En carga inicial, solo guardar en localStorage
      syncConfigSilent(configWithLightTheme);
    }
    
    updateMetaTags(configWithLightTheme);
  }, [config]);

  // Cambiar tema
  // Tema fijo en modo claro
  const handleThemeToggle = () => {
    // No hacer nada - tema siempre en modo claro
  };

  // Cambiar modo
  const handleModeChange = (mode) => {
    setConfig(prev => ({ ...prev, mode }));
    trackModeChange(mode);
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
    
    // Simular cálculo asíncrono para mejor UX
    setTimeout(() => {
      try {
        const sleepResults = calculateSleepTimes(
          config.mode, 
          config.time, 
          parseInt(config.latency)
        );
        setResults(sleepResults);
        setIsLoading(false);
        
        // Trackear cálculo exitoso
        if (sleepResults.length > 0) {
          const bestResult = sleepResults[0];
          trackSleepCalculation(config.mode, config.time, config.latency, bestResult.cycles);
        }
      } catch (error) {
        console.error('Error al calcular:', error);
        setIsLoading(false);
        setNotification('Error al calcular los horarios. Inténtalo de nuevo.');
      }
    }, 500);
  };

  return (
    <div className="app">
      <div className="container">
        <Header />
        
        <SleepForm
          mode={config.mode}
          time={config.time}
          latency={config.latency}
          onModeChange={handleModeChange}
          onTimeChange={handleTimeChange}
          onLatencyChange={handleLatencyChange}
          onCalculate={handleCalculate}
          isLoading={isLoading}
        />
        
        {results.length > 0 && (
          <Results
            results={results}
            mode={config.mode}
          />
        )}
        
        <Tips />
        
        <FAQ />
        
        <ShareButtons 
          config={config} 
        />

        {/* Artículos relacionados / enlace a pilar */}
        <section className="home-related">
          <h2 className="section-title">Artículos relacionados</h2>
          <div className="articles-grid">
            <a className="article-card" href="/articles/como-funciona-el-sueno-fases-etapas.html">
              <h3>Cómo funciona el sueño: fases y etapas del descanso</h3>
              <p>Entiende los ciclos de 90 minutos, las fases REM/No REM y por qué influyen en cómo te despiertas.</p>
              <span className="article-card-cta">Leer artículo →</span>
            </a>
          </div>
        </section>
        
        <Footer />
      </div>
      
      {/* Notificación toast */}
      {notification && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--brand)',
          color: 'white',
          padding: 'var(--space-3) var(--space-4)',
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 1000,
          fontSize: 'var(--font-size-sm)'
        }}>
          {notification}
        </div>
      )}
      
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { calculateSleepTimes } from './lib/sleep.js';
import { getConfig, syncConfig, onURLChange } from './lib/urlState.js';
import { updateMetaTags } from './lib/seo.js';
import Header from './components/Header';
import SleepForm from './components/SleepForm';
import Results from './components/Results';
import Tips from './components/Tips';
import FAQ from './components/FAQ';
import ShareButtons from './components/ShareButtons';
import AdSlot from './components/AdSlot';
import Footer from './components/Footer';
import './styles/app.css';

function App() {
  // Estado principal
  const [config, setConfig] = useState({
    mode: 'wake',
    time: '07:00',
    latency: '15',
    theme: 'dark'
  });
  
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState('');

  // Inicialización y sincronización con URL
  useEffect(() => {
    const initialConfig = getConfig();
    setConfig(initialConfig);
    
    // Aplicar tema
    document.documentElement.setAttribute('data-theme', initialConfig.theme);
    
    // Actualizar SEO
    updateMetaTags(initialConfig);
    
    // Escuchar cambios en URL
    const unsubscribe = onURLChange(() => {
      const newConfig = getConfig();
      setConfig(newConfig);
      document.documentElement.setAttribute('data-theme', newConfig.theme);
      updateMetaTags(newConfig);
    });
    
    return unsubscribe;
  }, []);

  // Sincronizar configuración cuando cambie
  useEffect(() => {
    syncConfig(config);
    updateMetaTags(config);
  }, [config]);

  // Cambiar tema
  const handleThemeToggle = () => {
    const newTheme = config.theme === 'dark' ? 'light' : 'dark';
    const newConfig = { ...config, theme: newTheme };
    setConfig(newConfig);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

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
      } catch (error) {
        console.error('Error al calcular:', error);
        setIsLoading(false);
        setNotification('Error al calcular los horarios. Inténtalo de nuevo.');
      }
    }, 500);
  };

  // Copiar al portapapeles
  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setNotification('Copiado al portapapeles');
    } catch (error) {
      // Fallback para navegadores antiguos
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setNotification('Copiado al portapapeles');
    }
    
    // Limpiar notificación después de 3 segundos
    setTimeout(() => setNotification(''), 3000);
  };

  // Compartir
  const handleShare = (result) => {
    setNotification('Función de compartir ejecutada');
    setTimeout(() => setNotification(''), 3000);
  };

  // Añadir al calendario
  const handleAddToCalendar = (result) => {
    setNotification('Evento añadido al calendario');
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="app">
      <div className="container">
        <Header 
          theme={config.theme} 
          onThemeToggle={handleThemeToggle} 
        />
        
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
            onCopy={handleCopy}
            onShare={handleShare}
            onAddToCalendar={handleAddToCalendar}
          />
        )}
        
        <Tips />
        
        <AdSlot />
        
        <FAQ />
        
        <ShareButtons 
          config={config} 
          onCopy={handleCopy} 
        />
        
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

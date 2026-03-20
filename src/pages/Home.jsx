import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { calculateSleepTimes } from '../lib/sleep.js';
import { getConfig, getConfigSilent, syncConfig, syncConfigSilent, onURLChange } from '../lib/urlState.js';
import { updateMetaTags } from '../lib/seo.js';
import {
  trackSleepCalculation,
  trackModeChange,
  initWebVitalsTracking,
  trackUserEngagement
} from '../lib/analytics.js';
import Header from '../components/Header';
import SleepForm from '../components/SleepForm';
import Results from '../components/Results';
import Tips from '../components/Tips';
import FAQ from '../components/FAQ';
import ShareButtons from '../components/ShareButtons';
import Footer from '../components/Footer';

function Home() {
  const [config, setConfig] = useState({
    mode: 'wake',
    time: '07:00',
    latency: '15',
    theme: 'light'
  });

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const initialConfig = getConfigSilent();
    const configWithLightTheme = { ...initialConfig, theme: 'light' };
    setConfig(configWithLightTheme);
    document.documentElement.setAttribute('data-theme', 'light');

    setTimeout(() => {
      if (window.location.search.includes('mode=wake') &&
          window.location.search.includes('time=07%3A00') &&
          window.location.search.includes('latency=15')) {
        window.history.replaceState({}, '', window.location.pathname);
      }
    }, 50);

    updateMetaTags(configWithLightTheme);
    initWebVitalsTracking();
    trackUserEngagement();

    const unsubscribe = onURLChange(() => {
      const newConfig = getConfig();
      const newConfigWithLightTheme = { ...newConfig, theme: 'light' };
      setConfig(newConfigWithLightTheme);
      document.documentElement.setAttribute('data-theme', 'light');
      updateMetaTags(newConfigWithLightTheme);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const configWithLightTheme = { ...config, theme: 'light' };
    const isInitialLoad = !window.location.search;
    if (!isInitialLoad) {
      syncConfig(configWithLightTheme);
    } else {
      syncConfigSilent(configWithLightTheme);
    }
    updateMetaTags(configWithLightTheme);
  }, [config]);

  const handleModeChange = (mode) => {
    setConfig(prev => ({ ...prev, mode }));
    trackModeChange(mode);
  };

  const handleTimeChange = (time) => {
    setConfig(prev => ({ ...prev, time }));
  };

  const handleLatencyChange = (latency) => {
    setConfig(prev => ({ ...prev, latency }));
  };

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
      <Helmet>
        <title>Calculadora de Sueño: tu hora ideal para dormir y despertar</title>
        <meta name="description" content="Calcula a qué hora dormir o despertar basándote en ciclos de sueño de 90 minutos. Herramienta gratuita para mejorar la calidad de tu descanso." />
        <link rel="canonical" href="https://calculadora-sueno.com/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Calculadora de Sueño",
          "url": "https://calculadora-sueno.com",
          "description": "Calcula a qué hora dormir según tus ciclos de sueño de 90 minutos",
          "applicationCategory": "HealthApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
        })}</script>
      </Helmet>

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
          <Results results={results} mode={config.mode} />
        )}

        <Tips />
        <FAQ />
        <ShareButtons config={config} />

        <section className="home-related">
          <h2 className="section-title">Artículos relacionados</h2>
          <div className="articles-grid">
            <a className="article-card" href="/blog/ciclos-de-sueno-que-son">
              <h3>Ciclos de sueño: qué son y por qué importan</h3>
              <p>Entiende los ciclos de 90 minutos y por qué despertarte al final de uno marca la diferencia.</p>
              <span className="article-card-cta">Leer artículo →</span>
            </a>
            <a className="article-card" href="/blog/cuantas-horas-dormir-adulto">
              <h3>¿Cuántas horas debe dormir un adulto?</h3>
              <p>Descubre cuántas horas necesitas dormir según tu edad con recomendaciones basadas en evidencia.</p>
              <span className="article-card-cta">Leer artículo →</span>
            </a>
            <a className="article-card" href="/blog/por-que-me-despierto-cansado">
              <h3>¿Por qué me despierto cansado si dormí 8 horas?</h3>
              <p>Las causas más frecuentes y cómo solucionarlo optimizando tus ciclos de sueño.</p>
              <span className="article-card-cta">Leer artículo →</span>
            </a>
          </div>
        </section>

        <Footer />
      </div>

      {notification && (
        <div style={{
          position: 'fixed', bottom: '20px', left: '50%',
          transform: 'translateX(-50%)', background: 'var(--brand)',
          color: 'white', padding: 'var(--space-3) var(--space-4)',
          borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)',
          zIndex: 1000, fontSize: 'var(--font-size-sm)'
        }}>
          {notification}
        </div>
      )}
    </div>
  );
}

export default Home;

// Configuración de Google Analytics para Calculadora de Sueño

// Función para trackear eventos personalizados
export function trackEvent(action, category, label, value) {
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
}

// Función para trackear cálculos de sueño
export function trackSleepCalculation(mode, time, latency, cycles) {
  trackEvent('sleep_calculation', 'calculator', `${mode}_${time}_${latency}`, cycles);
}

// Función para trackear cambios de modo
export function trackModeChange(mode) {
  trackEvent('mode_change', 'navigation', mode);
}

// Función para trackear cambios de tema
export function trackThemeChange(theme) {
  trackEvent('theme_change', 'preferences', theme);
}

// Función para trackear copias al portapapeles
export function trackCopyAction(type) {
  trackEvent('copy', 'sharing', type);
}

// Función para trackear compartir
export function trackShareAction(platform) {
  trackEvent('share', 'social', platform);
}

// Función para trackear descarga de calendario
export function trackCalendarDownload(quality) {
  trackEvent('calendar_download', 'export', quality);
}

// Función para trackear navegación a secciones
export function trackSectionView(section) {
  trackEvent('section_view', 'navigation', section);
}

// Función para trackear errores
export function trackError(error, context) {
  trackEvent('error', 'system', context, 1);
}

// Función para trackear tiempo de carga
export function trackPageLoad() {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'timing_complete', {
      name: 'load',
      value: performance.now()
    });
  }
}

// Función para trackear métricas de Core Web Vitals
export function trackWebVitals(metric) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'web_vitals', {
      event_category: 'Web Vitals',
      event_label: metric.name,
      value: Math.round(metric.value),
      non_interaction: true
    });
  }
}

// Inicializar tracking de Core Web Vitals
export function initWebVitalsTracking() {
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            trackWebVitals({ name: 'LCP', value: entry.startTime });
          } else if (entry.entryType === 'first-input') {
            trackWebVitals({ name: 'FID', value: entry.processingStart - entry.startTime });
          } else if (entry.entryType === 'layout-shift') {
            trackWebVitals({ name: 'CLS', value: entry.value });
          }
        }
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (error) {
      console.warn('Error tracking Web Vitals:', error);
    }
  }
}

// Función para trackear engagement del usuario
export function trackUserEngagement() {
  let startTime = Date.now();
  let isActive = true;
  
  // Trackear cuando el usuario se vuelve inactivo
  const handleVisibilityChange = () => {
    if (document.hidden) {
      const sessionDuration = Date.now() - startTime;
      trackEvent('session_end', 'engagement', 'visibility_change', Math.round(sessionDuration / 1000));
      isActive = false;
    } else {
      startTime = Date.now();
      isActive = true;
    }
  };
  
  // Trackear cuando el usuario sale de la página
  const handleBeforeUnload = () => {
    if (isActive) {
      const sessionDuration = Date.now() - startTime;
      trackEvent('session_end', 'engagement', 'page_unload', Math.round(sessionDuration / 1000));
    }
  };
  
  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('beforeunload', handleBeforeUnload);
  
  // Trackear cada 30 segundos de actividad
  setInterval(() => {
    if (isActive) {
      trackEvent('heartbeat', 'engagement', 'active_user', 1);
    }
  }, 30000);
}

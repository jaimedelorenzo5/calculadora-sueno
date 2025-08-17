/**
 * Widget Embebible - Calculadora de Sueño
 * Versión: 1.0.0
 * 
 * Este widget permite a otros sitios web integrar la calculadora de sueño
 * y generar backlinks de calidad hacia calculadora-sueno.com
 */

(function() {
  'use strict';
  
  // Configuración por defecto
  const DEFAULT_CONFIG = {
    theme: 'light',
    showHeader: true,
    showTips: false,
    showFooter: true,
    height: 'auto'
  };
  
  // Función para calcular horarios de sueño
  function calculateSleepTimes(mode, targetTime, latency) {
    const time = new Date(`2000-01-01T${targetTime}:00`);
    const latencyMs = parseInt(latency) * 60 * 1000;
    
    const results = [];
    const cycles = [6, 5, 4, 3]; // Ciclos de sueño recomendados
    
    cycles.forEach(cycleCount => {
      const cycleMinutes = cycleCount * 90; // 90 minutos por ciclo
      let sleepTime, wakeTime;
      
      if (mode === 'wake') {
        // Modo "me levanto a" - calcular hora de acostarse
        wakeTime = new Date(time);
        sleepTime = new Date(wakeTime.getTime() - (cycleMinutes * 60 * 1000) - latencyMs);
      } else {
        // Modo "me acuesto a" - calcular hora de despertarse
        sleepTime = new Date(time);
        wakeTime = new Date(sleepTime.getTime() + latencyMs + (cycleMinutes * 60 * 1000));
      }
      
      // Ajustar para el día siguiente si es necesario
      if (wakeTime < sleepTime) {
        wakeTime.setDate(wakeTime.getDate() + 1);
      }
      
      const totalMinutes = Math.round((wakeTime - sleepTime) / (60 * 1000));
      
      let quality;
      if (cycleCount >= 6) quality = 'óptima';
      else if (cycleCount >= 5) quality = 'buena';
      else quality = 'mínima';
      
      results.push({
        time: sleepTime.toTimeString().slice(0, 5),
        label: `${cycleCount} ciclos (${Math.round(cycleMinutes / 60)}h)`,
        quality: quality,
        totalMinutes: totalMinutes
      });
    });
    
    return results;
  }
  
  // Función para formatear duración
  function formatSleepDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  }
  
  // Función para obtener clase de calidad
  function getQualityClass(quality) {
    switch (quality) {
      case 'óptima': return 'optimal';
      case 'buena': return 'good';
      case 'mínima': return 'minimal';
      default: return 'minimal';
    }
  }
  
  // Función para crear el HTML del widget
  function createWidgetHTML(config) {
    return `
      <div class="sleep-widget ${config.theme}" data-theme="${config.theme}">
        ${config.showHeader ? `
          <div class="widget-header">
            <h3>🌙 Calculadora de Sueño</h3>
            <p>Descubre tu horario ideal para dormir y despertar</p>
          </div>
        ` : ''}
        
        <div class="widget-form">
          <div class="mode-toggle">
            <button type="button" class="mode-btn active" data-mode="wake">
              🌅 Me levanto a
            </button>
            <button type="button" class="mode-btn" data-mode="sleep">
              🌙 Me acuesto a
            </button>
          </div>
          
          <div class="form-group">
            <label for="widget-time">
              <span class="time-label">⏰ ¿A qué hora quieres despertarte?</span>
            </label>
            <input type="time" id="widget-time" value="07:00" required>
          </div>
          
          <div class="form-group">
            <label for="widget-latency">
              😴 ¿Cuánto tardas en quedarte dormido?
            </label>
            <select id="widget-latency">
              <option value="0">0 minutos</option>
              <option value="10">10 minutos</option>
              <option value="15" selected>15 minutos</option>
              <option value="20">20 minutos</option>
            </select>
          </div>
          
          <button type="button" class="calculate-btn" id="widget-calculate">
            ✨ Calcular horarios
          </button>
        </div>
        
        <div class="widget-results" id="widget-results" style="display: none;">
          <h4>Horarios recomendados:</h4>
          <div class="results-container"></div>
        </div>
        
        ${config.showTips ? `
          <div class="widget-tips">
            <p>💡 Los ciclos de sueño de 90 minutos te permiten despertar en el momento óptimo.</p>
          </div>
        ` : ''}
        
        ${config.showFooter ? `
          <div class="widget-footer">
            <p>
              <a href="https://calculadora-sueno.com" target="_blank" rel="noopener noreferrer">
                Calculadora de Sueño
              </a> - Herramienta gratuita para mejorar tu descanso
            </p>
          </div>
        ` : ''}
      </div>
    `;
  }
  
  // Función para inicializar el widget
  function initWidget(config) {
    const container = document.querySelector(config.container);
    if (!container) {
      console.error('Widget: Contenedor no encontrado:', config.container);
      return;
    }
    
    // Aplicar configuración por defecto
    const finalConfig = { ...DEFAULT_CONFIG, ...config };
    
    // Insertar HTML del widget
    container.innerHTML = createWidgetHTML(finalConfig);
    
    // Obtener elementos del DOM
    const modeBtns = container.querySelectorAll('.mode-btn');
    const timeInput = container.querySelector('#widget-time');
    const latencySelect = container.querySelector('#widget-latency');
    const calculateBtn = container.querySelector('#widget-calculate');
    const resultsDiv = container.querySelector('#widget-results');
    const resultsContainer = container.querySelector('.results-container');
    const timeLabel = container.querySelector('.time-label');
    
    let currentMode = 'wake';
    
    // Event listeners
    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.mode;
        currentMode = mode;
        
        // Actualizar botones activos
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Actualizar etiqueta
        if (mode === 'wake') {
          timeLabel.textContent = '⏰ ¿A qué hora quieres despertarte?';
        } else {
          timeLabel.textContent = '🛏️ ¿A qué hora quieres acostarte?';
        }
        
        // Limpiar resultados
        resultsDiv.style.display = 'none';
      });
    });
    
    calculateBtn.addEventListener('click', () => {
      const time = timeInput.value;
      const latency = latencySelect.value;
      
      if (!time) {
        alert('Por favor, selecciona una hora');
        return;
      }
      
      // Mostrar loading
      calculateBtn.textContent = '🧮 Calculando...';
      calculateBtn.disabled = true;
      
      // Simular cálculo asíncrono
      setTimeout(() => {
        try {
          const results = calculateSleepTimes(currentMode, time, parseInt(latency));
          
          // Generar HTML de resultados
          const resultsHTML = results.map((result, index) => `
            <div class="result-item" style="animation-delay: ${index * 0.1}s">
              <div class="result-time">${result.time}</div>
              <div class="result-label">${result.label}</div>
              <span class="quality-badge ${getQualityClass(result.quality)}">
                ${result.quality}
              </span>
            </div>
          `).join('');
          
          resultsContainer.innerHTML = resultsHTML;
          resultsDiv.style.display = 'block';
          
          // Scroll suave a resultados
          resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          
        } catch (error) {
          console.error('Error al calcular:', error);
          alert('Error al calcular los horarios. Inténtalo de nuevo.');
        } finally {
          // Restaurar botón
          calculateBtn.textContent = '✨ Calcular horarios';
          calculateBtn.disabled = false;
        }
      }, 300);
    });
    
    // Aplicar estilos personalizados si se especifica altura
    if (finalConfig.height !== 'auto') {
      container.style.height = finalConfig.height;
      container.style.overflow = 'auto';
    }
  }
  
  // Exponer la función de inicialización globalmente
  window.SleepWidget = {
    init: initWidget,
    version: '1.0.0'
  };
  
  // Auto-inicialización si hay elementos con data-sleep-widget
  document.addEventListener('DOMContentLoaded', () => {
    const autoWidgets = document.querySelectorAll('[data-sleep-widget]');
    autoWidgets.forEach(element => {
      const config = {
        container: `#${element.id}`,
        theme: element.dataset.theme || 'light',
        showHeader: element.dataset.showHeader !== 'false',
        showTips: element.dataset.showTips === 'true',
        showFooter: element.dataset.showFooter !== 'false',
        height: element.dataset.height || 'auto'
      };
      initWidget(config);
    });
  });
  
})();

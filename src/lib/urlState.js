// Sistema de estado en URL para deep-linking y persistencia

// Parámetros de URL soportados
const URL_PARAMS = {
  MODE: 'mode',
  TIME: 'time',
  LATENCY: 'latency',
  THEME: 'theme'
};

// Valores por defecto
const DEFAULT_VALUES = {
  mode: 'wake',
  time: '07:00',
  latency: '15',
  theme: 'dark'
};

// Obtener parámetros de la URL
export function getURLParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const params = {};
  
  Object.keys(URL_PARAMS).forEach(key => {
    const paramName = URL_PARAMS[key].toLowerCase();
    const value = urlParams.get(paramName);
    if (value !== null) {
      params[paramName] = value;
    }
  });
  
  return params;
}

// Establecer parámetros en la URL
export function setURLParams(params) {
  const url = new URL(window.location);
  
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.set(key, params[key]);
    } else {
      url.searchParams.delete(key);
    }
  });
  
  // Actualizar URL sin recargar la página
  window.history.replaceState({}, '', url);
}

// Obtener valor de un parámetro específico
export function getURLParam(paramName) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(paramName);
}

// Establecer valor de un parámetro específico
export function setURLParam(paramName, value) {
  const url = new URL(window.location);
  if (value !== undefined && value !== null) {
    url.searchParams.set(paramName, value);
  } else {
    url.searchParams.delete(paramName);
  }
  window.history.replaceState({}, '', url);
}

// Obtener configuración completa (URL + localStorage + defaults)
export function getConfig() {
  const urlParams = getURLParams();
  const localStorageConfig = getLocalStorageConfig();
  
  // Si no hay parámetros en URL, usar solo localStorage + defaults
  if (Object.keys(urlParams).length === 0) {
    return {
      ...DEFAULT_VALUES,
      ...localStorageConfig
    };
  }
  
  // Si hay parámetros en URL, incluirlos
  return {
    ...DEFAULT_VALUES,
    ...localStorageConfig,
    ...urlParams
  };
}

// Obtener configuración sin guardar en URL automáticamente
export function getConfigSilent() {
  const localStorageConfig = getLocalStorageConfig();
  return {
    ...DEFAULT_VALUES,
    ...localStorageConfig
  };
}

// Guardar configuración en localStorage
export function saveConfigToLocalStorage(config) {
  try {
    localStorage.setItem('sleepCalculatorConfig', JSON.stringify(config));
  } catch (error) {
    console.warn('No se pudo guardar en localStorage:', error);
  }
}

// Obtener configuración de localStorage
export function getLocalStorageConfig() {
  try {
    const stored = localStorage.getItem('sleepCalculatorConfig');
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.warn('No se pudo leer localStorage:', error);
    return {};
  }
}

// Sincronizar configuración entre URL y localStorage
export function syncConfig(config) {
  // Guardar en localStorage
  saveConfigToLocalStorage(config);
  
  // Solo actualizar URL si NO es configuración por defecto
  const isDefaultConfig = JSON.stringify(config) === JSON.stringify(DEFAULT_VALUES);
  
  // Si es configuración por defecto, limpiar URL
  if (isDefaultConfig) {
    clearURLParams();
    return;
  }
  
  // Si no es por defecto, actualizar URL
  setURLParams(config);
}

// Sincronizar configuración solo en localStorage (sin URL)
export function syncConfigSilent(config) {
  // Solo guardar en localStorage, no tocar URL
  saveConfigToLocalStorage(config);
}

// Limpiar parámetros de URL
export function clearURLParams() {
  window.history.replaceState({}, '', window.location.pathname);
}

// Limpiar URL si solo tiene valores por defecto
export function cleanDefaultURLParams() {
  const urlParams = getURLParams();
  const isDefaultConfig = Object.keys(urlParams).every(key => 
    urlParams[key] === DEFAULT_VALUES[key]
  );
  
  if (isDefaultConfig) {
    clearURLParams();
  }
}

// Obtener URL completa para compartir
export function getShareableURL(config) {
  const url = new URL(window.location);
  
  Object.keys(config).forEach(key => {
    if (config[key] !== undefined && config[key] !== null) {
      url.searchParams.set(key, config[key]);
    }
  });
  
  return url.toString();
}

// Escuchar cambios en la URL (para navegación del navegador)
export function onURLChange(callback) {
  window.addEventListener('popstate', callback);
  return () => window.removeEventListener('popstate', callback);
}

// Validar parámetros de URL
export function validateURLParams(params) {
  const validated = {};
  
  // Validar modo
  if (params.mode === 'wake' || params.mode === 'sleep') {
    validated.mode = params.mode;
  }
  
  // Validar hora (formato HH:MM)
  if (params.time && /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(params.time)) {
    validated.time = params.time;
  }
  
  // Validar latencia
  const latency = parseInt(params.latency);
  if (!isNaN(latency) && [0, 10, 15, 20].includes(latency)) {
    validated.latency = latency.toString();
  }
  
  // Validar tema
  if (params.theme === 'light' || params.theme === 'dark') {
    validated.theme = params.theme;
  }
  
  return validated;
}

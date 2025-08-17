// Helpers para SEO, Open Graph y JSON-LD

// Configuración SEO base
export const SEO_CONFIG = {
  title: 'Calculadora de Sueño | Tu hora ideal para dormir y despertar',
  description: 'Descubre a qué hora dormir y despertar según ciclos de sueño de 90 min. Calcula tu descanso ideal y despierta con más energía cada día.',
  keywords: 'calculadora sueño, ciclos sueño, horario dormir, calidad sueño, higiene sueño, descanso',
  author: 'Calculadora de Sueño',
  url: 'https://calculadora-sueno.com',
  image: '/og-image.jpg',
  type: 'website'
};

// Generar título dinámico
export function generateTitle(mode, time) {
  if (!mode || !time) return SEO_CONFIG.title;
  
  const modeText = mode === 'wake' ? 'despertarte' : 'acostarte';
  return `Calculadora de Sueño: Horarios para ${modeText} a las ${time}`;
}

// Generar descripción dinámica
export function generateDescription(mode, time) {
  if (!mode || !time) return SEO_CONFIG.description;
  
  const modeText = mode === 'wake' ? 'despertarte' : 'acostarte';
  return `Calcula los mejores horarios para ${modeText} a las ${time}. Basado en ciclos de sueño de 90 minutos para un descanso óptimo.`;
}

// Generar meta tags para Open Graph
export function generateOpenGraphTags(config = {}) {
  const { mode, time, title, description, image } = config;
  
  const ogTitle = title || generateTitle(mode, time);
  const ogDescription = description || generateDescription(mode, time);
  
  return [
    { property: 'og:title', content: ogTitle },
    { property: 'og:description', content: ogDescription },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: window.location.href },
    { property: 'og:image', content: image || SEO_CONFIG.image },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:site_name', content: 'Calculadora de Sueño' },
    { property: 'og:locale', content: 'es_ES' }
  ];
}

// Generar meta tags para Twitter Card
export function generateTwitterCardTags(config = {}) {
  const { mode, time, title, description, image } = config;
  
  const twitterTitle = title || generateTitle(mode, time);
  const twitterDescription = description || generateDescription(mode, time);
  
  return [
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: twitterTitle },
    { name: 'twitter:description', content: twitterDescription },
    { name: 'twitter:image', content: image || SEO_CONFIG.image },
    { name: 'twitter:site', content: '@calculadorasueno' }
  ];
}

// Generar meta tags básicos
export function generateBasicMetaTags(config = {}) {
  const { mode, time, title, description, keywords } = config;
  
  const metaTitle = title || generateTitle(mode, time);
  const metaDescription = description || generateDescription(mode, time);
  
  return [
    { name: 'title', content: metaTitle },
    { name: 'description', content: metaDescription },
    { name: 'keywords', content: keywords || SEO_CONFIG.keywords },
    { name: 'author', content: SEO_CONFIG.author },
    { name: 'robots', content: 'index, follow' },
    { name: 'language', content: 'es' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'theme-color', content: '#FF8A5B' }
  ];
}

// Generar JSON-LD structured data
export function generateStructuredData(config = {}) {
  const { mode, time } = config;
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Calculadora de Sueño',
    description: SEO_CONFIG.description,
    url: window.location.href,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR'
    },
    author: {
      '@type': 'Organization',
      name: 'Calculadora de Sueño',
      url: SEO_CONFIG.url
    }
  };
  
  // Añadir información específica si hay configuración
  if (mode && time) {
    structuredData.description = generateDescription(mode, time);
    
    // Añadir FAQ structured data
    structuredData.mainEntity = generateFAQStructuredData();
  }
  
  return structuredData;
}

// Generar FAQ structured data
export function generateFAQStructuredData() {
  const faqs = [
    {
      question: '¿Cómo funciona la calculadora de sueño?',
      answer: 'La calculadora se basa en ciclos de sueño de 90 minutos. Calcula los mejores horarios para acostarte o despertarte considerando tu latencia al dormir.'
    },
    {
      question: '¿Cuántos ciclos de sueño necesito?',
      answer: 'Se recomiendan entre 4-6 ciclos completos (6-9 horas) para un descanso óptimo. La calculadora te muestra opciones para que elijas según tus necesidades.'
    },
    {
      question: '¿Qué es la latencia al dormir?',
      answer: 'Es el tiempo que tardas en quedarte dormido desde que te acuestas. Se recomienda añadir 15 minutos para cálculos más precisos.'
    },
    {
      question: '¿Puedo usar la calculadora para siestas?',
      answer: 'Sí, la calculadora incluye opciones para siestas de 20 minutos (energética) y 90 minutos (completa) basadas en ciclos de sueño.'
    },
    {
      question: '¿Los horarios son exactos?',
      answer: 'Los horarios se calculan científicamente, pero cada persona es diferente. Úsalos como guía y ajusta según tu experiencia personal.'
    }
  ];
  
  return faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }));
}

// Actualizar meta tags dinámicamente
export function updateMetaTags(config = {}) {
  // Actualizar título de la página
  document.title = generateTitle(config.mode, config.time);
  
  // Actualizar meta tags
  const basicMeta = generateBasicMetaTags(config);
  const ogMeta = generateOpenGraphTags(config);
  const twitterMeta = generateTwitterCardTags(config);
  
  // Combinar todos los meta tags
  const allMetaTags = [...basicMeta, ...ogMeta, ...twitterMeta];
  
  // Actualizar o crear meta tags
  allMetaTags.forEach(meta => {
    let element;
    
    if (meta.property) {
      element = document.querySelector(`meta[property="${meta.property}"]`);
    } else if (meta.name) {
      element = document.querySelector(`meta[name="${meta.name}"]`);
    }
    
    if (element) {
      element.setAttribute('content', meta.content);
    } else {
      const newElement = document.createElement('meta');
      Object.keys(meta).forEach(key => {
        newElement.setAttribute(key, meta[key]);
      });
      document.head.appendChild(newElement);
    }
  });
  
  // Actualizar JSON-LD
  updateStructuredData(config);
}

// Actualizar structured data
export function updateStructuredData(config = {}) {
  // Remover JSON-LD existente
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }
  
  // Crear nuevo JSON-LD
  const structuredData = generateStructuredData(config);
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
}

// Generar sitemap dinámico
export function generateSitemap() {
  const baseUrl = window.location.origin;
  const urls = [
    { url: '/', changefreq: 'weekly', priority: '1.0' },
    { url: '/?mode=wake&time=07:00', changefreq: 'monthly', priority: '0.8' },
    { url: '/?mode=sleep&time=23:00', changefreq: 'monthly', priority: '0.8' }
  ];
  
  return urls.map(url => ({
    loc: `${baseUrl}${url.url}`,
    changefreq: url.changefreq,
    priority: url.priority,
    lastmod: new Date().toISOString()
  }));
}

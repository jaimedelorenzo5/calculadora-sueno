# 🌙 Calculadora de Sueño

Una aplicación web moderna y rápida para calcular tu horario de sueño ideal basado en ciclos de 90 minutos. Diseñada para ser mobile-first, accesible y optimizada para SEO.

## ✨ Características

- **Dos modos de cálculo**: "Me levanto a" y "Me acuesto a"
- **Ciclos de sueño científicos**: Basados en 90 minutos por ciclo
- **Latencia personalizable**: 0, 10, 15 o 20 minutos
- **Cálculo de siestas**: 20 min (energética) y 90 min (completa)
- **Tema claro/oscuro**: Cambio automático con persistencia
- **URL state**: Deep-linking con querystrings compartibles
- **PWA completa**: Instalable, offline y cache inteligente
- **SEO optimizado**: Meta tags, Open Graph, Twitter Cards y JSON-LD
- **Accesibilidad**: ARIA labels, focus management y navegación por teclado
- **Core Web Vitals**: Optimizada para rendimiento y UX

## 🚀 Instalación

### Prerrequisitos
- Node.js 16+ 
- npm o yarn

### Pasos
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/calculadora-sueno.git
cd calculadora-sueno

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Preview de producción
npm run preview
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── Header.jsx      # Header con toggle de tema
│   ├── SleepForm.jsx   # Formulario principal
│   ├── Results.jsx     # Resultados de cálculos
│   ├── Tips.jsx        # Consejos de higiene del sueño
│   ├── FAQ.jsx         # Preguntas frecuentes
│   ├── ShareButtons.jsx # Botones de compartir
│   ├── AdSlot.jsx      # Placeholder para publicidad
│   └── Footer.jsx      # Footer con enlaces
├── lib/                # Lógica de negocio
│   ├── sleep.js        # Cálculos de ciclos de sueño
│   ├── urlState.js     # Gestión de estado en URL
│   └── seo.js          # Helpers de SEO
├── styles/             # Estilos CSS
│   ├── tokens.css      # Sistema de diseño
│   └── app.css         # Estilos de la aplicación
├── App.jsx             # Componente principal
└── main.jsx            # Punto de entrada
```

## 🔧 Tecnologías

- **Frontend**: React 18 + Vite
- **Estilos**: CSS Variables + Design System
- **PWA**: Service Worker + Web App Manifest
- **SEO**: Meta tags dinámicos + JSON-LD
- **Estado**: URL state + localStorage
- **Deploy**: Netlify/Vercel ready

## 📱 Uso

### Cálculo Básico
1. Selecciona el modo: "Me levanto a" o "Me acuesto a"
2. Introduce la hora objetivo
3. Ajusta la latencia al dormir (recomendado: 15 min)
4. Haz clic en "Calcular horarios"

### Funciones Avanzadas
- **Copiar resultado**: Copia el horario al portapapeles
- **Compartir**: Usa Web Share API o redes sociales
- **Calendario**: Descarga archivo .ics para tu calendario
- **URL compartible**: Comparte enlaces con configuración guardada

## 🧪 Testing

Ejecuta las pruebas de la lógica de cálculo:

```bash
# En el navegador (consola)
node test-sleep.js

# O importa en tu aplicación
import { calculateSleepTimes } from './src/lib/sleep.js';
```

### Casos de Prueba
- **Wake 07:00 + latencia 15**: Debería dar bedtimes ~22:30, 00:00, 01:30, 03:00
- **Sleep 23:00 + latencia 10**: Debería dar wake times ~04:40, 06:10, 07:40, 09:10

## 🚀 Deploy

### Netlify
1. Conecta tu repositorio
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Añade variables de entorno si es necesario

### Vercel
1. Importa el proyecto
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

## 📊 SEO y Performance

### Meta Tags
- Title y description dinámicos
- Open Graph para redes sociales
- Twitter Cards
- Canonical URLs

### Structured Data
- JSON-LD para WebApplication
- FAQ schema markup
- HealthApplication category

### Core Web Vitals
- LCP optimizado
- FID bajo
- CLS mínimo (alturas fijas)
- Performance objetivo: 90+

## 🔒 Privacidad y Legal

- **Sin tracking**: No se recopilan datos personales
- **Local storage**: Solo configuración del usuario
- **Disclaimer**: Herramienta educativa, no sustituye consejo médico
- **Open source**: Código disponible para revisión

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🙏 Agradecimientos

- Investigación científica sobre ciclos de sueño
- Comunidad de React y Vite
- Estándares web y PWA
- Herramientas de testing y SEO

## 📞 Soporte

- **Issues**: [GitHub Issues](https://github.com/tu-usuario/calculadora-sueno/issues)
- **Documentación**: [Wiki del proyecto](https://github.com/tu-usuario/calculadora-sueno/wiki)
- **Email**: soporte@calculadora-sueno.com

---

**⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!**

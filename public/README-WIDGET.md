# 🌙 Widget Embebible - Calculadora de Sueño

## 📋 Descripción

Widget gratuito y embebible que permite a otros sitios web integrar la Calculadora de Sueño y generar backlinks de calidad hacia `calculadora-sueno.com`.

## 🚀 Características

- ✅ **Totalmente gratuito** - Sin costos ni limitaciones
- ✅ **Fácil integración** - Un solo archivo CSS y JavaScript
- ✅ **Personalizable** - Múltiples opciones de configuración
- ✅ **Responsive** - Se adapta a cualquier dispositivo
- ✅ **Sin dependencias** - Funciona en cualquier sitio web
- ✅ **Backlinks automáticos** - Genera enlaces dofollow hacia tu sitio

## 📥 Instalación

### 1. Añadir el contenedor HTML

```html
<div id="calculadora-sueno-widget"></div>
```

### 2. Incluir los archivos del widget

```html
<!-- Estilos del widget -->
<link rel="stylesheet" href="https://calculadora-sueno.com/widget.css">

<!-- Script del widget -->
<script src="https://calculadora-sueno.com/widget.js"></script>
```

### 3. Inicializar el widget

```html
<script>
  SleepWidget.init({
    container: '#calculadora-sueno-widget'
  });
</script>
```

## ⚙️ Opciones de configuración

```javascript
SleepWidget.init({
  // Contenedor donde se insertará el widget
  container: '#mi-contenedor',
  
  // Tema del widget
  theme: 'light', // 'light' | 'dark'
  
  // Mostrar/ocultar elementos
  showHeader: true,   // Título y descripción
  showTips: false,    // Consejos de sueño
  showFooter: true,   // Enlace y créditos
  
  // Altura del widget
  height: 'auto'      // 'auto' | '400px' | '600px'
});
```

## 🎯 Ejemplos de implementación

### Widget básico
```html
<div id="widget-basico"></div>
<script>
  SleepWidget.init({
    container: '#widget-basico'
  });
</script>
```

### Widget personalizado
```html
<div id="widget-personalizado"></div>
<script>
  SleepWidget.init({
    container: '#widget-personalizado',
    theme: 'dark',
    showHeader: false,
    showTips: true,
    height: '500px'
  });
</script>
```

### Widget en sidebar
```html
<div class="sidebar-widget"></div>
<script>
  SleepWidget.init({
    container: '.sidebar-widget',
    theme: 'light',
    showFooter: true
  });
</script>
```

## 🎨 Temas disponibles

### Tema claro (por defecto)
- Fondo blanco translúcido
- Texto oscuro
- Bordes suaves
- Sombras sutiles

### Tema oscuro
- Fondo oscuro translúcido
- Texto claro
- Bordes más sutiles
- Efectos de glassmorphism

## 📱 Responsive

El widget se adapta automáticamente a diferentes tamaños de pantalla:

- **Desktop**: Layout horizontal optimizado
- **Tablet**: Adaptación automática de elementos
- **Mobile**: Layout vertical con botones apilados

## 🔗 Backlinks automáticos

El widget incluye automáticamente un enlace hacia `calculadora-sueno.com` en el footer (cuando `showFooter: true`):

- **Enlace dofollow** para SEO
- **Texto de anclaje optimizado**
- **Atributos correctos** (target="_blank", rel="noopener noreferrer")

## 🎯 Casos de uso recomendados

### Blogs de salud y bienestar
- Artículos sobre sueño
- Guías de higiene del sueño
- Consejos para dormir mejor

### Sitios de fitness y deporte
- Recuperación y descanso
- Planificación de entrenamientos
- Optimización del rendimiento

### Portales de estilo de vida
- Rutinas diarias
- Productividad personal
- Equilibrio trabajo-vida

### Sitios de tecnología
- Apps de salud
- Wearables y dispositivos
- Bienestar digital

## 🚫 Limitaciones

- **No personalización de colores** - Mantiene la identidad visual
- **No eliminación del enlace** - Requerido para uso gratuito
- **No modificación del código** - Debe mantenerse intacto

## 📊 Beneficios SEO

- **Backlinks de calidad** desde sitios relevantes
- **Tráfico referido** de usuarios interesados
- **Autoridad de dominio** mejorada
- **Relevancia temática** en nichos de salud

## 🆘 Soporte

Para soporte técnico o preguntas sobre el widget:

- **Email**: soporte@calculadora-sueno.com
- **Documentación**: https://calculadora-sueno.com/widget.html
- **Issues**: GitHub del proyecto

## 📄 Licencia

Este widget es gratuito para uso comercial y personal. Solo se requiere mantener el enlace hacia `calculadora-sueno.com` intacto.

## 🔄 Versiones

- **v1.0.0** - Versión inicial con funcionalidad completa
- **Próximamente**: Más temas, opciones de personalización

---

**¿Listo para integrar?** 🌟

Mejora la experiencia de tus usuarios y genera backlinks de calidad con nuestro widget gratuito.

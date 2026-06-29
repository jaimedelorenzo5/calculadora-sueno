# Instrucciones para la automatización de contenido

Estas reglas son obligatorias para cualquier rutina de Claude que cree, actualice
o publique artículos en este repositorio.

## Flujo de publicación

1. Sincronizar la rama con `origin/main` antes de editar.
2. Crear o actualizar el artículo en `public/articles/`.
3. Usar una URL canónica con el formato
   `https://calculadora-sueno.com/articulos/<slug>`.
4. Añadir el artículo a `public/articulos/index.html`.
5. Añadir el rewrite de la URL canónica en los dos archivos:
   - `netlify.toml`
   - `public/_redirects`
6. Añadir enlaces internos relevantes desde y hacia otros artículos.
7. No editar `public/sitemap.xml` manualmente. Se genera durante el build.
8. Ejecutar `npm run verify` y no hacer commit ni push si falla.
9. Revisar `git diff` para confirmar que solo se incluyen cambios intencionados.
10. Hacer commit en `main` con prefijo `[CONTENT]` o `[MAINTENANCE]` y subirlo.
11. Esperar al despliegue de Netlify y comprobar con `curl -fL` que la URL
    canónica devuelve el título del artículo, no la portada de la aplicación.

## Restricciones

- Netlify debe usar Node 22 mientras el proyecto dependa de Vite 8.
- No actualizar dependencias en un commit de contenido.
- Las actualizaciones de dependencias deben ir en un commit `[MAINTENANCE]`
  separado y superar `npm run verify` y `npm audit`.
- Nunca considerar publicado un artículo solo porque exista el commit en GitHub.
  La comprobación de la URL de producción es parte de la publicación.
- Si el despliegue falla, detener la rutina y corregirlo; no continuar generando
  artículos que solo existan en GitHub.

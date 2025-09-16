# MotoHub-Gen

Este repositorio contiene un sitio estático (HTML/CSS/JS) bajo `MotoHub/src/` listo para desplegar en Vercel sin mover archivos ni romper rutas.

## Estructura

- `MotoHub/src/pages/` — Páginas HTML (por ejemplo, `Home.html`, `categorias.html`, etc.)
- `MotoHub/src/css/` — Estilos CSS
- `MotoHub/src/js/` — Scripts JS
- `MotoHub/src/assets/` — Imágenes y recursos estáticos

## Deploy en Vercel

Este proyecto incluye `vercel.json` en la raíz con rewrites y redirect configurados para servir la app estática:

- Redirección de `/` hacia `MotoHub/src/pages/Home.html`.
- Rewrites para acceder a rutas limpias como `/pages/*`, `/css/*`, `/js/*`, `/assets/*` que mapean a `MotoHub/src/...` internamente.

### Pasos para desplegar

1. Instala la CLI de Vercel si aún no la tienes:
   - `npm i -g vercel`
2. En la raíz del repo ejecuta:
   - `vercel` (primer despliegue; sigue el asistente)
   - `vercel --prod` (para producción)

No es necesario un build step ya que es un sitio estático.

## Notas de Rutas

- Todas las rutas a assets y scripts dentro de páginas (`MotoHub/src/pages/*.html`) se han dejado en formato relativo como `../css/...`, `../js/...`, `../assets/...` para evitar rupturas en producción.
- En JS se han reemplazado rutas absolutas por relativas cuando aplica, por ejemplo en `MotoHub/src/js/categorias.js` y `MotoHub/src/js/Home.js`.

## Desarrollo local

Puedes usar cualquier servidor estático (por ejemplo, la extensión Live Server de VS Code) apuntando al directorio `MotoHub/src/` y abriendo `pages/Home.html`.

## Mantenimiento

- Si agregas nuevas páginas o assets, respeta las rutas relativas desde `pages/` hacia `../css`, `../js`, `../assets`.
- Si necesitas que una nueva ruta pública exista (por ejemplo `/images/*`), añade su rewrite en `vercel.json` mapeando a `MotoHub/src/assets/*` o al destino correspondiente.
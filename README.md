# Panadería D’Vida — sitio web estático

Sitio informativo (HTML + CSS + JS) desplegado con GitHub Pages.

## Estructura
```
.
├── .github/workflows/deploy.yml   # despliegue automático
├── .nojekyll
├── index.html
├── css/styles.css
├── js/config.js                   # ← aquí se edita backend, contacto y galería
├── js/main.js
└── img/                           # fotos de la galería
```

## Personalizar
1. Abre `js/config.js` y cambia `backendUrl` por la URL de tu aplicación web.
2. Agrega tus fotos en `img/` (foto-1.jpg … foto-6.jpg) o edita la lista `galeria`.
3. Completa `whatsapp`, `telefono`, `correo` y `horario` (opcionales).

## Probar en local
    python3 -m http.server 8000   # y abre http://localhost:8000

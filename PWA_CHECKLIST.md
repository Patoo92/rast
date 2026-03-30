# Checklist PWA - Requisitos Técnicos

Usa este checklist para validar que tu PWA cumple con los estándares de Google.

## ✅ Requisitos Esenciales

### Seguridad
- [x] Sitio servido sobre HTTPS (localhost en desarrollo es aceptado)
- [ ] Certificado SSL válido (en producción)

### Web App Manifest
- [x] `manifest.json` presente
- [x] Nombre corto (`short_name`)
- [x] Nombre completo (`name`)
- [x] Iconos en múltiples tamaños (192x192, 512x512)
- [x] Icono transparente (maskable icon)
- [x] Colores: `theme_color` y `background_color`
- [x] Display mode: `standalone`
- [x] Start URL: `./`

### Service Worker
- [x] Service Worker registrado
- [x] Fetch listener implementado
- [x] Estrategia de precaching
- [x] Respuestas a solicitudes en caché
- [x] Funcionamiento offline

### Experiencia de Usuario
- [x] Interfaz responsiva (mobile-first)
- [x] Icono de 192x192
- [x] Splash screen (generado del manifest)
- [x] No bloqueadores de renderización

## 📱 Características Móviles

### iOS (Meta Tags)
- [ ] `<meta name="apple-mobile-web-app-capable" content="yes">`
- [ ] `<meta name="apple-mobile-web-app-status-bar-style" content="black">`
- [ ] `<meta name="apple-mobile-web-app-title">`
- [ ] `<link rel="apple-touch-icon">`

### Android (manifest.json)
- [x] `display: "standalone"`
- [x] `icons` con tamaños correctos
- [x] `start_url` definida

## 🔔 Funcionalidades Avanzadas (Próximas)

### Notificaciones Push
- [ ] Firebase Cloud Messaging configurado
- [ ] Service Worker escucha eventos `push`
- [ ] Permisos de notificación solicitados
- [ ] Interfaz para suscribirse a notificaciones

### Almacenamiento Offline
- [ ] IndexedDB para datos complejos
- [ ] localStorage para preferencias
- [ ] Estrategias de sincronización
- [ ] Indicador de estado offline

### Actualización de Contenido
- [ ] Service Worker detecta actualizaciones
- [ ] Notificación al usuario de nuevas versiones
- [ ] Update automático o bajo demanda

## 🧪 Validación y Testing

### Auditoría Lighthouse
```bash
# En DevTools Chrome, pestaña Lighthouse
# Elige "PWA" y ejecuta la auditoría
```

Objetivos:
- [ ] Performance: > 90
- [ ] Accessibility: > 90
- [ ] Best Practices: > 90
- [ ] PWA Score: 100

### Testing Manual

**Verificar instalabilidad:**
1. Abre DevTools
2. Application → Manifest
3. Verifica que no hay errores
4. En navegador: debería haber opción "Instalar app"

**Verificar offline:**
1. DevTools → Application → Service Workers
2. Marca "Offline"
3. Recarga la página
4. La aplicación debe funcionar

**Verificar caché:**
1. DevTools → Application → Cache Storage
2. Expande "rastreo-paquetes-v1"
3. Verifica que archivos están presentes

## 📊 Checklist de Rendimiento

- [ ] Tamaño del bundle < 100KB (minificado + gzipped)
- [ ] First Contentful Paint < 1s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Imagen del icono < 50KB
- [ ] Archivos CSS/JS minificados

## 🚀 Checklist Pre-Despliegue

- [ ] Todas las variables de entorno configuradas
- [ ] `npm build` ejecuta sin errores
- [ ] Service Worker actualizado
- [ ] manifest.json con valores correctos
- [ ] HTTPS configurado
- [ ] Testing en dispositivos reales
- [ ] Auditoría Lighthouse aprobada
- [ ] Analytics configurado (opcional)

---

Usa este checklist antes de cada despliegue a producción.

# 🔧 Troubleshooting - Solución de Problemas

## 🚨 Problemas Comunes

### Service Worker no se registra

**Síntoma:** DevTools → Application → Service Workers está vacío

**Soluciones:**
1. Verifica que estás en `http://localhost` o `https:`
2. Revisa la consola para errores JavaScript
3. Limpia caché: DevTools → Application → Clear Storage
4. Recarga la página (Ctrl+Shift+R)

```javascript
// En index.js, verifica que hay:
serviceWorker.register({
  onSuccess: () => console.log('✅ SW registered'),
  onUpdate: () => console.log('🔄 SW updated')
});
```

---

### La app no funciona offline

**Síntoma:** Después de marcar "Offline", la app da errores

**Soluciones:**
1. Verifica que los archivos estén en `PRECACHE_ASSETS` del Service Worker
2. Abre DevTools → Application → Cache Storage
3. Expande "rastreo-paquetes-v1"
4. Asegúrate que ves los archivos HTML, CSS, JS

**Si no hay nada en caché:**
```javascript
// En serviceWorker.js, verifica:
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/static/css/main.css',  // ← Estos paths pueden variar
  '/static/js/main.js'
];
```

---

### El Manifest no aparece

**Síntoma:** DevTools → Application → Manifest está vacío

**Soluciones:**
1. Verifica que `public/index.html` tiene:
```html
<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
```

2. Revisa que `public/manifest.json` es válido JSON:
```bash
# Valida en jsonlint.com o con:
npm install -g jsonlint
jsonlint public/manifest.json
```

---

### Error: "Cannot find module react-scripts"

**Síntoma:** `npm start` falla con error de módulos

**Soluciones:**
```bash
# Reinstala dependencias
rm -rf node_modules package-lock.json
npm install

# Si sigue sin funcionar:
npm cache clean --force
npm install
```

---

### La PWA no es instalable

**Síntoma:** No aparece el botón "Instalar" en el navegador

**Requisitos:**
- ✅ HTTPS o localhost
- ✅ Web App Manifest válido
- ✅ Service Worker registrado
- ✅ Ícono de 192x192px mínimo
- ✅ Nombre y descripción en manifest
- ✅ Display: "standalone"
- ✅ Start URL definida

**Verifica con Lighthouse:**
1. DevTools → Lighthouse
2. Elige "PWA"
3. Ejecuta auditoría
4. Busca errores específicos

---

### Error: HTTPS requerido

**Síntoma:** "Service Worker requires HTTPS"

**En Desarrollo:** No es problema, localhost funciona
**En Producción:** Necesitas SSL/TLS

Opciones:
- Vercel/Netlify: SSL gratis automático
- Let's Encrypt: Certificado gratuito
- Compra en GoDaddy, Namecheap, etc.

---

### El formulario no acepta entrada

**Síntoma:** Input deshabilitado o no responde

**Revisa en TrackingForm.js:**
```javascript
<input
  disabled={loading}  // ← Verifica esto
  value={trackingNumber}
  onChange={(e) => setTrackingNumber(e.target.value)}
/>
```

Si `loading` es true, el input está deshabilitado. Verifica que `handleTrackPackage` termina correctamente.

---

### El estilo CSS no se aplica

**Síntoma:** Los estilos no aparecen o CSS se ve mal

**Soluciones:**
1. Limpia caché del navegador (Ctrl+Shift+Del)
2. Verifica que el archivo CSS existe:
   ```bash
   ls -la src/components/TrackingForm.css
   ```
3. Verifica el nombre de la clase coincide:
   - En JS: `className="tracking-form"`
   - En CSS: `.tracking-form { ... }`
4. DevTools → Elements → Busca el elemento
5. Verifica que el CSS está aplicado (panel Styles)

---

### Build para producción falla

**Síntoma:** `npm run build` da errores

**Soluciones:**
```bash
# Limpia y reinstala
npm cache clean --force
rm -rf build node_modules package-lock.json
npm install
npm run build

# Si hay errores de TypeScript:
npm run build -- --verbose

# Ver exactamente qué falla
```

---

### La app es lenta

**Síntoma:** Carga lenta o lag al interactuar

**Optimizaciones:**
1. Revisa tamaño del bundle:
```bash
npm run build
# Mira el tamaño en build/static/
```

2. Lazy loading de componentes:
```javascript
const LazyComponent = React.lazy(() => import('./Component'));
```

3. Cachea los datos:
```javascript
// En serviceWorker.js
// Mejora estrategia de caché
```

4. Auditoría de Lighthouse:
   - DevTools → Lighthouse
   - Sigue recomendaciones

---

### Error: "React is not defined"

**Síntoma:** Consola: `Uncaught ReferenceError: React is not defined`

**Solución:** Añade al inicio del archivo:
```javascript
import React from 'react';
```

---

### Service Worker no actualiza

**Síntoma:** Cambios en el código no se reflejan

**Soluciones:**
1. Recarga con Ctrl+Shift+R (reload duro)
2. DevTools → Application → Service Workers → Unregister
3. Cierra todas las pestañas de la app
4. Reabre la URL

---

### Error: "Public URL not set"

**Síntoma:** Consola menciona PUBLIC_URL

En `public/index.html`:
```html
<!-- Debe tener: -->
<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
```

Es normal durante build, no es error.

---

## 🌐 Problemas con APIs Reales (Phase 2)

### API retorna error 401 (No Autorizado)

**Síntoma:** Red tab muestra 401 en requests a API

**Soluciones:**
1. Verifica que `.env.local` tiene claves correctas:
```bash
# En terminal
echo $DHL_API_KEY  # macOS/Linux
echo %DHL_API_KEY% # Windows
```

2. Verifica que las variables de entorno están cargadas:
```javascript
// En src/api/carriers/dhl.js
console.log('API Key:', process.env.DHL_API_KEY);
```

3. Reinicia servidor: `npm start`

4. Si recién agregaste .env.local, recarga con Ctrl+Shift+R

---

### "Carrier no detectado"

**Síntoma:** Ingresas número pero no detecta transportista

**Soluciones:**
1. El patrón regex no coincide con tu número
2. Ingresa manualmente el transportista en el selector
3. Verifica los patrones en `src/api/tracking.js`:

```javascript
const CARRIER_PATTERNS = {
  'DHL': /^\d{8,12}$/,        // 8-12 dígitos
  'FedEx': /^\d{12,14}$/,     // 12-14 dígitos
  'UPS': /^1Z[A-Z0-9]{16}$/,  // 1Z + 16 chars
  'Correos': /^C\d{12}$/,     // C + 12 dígitos
  'Amazon': /^[A-Z0-9]{10,20}$ // 10-20 chars
};
```

Prueba con números que coincidan exactamente.

---

### API retorna timeout

**Síntoma:** App se congela esperando respuesta, eventualmente "Network timeout"

**Soluciones:**
1. Verifica que tienes conexión internet: `ping google.com`
2. API del transportista está caída (verificar en su sitio)
3. Timeout configurado muy bajo

En `src/api/tracking.js`:
```javascript
const TIMEOUT = 10000; // 10 segundos
```

Prueba aumentarlo:
```javascript
const TIMEOUT = 20000; // 20 segundos
```

---

### "Datos de demostración" en lugar de datos reales

**Síntoma:** App muestra mockData en lugar de datos reales

**Causas:**
1. API key es inválida → Fallback a mockData
2. Transportista no reconocido → Fallback a mockData
3. Red request falló → Fallback a mockData

**Verifica:**
- Abre DevTools → Network tab
- Intenta rastrear un paquete
- Busca requests a las APIs reales (api.dhl.com, etc.)
- Si ves errores (rojo), haz clic y revisa response

---

### CORS error desde API

**Síntoma:** Console muestra "Access to XMLHttpRequest blocked by CORS policy"

**Solución:**
- Algunos APIs requieren backend proxy
- Verifica documentación en API_SETUP.md
- Para desarrollo sin CORS, usa mock data

---

### localStorage lleno

**Síntoma:** "QuotaExceededError" en console

**Soluciones:**
1. localStorage tiene límite (~5-10MB)
2. Limpia en DevTools: Application → Storage → Clear
3. Implementa limpieza automática:

```javascript
// En src/api/tracking.js
function clearOldCache() {
  const keys = Object.keys(localStorage);
  if (keys.length > 100) {
    for (let i = 0; i < 50; i++) {
      localStorage.removeItem(keys[i]);
    }
  }
}
```

---

## 🧪 Herramientas de Debug

### Chrome DevTools
```
Opening:
- Windows/Linux: F12 o Ctrl+Shift+I
- Mac: Cmd+Option+I
```

**Tabs útiles:**
- Console: Ver errores y logs
- Application: Ver Service Worker, Manifest, Storage
- Network: Ver solicitudes HTTP
- Lighthouse: Auditoría PWA

### VS Code Extensions
```bash
npm install -D eslint prettier
```

Crea `.eslintrc.json`:
```json
{
  "extends": ["react-app"],
  "rules": {
    "no-unused-vars": "warn"
  }
}
```

---

## 📞 Más Ayuda

| Problema | Recurso |
|----------|---------|
| APIs Reales (Phase 2) | API_SETUP.md |
| Detectar Transportista | src/api/tracking.js |
| PWA General | https://web.dev/pwa/ |
| React | https://react.dev |
| Service Worker | https://developer.mozilla.org/es/docs/Web/API/Service_Worker_API |
| Manifest | https://developer.mozilla.org/es/docs/Web/Manifest |
| DHL API | https://developer.dhl.com/ |
| FedEx API | https://developer.fedex.com/ |
| UPS API | https://www.ups.com/upsdeveloperkit |
| Correos | https://www.correos.es/ |
| Amazon | https://docs.aws.amazon.com/logistics/ |
| Firebase | https://firebase.google.com/support |
| Despliegue | Documentación de Vercel/Netlify |

---

## ✅ Checklist de Debugging

- [ ] `npm start` funcionando sin errores
- [ ] DevTools muestra Service Worker registrado
- [ ] Manifest carga correctamente
- [ ] Sin errores en Console tab
- [ ] Offline mode funciona
- [ ] Botón "Instalar" aparece
- [ ] Lighthouse PWA audit: 100/100

¡Si pasas todos estos checks, ¡tu PWA está lista! 🚀

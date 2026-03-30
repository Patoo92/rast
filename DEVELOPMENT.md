# 🚀 Guía de Desarrollo

Esta guía te ayudará a entender la arquitectura del proyecto y cómo agregar nuevas funcionalidades.

## 📋 Pre-requisitos

- Node.js 14+
- npm o yarn
- Conocimientos básicos de React
- Entendimiento de Service Workers y PWAs

## 🏗️ Arquitectura del Proyecto

```
📦 PWA Rastreo de Paquetes
├── 📁 public/
│   ├── index.html           - HTML principal
│   ├── manifest.json        - Configuración PWA
│   └── service-worker.js    - Service Worker real
├── 📁 src/
│   ├── 📁 api/              - Módulos de APIs
│   │   ├── tracking.js      - Coordinador de APIs (detecta transportista)
│   │   ├── mockData.js      - Datos de demostración
│   │   └── 📁 carriers/     - Módulos por transportista
│   │       ├── dhl.js
│   │       ├── fedex.js
│   │       ├── ups.js
│   │       ├── correos.js
│   │       └── amazon.js
│   ├── 📁 components/       - Componentes reutilizables
│   │   ├── TrackingForm.js
│   │   └── PackageStatus.js
│   ├── App.js               - Componente raíz
│   ├── index.js             - Punto de entrada React
│   ├── serviceWorker.js     - Registro del Service Worker
│   └── index.css
├── .env.local               - Variables de entorno (no versionado)
├── .env.example             - Template de variables
├── API_SETUP.md             - Guía de configuración de APIs
└── package.json
```

## 🛠️ Desarrollo Local

### 1. Configurar Variables de Entorno

```bash
cp .env.example .env.local
```

Luego edita `.env.local` con tus claves API:
```
REACT_APP_SEARATES_API_KEY=tu_clave_api
REACT_APP_FIREBASE_API_KEY=tu_firebase_key
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Iniciar Servidor de Desarrollo

```bash
npm start
```

### 4. Verificar PWA en DevTools

**En Chrome:**
1. Abre DevTools (F12)
2. Ve a la pestaña **Application**
3. Verifica:
   - Manifest.json está cargado
   - Service Worker está registrado
   - Hay una sección de caché

## 📝 Flujo de Desarrollo por Fases

### Fase 2: Integración de APIs ✅ COMPLETADA

**Objetivo:** Conectar con APIs reales de transportistas

**APIs Integradas:**
- ✅ DHL
- ✅ FedEx
- ✅ UPS
- ✅ Correos España
- ✅ Amazon Logistics

**Cómo Funciona:**
1. Usuario ingresa número de rastreo
2. Sistema detecta transportista por patrón
3. Se llama al módulo `carriers/[transportista].js`
4. Respuesta se normaliza a formato común
5. Se guarda en localStorage para offline

**Para agregar una nueva API:**

1. **Crea un nuevo módulo** en `src/api/carriers/[transportista].js`:
```javascript
export async function track[Carrier](trackingNumber) {
  // 1. Hacer llamada a API
  // 2. Parsear respuesta
  // 3. Retornar en formato estándar
  return {
    trackingNumber,
    carrier: '[Carrier]',
    status: 'estado',
    lastUpdate: 'fecha',
    origin: 'origen',
    destination: 'destino',
    events: [
      { date, status, location }
    ]
  };
}
```

2. **Importa en** `src/api/tracking.js`:
```javascript
import { track[Carrier] } from './carriers/[transportista]';
```

3. **Añade patrón de detección**:
```javascript
const CARRIER_PATTERNS = {
  '[Carrier]': /tu_regex_aqui/
};
```

4. **Añade case en switch**:
```javascript
case '[Carrier]':
  result = await track[Carrier](trackingNumber);
  break;
```

**Variables de Entorno:**

Añade a `.env.local`:
```
REACT_APP_[CARRIER]_API_KEY=tu_key
REACT_APP_[CARRIER]_SECRET_KEY=tu_secret
```

### Fase 3: Notificaciones Push

**Objetivo:** Alertar a usuarios sobre cambios en paquetes

1. **Crea cuenta Firebase:**
   - Ve a [Firebase Console](https://console.firebase.google.com)
   - Crea un proyecto nuevo
   - Copia las credenciales a `.env.local`

2. **Instala Firebase:**
```bash
npm install firebase
```

3. **Crea `src/firebase/config.js`:**
```javascript
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
```

4. **Actualiza Service Worker para recibir notificaciones:**
```javascript
// En serviceWorker.js, ya hay un listener para push events
self.addEventListener('push', (event) => {
  // Aquí se manejan las notificaciones push
});
```

### Fase 3: Mejoras de Caché

**Objetivo:** Estrategias avanzadas de offline

Edita `src/serviceWorker.js`:

- **Cache-First:** Para archivos estáticos (CSS, JS, imágenes)
- **Network-First:** Para datos de API (con fallback a caché)
- **Stale-While-Revalidate:** Para datos que pueden ser ligeramente antiguos

### Fase 4: Despliegue

**Recomendaciones:**

1. **Vercel (Recomendado para Next.js, pero funciona con React):**
```bash
npm install -g vercel
vercel
```

2. **Netlify:**
```bash
npm install -g netlify-cli
netlify deploy
```

3. **AWS S3 + CloudFront:**
   - Sube la carpeta `build/` a S3
   - Distribuye con CloudFront
   - Configura HTTPS

4. **DigitalOcean App Platform:**
   - Conecta tu repositorio Git
   - Deploy automático

## 📊 Testing

### Ejecutar Tests

```bash
npm test
```

### Crear un Test Básico

Crea `src/App.test.js`:
```javascript
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome message', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/Bienvenido/i);
  expect(welcomeElement).toBeInTheDocument();
});
```

## 🔍 Debugging

### En Chrome DevTools

**Simular Offline:**
1. DevTools → Application → Service Workers
2. Marca "Offline"
3. Recarga la página

**Inspeccionar Caché:**
1. DevTools → Application → Cache Storage
2. Expande "rastreo-paquetes-v1"
3. Ve qué archivos están cacheados

### Logs en Service Worker

```javascript
// En serviceWorker.js
console.log('Service Worker: Evento de fetch', event.request.url);
```

Ver logs en DevTools → Application → Service Workers

## 🎨 Agregar Funciones UI

### Crear un Nuevo Componente

1. Crea `src/components/MiComponente.js`:
```javascript
import React from 'react';
import './MiComponente.css';

function MiComponente() {
  return (
    <div className="mi-componente">
      <h2>Mi Componente</h2>
    </div>
  );
}

export default MiComponente;
```

2. Crea `src/components/MiComponente.css` con estilos

3. Importa en `App.js`:
```javascript
import MiComponente from './components/MiComponente';

// Usa en JSX
<MiComponente />
```

## 📈 Optimización de Rendimiento

- Usa `React.memo()` para componentes que no cambian frecuentemente
- Implementa lazy loading para rutas (con `React.lazy()`)
- Comprime imágenes antes de cargar
- Monitorea con Lighthouse (DevTools → Lighthouse)

## 🐛 Solución de Problemas Comunes

| Problema | Solución |
|----------|----------|
| Service Worker no se registra | Verifica que está en HTTPS o localhost |
| La app no funciona offline | Revisa que los archivos están en PRECACHE_ASSETS |
| El manifest no se detalla | Asegúrate que está enlazado en `public/index.html` |
| La PWA no es instalable | Ejecuta auditoría Lighthouse para ver errores |
| Las notificaciones no llegan | Revisa Firebase Cloud Messaging configuration |

## 📚 Recursos Adicionales

- [Google PWA Training](https://developers.google.com/web/ilt/pwa)
- [MDN Service Worker API](https://developer.mozilla.org/es/docs/Web/API/Service_Worker_API)
- [React Docs](https://react.dev)
- [Firebase Documentation](https://firebase.google.com/docs)

---

¿Preguntas? Abre un issue en el repositorio.

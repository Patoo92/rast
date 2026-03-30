# 🏗️ Estructura del Proyecto - PWA Rastreo de Paquetes

```
rast/                                    # Carpeta raíz del proyecto
│
├── 📄 package.json                     # Dependencias y scripts del proyecto
├── 📄 .env.example                     # Variables de entorno (plantilla)
├── 📄 .env.local                       # Variables de entorno reales (no versionado)
├── 📄 .gitignore                       # Archivos a ignorar en Git
│
├── 📄 README.md                        # Documentación principal
├── 📄 DEVELOPMENT.md                   # Guía de desarrollo
├── 📄 API_SETUP.md                     # Configuración de APIs reales
├── 📄 QUICKSTART.md                    # Comienza en 5 minutos
├── 📄 PWA_CHECKLIST.md                 # Checklist técnico para PWA
├── 📄 STRUCTURE.md                     # Este archivo
│
├── 🔧 setup.sh                         # Script de setup (macOS/Linux)
├── 🔧 setup.bat                        # Script de setup (Windows)
│
├── 📁 public/                          # Archivos estáticos del navegador
│   ├── 📄 index.html                   # HTML principal (punto de entrada)
│   ├── 📄 manifest.json                # Configuración PWA
│   ├── 📄 service-worker.js            # Service Worker real (descargado por navegador)
│   └── (Aquí irán los iconos: icon-192x192.png, icon-512x512.png, etc.)
│
└── 📁 src/                             # Código fuente de React
    ├── 📄 index.js                     # Punto de entrada de React
    ├── 📄 index.css                    # Estilos globales
    ├── 📄 setupTests.js                # Configuración de tests
    ├── 📄 App.js                       # Componente principal
    ├── 📄 App.css                      # Estilos del componente App
    ├── 📄 serviceWorker.js             # Módulo para registrar el Service Worker
    │
    ├── 📁 components/                  # Componentes reutilizables
    │   ├── TrackingForm.js             # Formulario con selector de transportista
    │   ├── TrackingForm.css
    │   ├── PackageStatus.js            # Muestra información del paquete
    │   └── PackageStatus.css
    │
    └── 📁 api/                         # Módulos de APIs
        ├── tracking.js                 # Coordinador (detecta + llama APIs)
        ├── mockData.js                 # Datos de demostración
        └── 📁 carriers/                # ✨ NUEVO: Módulos por transportista
            ├── dhl.js
            ├── fedex.js
            ├── ups.js
            ├── correos.js
            └── amazon.js
```

## 📊 Explicación de Archivos Clave

### 🔐 Core PWA - Service Worker

#### `public/service-worker.js` (Web Worker Thread)
- **Es**: El Service Worker real que corre en un thread separado del navegador
- **Responsabilidades principales**:
  - 🔄 Interceptar todas las requests HTTP/HTTPS
  - 💾 Gestionar el caché del navegador (estrategias cache-first para assets estáticos, network-first para datos)
  - 📲 Manejar eventos push para notificaciones
  - 🔗 Sincronización en segundo plano cuando recupera conexión
- **Por qué archivos separados**: El SW debe estar en `public/` porque se descarga directamente por el navegador

#### `src/serviceWorker.js` (Node.js Module)
- **Es**: Módulo de registro que expone funciones para React
- **Funciones clave**:
  - `register()`: Detecta la plataforma (Windows/Mac/Linux) e registra el SW
  - `unregister()`: Limpia el registro cuando se desinstala la app
- **Por qué**: Permite que React comunique con el Service Worker desde la aplicación

### 🎨 Interfaz de Usuario

- **`src/App.js`**: Componente raíz que:
  - Carga lista de transportistas disponibles
  - Orquesta la comunicación entre formulario y API
  - Gestiona estado de loading y errores
  
- **`src/components/TrackingForm.js`**: Formulario interactivo que:
  - Captura número de rastreo del usuario
  - Ofrece selector de transportista (o detección automática)
  - Maneja estado de carga y envío
  
- **`src/components/PackageStatus.js`**: Muestra información enriquecida:
  - Estado del paquete con color-coding
  - Timeline de eventos de entrega
  - Información de ruta y ubicación

### 🔌 APIs Reales Integradas

#### `src/api/tracking.js` (Coordinador Inteligente)
- **Responsabilidad**: Detectar carrier automáticamente y enrutar a API correcta
- **Características**:
  - Usa regex patterns para identificar transportista
  - Fallback inteligente a localStorage si API falla
  - Datos de demostración si no hay información guardada
- **Auto-detección**: DHL, FedEx, UPS, Correos, Amazon

#### `src/api/carriers/` (Módulos Específicos por Transportista)
Cada archivo integra la API real de cada transportista:
- **`dhl.js`**: Integración con API de DHL Global Services
- **`fedex.js`**: Integración con FedEx Tracking API
- **`ups.js`**: Integración con UPS OnTrack API
- **`correos.js`**: Integración con Correos Mail Tracking
- **`amazon.js`**: Integración con Amazon Logistics

**Cada módulo carrier**:
- Lee credenciales seguras de `process.env`
- Realiza requests HTTPS a la API real del transportista
- Normaliza respuestas al formato común de la app
- Mapea estados específicos del carrier al estándar interno

#### `src/api/mockData.js`
- Datos de demostración para desarrollo sin API real
- Usado como fallback cuando no hay datos actuales

### 📝 Documentación
- **`README.md`**: Descripción general, features, roadmap
- **`DEVELOPMENT.md`**: Arquitectura, instrucciones detalladas para desarrolladores
- **`API_SETUP.md`**: Guía paso a paso para configurar credenciales reales de cada API
- **`PWA_CHECKLIST.md`**: Checklist técnico para validar que es una PWA completa

---

## 🚀 Próximos Archivos a Crear (Fases 2-4)

```
📁 src/
├── 📁 pages/                          # Páginas futura (si se usan rutas)
│   ├── HomePage.js
│   └── HistoryPage.js
│
├── 📁 hooks/                          # React hooks personalizados
│   └── useTracking.js
│
├── 📁 utils/                          # Funciones utilitario
│   ├── formatters.js
│   └── validators.js
│
├── 📁 firebase/                       # Configuración Firebase
│   └── config.js
│
└── 📁 context/                        # Context API paara estado global
    └── TrackingContext.js
```

---

## 💡 Flujo de la Aplicación

```
public/index.html
       ↓
src/index.js (monta React y registra Service Worker)
       ↓
src/App.js (componente raíz)
       ├── TrackingForm.js (usuario ingresa número)
       ├── PackageStatus.js (muestra resultado)
       └── serviceWorker.js (funciona en background)
                ↓
         src/api/tracking.js (llamadas a API)
```

---

## 🎯 Estado de Completación

| Fase | Tarea | Estado |
|------|-------|--------|
| 1️⃣ Base | Estructura del proyecto | ✅ **Completada** |
| 1️⃣ Base | Components React | ✅ **Completada** |
| 1️⃣ Base | Service Worker | ✅ **Completada** |
| 1️⃣ Base | Manifest.json | ✅ **Completada** |
| 1️⃣ Base | Estilos CSS | ✅ **Completada** |
| 2️⃣ API | Integración con API real | ⏳ **Pendiente** |
| 3️⃣ Advanced | Notificaciones push | ⏳ **Pendiente** |
| 3️⃣ Advanced | Offline completo | ⏳ **Pendiente** |
| 4️⃣ Deploy | Testing y auditoría | ⏳ **Pendiente** |
| 4️⃣ Deploy | Publicar en HTTPS | ⏳ **Pendiente** |

---

## 📌 Comandos Rápidos

```bash
# Instalar dependencias
npm install

# Iniciar desarrollo
npm start

# Crear build para producción
npm run build

# Ejecutar tests
npm test

# (Para Windows)
setup.bat

# (Para macOS/Linux)
bash setup.sh
```

---

¡El proyecto está listo para empezar a desarrollar! 🚀

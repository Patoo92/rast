# 📦 PWA Rastreo de Paquetes

Una Progressive Web App moderna para rastrear paquetes en tiempo real con capacidades offline.

## ✨ Características

- ✅ **APIs Reales Integradas**: DHL, FedEx, UPS, Correos España y Amazon Logistics
- ✅ **Detección Automática**: Identifica el transportista por el número de rastreo
- ✅ **Funciona Offline**: Accede a tus búsquedas previas sin conexión a internet
- 📱 **Instalable**: Instálala en tu teléfono como una aplicación nativa
- 🔄 **Service Worker**: Gestión inteligente de caché y actualizaciones en segundo plano
- 🎨 **Diseño Responsivo**: Funciona perfectamente en móviles, tablets y escritorio
- 🚀 **Rápido**: Carga casi instantáneamente gracias al caché
- 🔔 **Notificaciones** (próximamente): Recibe alertas sobre cambios en tus paquetes

## 🚀 Empezar

### Requisitos
- Node.js 14+ instalado
- npm o yarn

### Instalación

1. **Clona o descarga el proyecto**
```bash
cd rast
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Inicia el servidor de desarrollo**
```bash
npm start
```

La aplicación se abrirá en `http://localhost:3000`

## 📝 Scripts Disponibles

### Desarrollo
```bash
npm start
```
Inicia el servidor de desarrollo en modo watch.

### Build para Producción
```bash
npm build
```
Crea una versión optimizada para producción en la carpeta `build/`.

### Tests
```bash
npm test
```
Ejecuta los tests en modo watch.

## 📂 Estructura del Proyecto

```
rast/
├── public/
│   ├── index.html                    # HTML principal
│   ├── manifest.json                 # Configuración PWA
│   └── service-worker.js             # Service Worker real
├── src/
│   ├── components/
│   │   ├── TrackingForm.js           # Formulario con selector de transportista
│   │   ├── TrackingForm.css
│   │   ├── PackageStatus.js          # Información del paquete
│   │   └── PackageStatus.css
│   ├── api/
│   │   ├── tracking.js               # Coordinador de APIs (detecta transportista)
│   │   ├── mockData.js               # Datos de demostración
│   │   └── carriers/                 # Módulos por transportista
│   │       ├── dhl.js
│   │       ├── fedex.js
│   │       ├── ups.js
│   │       ├── correos.js
│   │       └── amazon.js
│   ├── App.js                        # Componente principal
│   ├── App.css
│   ├── index.js                      # Punto de entrada React
│   ├── serviceWorker.js              # Registro del Service Worker
│   └── index.css
├── .env.local                        # Variables de entorno (no versionado)
├── .env.example                      # Template de variables
├── package.json
├── .gitignore
├── API_SETUP.md                      # Guía de configuración de APIs
└── README.md
```

## 🔧 Próximos Pasos

### 1. **Configurar APIs Reales** ✅ COMPLETADO
   - ✅ Módulos para DHL, FedEx, UPS, Correos y Amazon integrados
   - ✅ Sistema de detección automática por número de rastreo
   - 📌 **Siguiente:** Ve a [API_SETUP.md](API_SETUP.md) para configurar tus credenciales

### 2. **Prueba la Aplicación**
   - Usa datos de demostración (sin configurar APIs)
   - O configura tus API keys en `.env.local` para datos reales

### 3. **Notificaciones Push** (Fase 3)
   - Integra Firebase Cloud Messaging (FCM)
   - Los usuarios recibirán alertas cuando sus paquetes cambien de estado

### 4. **Despliegue en Producción** (Fase 4)
   - Asegúrate de que todo esté completamente funcional
   - Ejecuta auditoría de Lighthouse
   - Deploy en hosting con HTTPS (Vercel, Netlify, AWS, etc.)

## 📚 Recursos Útiles

| Recurso | Descripción |
|---------|------------|
| [API_SETUP.md](API_SETUP.md) | Configurar DHL, FedEx, UPS, Correos, Amazon |
| [Google Web Dev - PWA](https://web.dev/progressive-web-apps/) | Guía oficial de PWAs |
| [MDN - Service Workers](https://developer.mozilla.org/es/docs/Web/API/Service_Worker_API) | Documentación de Service Workers |
| [Web App Manifest](https://developer.mozilla.org/es/docs/Web/Manifest) | Especificación de Web App Manifest |
| [React Documentation](https://react.dev) | Documentación oficial de React |

## 🔐 Seguridad

- La aplicación utiliza HTTPS en producción (requerido para PWAs)
- Los datos se almacenan localmente en localStorage
- No se envían datos personales a servidores externos sin consentimiento

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Para cambios importantes, abre un issue primero para discutir los cambios propuestos.

## 📄 Licencia

Este proyecto está bajo la licencia MIT - ver archivo LICENSE para más detalles.

---

## 🎯 Hoja de Ruta de Desarrollo

| Fase | Estado | Descripción |
|------|--------|-------------|
| **Fase 1** | ✅ Completada | Estructura base, Service Worker, PWA manifest, UI React |
| **Fase 2** | ✅ Completada | APIs reales DHL, FedEx, UPS, Correos, Amazon - Detección automática |
| **Fase 3** | ⏳ En Progreso | Notificaciones push Firebase, sincronización en background |
| **Fase 4** | 📋 Próxima | Testing, Lighthouse audit, despliegue HTTPS, optimización |

### ✅ Fase 1: Base (Completada)
- [x] Estructura de proyecto React + PWA
- [x] Manifest.json configurado
- [x] Service Worker implementado
- [x] Interfaz de usuario responsiva
- [x] Datos de demostración

### ✅ Fase 2: Integración de APIs Reales (Completada)
- [x] Módulos para DHL, FedEx, UPS, Correos, Amazon
- [x] Detección automática de transportista por número
- [x] Caché en localStorage para offline
- [x] Fallback a datos simulados si API falla
- [x] Selector de transportista en UI

### ⏳ Fase 3: Funciones Avanzadas (En Progreso)
- [ ] Firebase Cloud Messaging para notificaciones push
- [ ] Sincronización en background
- [ ] IndexedDB para datos complejos
- [ ] Tema oscuro
- [ ] Historial persistente

### 📋 Fase 4: Producción (Próxima)
- [ ] Tests automatizados
- [ ] Auditoría de Lighthouse (100/100 PWA)
- [ ] Optimización de rendimiento
- [ ] Despliegue en hosting con HTTPS

---

Hecho con ❤️ | PWA para Rastreo de Paquetes 2026

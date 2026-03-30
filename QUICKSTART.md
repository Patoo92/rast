⚡ QUICK START - Comienza en 5 Minutos

1️⃣ INSTALAR DEPENDENCIAS
─────────────────────────
# Windows
setup.bat

# macOS / Linux
bash setup.sh

O manualmente:
npm install


2️⃣ CONFIGURAR VARIABLES DE ENTORNO
───────────────────────────────────
Copia el archivo .env.example a .env.local y rellena las claves API:

cp .env.example .env.local  # macOS/Linux
copy .env.example .env.local # Windows

Luego edita .env.local con tus credenciales reales:
- DHL_API_KEY=tu_clave_dhl
- FEDEX_API_KEY=tu_clave_fedex
- UPS_API_KEY=tu_clave_ups
- CORREOS_API_KEY=tu_clave_correos
- AMAZON_API_KEY=tu_clave_amazon

💡 Ver API_SETUP.md para detalles de cada API


3️⃣ INICIAR EL SERVIDOR
──────────────────────
npm start

Se abrirá en http://localhost:3000


4️⃣ PROBAR LA APP CON APIs REALES
─────────────────────────────────
✅ Ingresa un número de rastreo (ej: DHL: 1234567890)
✅ Selecciona transportista O déjalo detectar automáticamente
✅ Verás información real del paquete

Números de ejemplo por transportista:
- DHL: Cualquier número de 8-12 dígitos
- FedEx: Número de 12-14 dígitos
- UPS: Número de 1Z seguido de 16 caracteres
- Correos: Número de 13 dígitos comenzando con 'C'
- Amazon: Número de rastreo estándar


5️⃣ PROBAR LA PWA - Funcionalidad Offline
──────────────────────────────────────────
✅ Abre DevTools (F12)
✅ Ve a Application → Service Workers
✅ Verifica que aparece "Service Worker registered"
✅ En DevTools → Application → Manifest
✅ Busca el botón "Instalar" en tu navegador

Simular offline:
✅ DevTools → Application → Service Workers
✅ Marca "Offline"
✅ Recarga la página
✅ ¡Los datos en caché funcionan sin conexión!


6️⃣ VER EL CÓDIGO
────────────────
Archivos importantes:
├── src/App.js                         ← Componente principal
├── src/serviceWorker.js               ← Módulo PWA
├── public/service-worker.js           ← Service Worker real
├── src/components/TrackingForm        ← Formulario + selector
├── src/api/tracking.js                ← Coordinador de APIs
├── src/api/carriers/                  ← APIs específicas
│   ├── dhl.js
│   ├── fedex.js
│   ├── ups.js
│   ├── correos.js
│   └── amazon.js
└── public/manifest.json               ← Configuración PWA


📚 DOCUMENTACIÓN
────────────────
- README.md           → Información general
- DEVELOPMENT.md      → Arquitectura + guía de desarrollo
- STRUCTURE.md        → Diagrama del proyecto
- API_SETUP.md        → Configuración de credenciales
- PWA_CHECKLIST.md    → Validación técnica
- NEXT_STEPS.md       → Roadmap siguiente (Notificaciones, Almacenamiento)


🔗 PRÓXIMOS PASOS (Fases 3-5)
─────────────────────────────
1. ✅ Phase 2: APIs Reales (COMPLETADA)
2. Fase 3: Notificaciones Push (Firebase)
3. Fase 4: Almacenamiento Avanzado (IndexedDB)
4. Fase 5: Despliegue (Vercel/Netlify)


❓ ¿Problemas?
─────────────
- Revisa que Node.js está instalado: node --version
- Revisa que npm está instalado: npm --version
- Verifica que .env.local tiene las claves correctas
- Lee API_SETUP.md para validar credenciales
- Ve PWA_CHECKLIST.md para validar todo está correcto
- Lee DEVELOPMENT.md para solucionar problemas


💡 TIP: En desarrollo, React abrirá la app automáticamente.
Si no, abre manualmente http://localhost:3000

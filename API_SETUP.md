# 🔧 Configuración de APIs Reales

## ✅ APIs Integradas

El proyecto ahora tiene soporte integrado para:
- ✅ **DHL** — API de rastreo internacional
- ✅ **FedEx** — Sistema de rastreo FedEx
- ✅ **UPS** — Plataforma de rastreo UPS
- ✅ **Correos España** — API de Correos
- ✅ **Amazon Logistics** — Sistema de Amazon

---

## 📋 Cómo Configurar Cada API

### 1. DHL

**Paso 1:** Ve a [DHL Developer Portal](https://developer.dhl.com)

**Paso 2:** Registra tu aplicación y obtén tu API key

**Paso 3:** Añade a `.env.local`:
```
REACT_APP_DHL_API_KEY=tu_dhl_api_key_aqui
REACT_APP_DHL_ACCOUNT_NUMBER=tu_dhl_account_number_aqui
```

**Documentación:** https://developer.dhl.com/documentation

---

### 2. FedEx

**Paso 1:** Crea una cuenta en [FedEx Developer Resources](https://developer.fedex.com)

**Paso 2:** Obtén tus credenciales (API Key + Secret)

**Paso 3:** Añade a `.env.local`:
```
REACT_APP_FEDEX_API_KEY=tu_fedex_api_key_aqui
REACT_APP_FEDEX_SECRET_KEY=tu_fedex_secret_key_aqui
REACT_APP_FEDEX_ACCOUNT_NUMBER=tu_fedex_account_number_aqui
```

**Documentación:** https://developer.fedex.com/api

---

### 3. UPS

**Paso 1:** Regístrate en [UPS Developer Kit](https://www.ups.com/upsdeveloperkit)

**Paso 2:** Crea una aplicación y obtén API key

**Paso 3:** Añade a `.env.local`:
```
REACT_APP_UPS_API_KEY=tu_ups_api_key_aqui
REACT_APP_UPS_ACCOUNT_NUMBER=tu_ups_account_number_aqui
```

**Documentación:** https://www.ups.com/upsdeveloperkit/manuals

---

### 4. Correos España

**Paso 1:** Contacta a [Correos](https://www.correos.es) o accede a [Correos API Portal](https://api.correos.es)

**Paso 2:** Solicita acceso a la API de rastreo

**Paso 3:** Añade a `.env.local`:
```
REACT_APP_CORREOS_API_KEY=tu_correos_api_key_aqui
REACT_APP_CORREOS_USER=tu_correos_usuario_aqui
```

**Documentación:** Contacto directo con Correos

---

### 5. Amazon Logistics

**Paso 1:** Accede a [Amazon MWS](https://mws.amazonservices.com)

**Paso 2:** Registra tu aplicación

**Paso 3:** Obtén tus credenciales

**Paso 4:** Añade a `.env.local`:
```
REACT_APP_AMAZON_API_KEY=tu_amazon_api_key_aqui
REACT_APP_AMAZON_SECRET_KEY=tu_amazon_secret_key_aqui
```

**Documentación:** https://developer.amazon.com/docs

---

## 🚀 Cómo Usar

### Opción 1: Detección Automática

El sistema detecta automáticamente el transportista según el formato del número:

```javascript
// Ingresa el número y se detecta automáticamente
trackPackage("DHL123456789")  // Detecta DHL
trackPackage("1Z999AA10123456784")  // Detecta UPS
trackPackage("1234567890AB")  // Detecta FedEx
trackPackage("ES1234567890ES")  // Detecta Correos
```

### Opción 2: Especificar Transportista

En la interfaz, selecciona el transportista del dropdown:

```
Transportista: ▼ [Correos España]
Número de rastreo: [________]
```

---

## 📂 Estructura de Archivos

```
src/api/
├── tracking.js              # Coordinador principal
├── mockData.js              # Datos de demostración
└── carriers/
    ├── dhl.js
    ├── fedex.js
    ├── ups.js
    ├── correos.js
    └── amazon.js
```

---

## 🔄 Flujo de Rastreo

```
1. Usuario ingresa número de rastreo
                ↓
2. Sistema detecta transportista (o usa el seleccionado)
                ↓
3. Se llama a la API correspondiente
                ↓
4. Respuesta se parsea y se normaliza
                ↓
5. Se guarda en localStorage (offline)
                ↓
6. Se muestra en la UI
```

---

## 🆘 Troubleshooting

### Error: "No API key found"
**Solución:** Verifica que configuraste correctamente `.env.local` con todas las variables necesarias

### Error: "401 Unauthorized"
**Solución:** Revisa que tu API key sea correcta y no esté expirada

### Solo se muestran datos de demostración
**Solución:** 
1. Configura `REACT_APP_USE_MOCK_DATA=false` en `.env.local`
2. Verifica que tienes internet y las APIs están en línea
3. Revisa que los números de rastreo sean válidos

### "Número de rastreo no encontrado"
**Posibles causas:**
- El número de rastreo no existe
- El transportista no tiene información aún
- Tu cuenta no tiene acceso a ese rango de números

---

## 🧪 Testing

### Números de Prueba

Cada transportista proporciona números de prueba:

**DHL:** `1234567890` (en sandbox)
**FedEx:** `7648465008` (en sandbox)
**UPS:** `1Z999AA10123456784` (formato válido)
**Correos:** Números reales de Correos España
**Amazon:** Números de Amazon Logistics

---

## 🔐 Seguridad

⚠️ **IMPORTANTE:**
- Nunca hagas commit de `.env.local` - está en `.gitignore`
- Usa variables de entorno para credenciales
- En producción, usa backend propio para llamadas a APIs (evita exponer credenciales)
- Consider usar Webhooks en lugar de polling para actualizaciones

---

## 📊 Arquitectura de Backup

Si alguna API falla:
1. Se intenta la siguiente API
2. Si todas fallan, se usa localStorage
3. Si no hay datos cacheados, se muestra datos de demostración

---

## 💬 Soporte

- 📖 Lee la documentación de cada API
- 🔗 APIs están vinculadas arriba
- 💼 Contacta al soporte de cada transportista
- ❓ Abre un issue si algo no funciona

---

**¡Listo para rastrear paquetes reales!** 🚚

// src/api/tracking.js
// Coordinador principal de APIs de rastreo
// Detecta automáticamente el transportista y usa la API correspondiente

import { trackDHL } from './carriers/dhl';
import { trackFedEx } from './carriers/fedex';
import { trackUPS } from './carriers/ups';
import { trackCorreos } from './carriers/correos';
import { trackAmazon } from './carriers/amazon';
import { getRandomMockData } from './mockData';

// Patrones para detectar el transportista por número de rastreo
const CARRIER_PATTERNS = {
  DHL: /^(1Z)?[A-Z]{0,2}\d{9,11}$/i,
  FedEx: /^\d{12,14}$/,
  UPS: /^1Z[A-Z0-9]{16}$/,
  Correos: /^[A-Z]{2}\d{9,11}ES$/,
  Amazon: /^(AMZ|AMA)\d{10,15}$/
};

/**
 * Detecta el transportista basado en el patrón del número de rastreo
 * @param {string} trackingNumber - Número de rastreo
 * @returns {string|null} - Nombre del transportista o null
 */
function detectCarrier(trackingNumber) {
  for (const [carrier, pattern] of Object.entries(CARRIER_PATTERNS)) {
    if (pattern.test(trackingNumber)) {
      return carrier;
    }
  }
  return null;
}

/**
 * Rastrea un paquete usando la API del transportista adecuado
 * @param {string} trackingNumber - Número de rastreo
 * @param {string} carrier - Transportista específico (opcional)
 * @returns {Promise<Object>} Datos del paquete
 */
export async function trackPackage(trackingNumber, carrier = null) {
  try {
    if (!trackingNumber || trackingNumber.trim() === '') {
      throw new Error('Número de rastreo inválido');
    }

    // Determinar transportista
    const detectedCarrier = carrier || detectCarrier(trackingNumber);

    console.log(`📦 Rastreando: ${trackingNumber} | Transportista: ${detectedCarrier || 'Automático'}`);

    let result = null;

    // Llamar a la API del transportista
    switch (detectedCarrier) {
      case 'DHL':
        result = await trackDHL(trackingNumber);
        break;
      case 'FedEx':
        result = await trackFedEx(trackingNumber);
        break;
      case 'UPS':
        result = await trackUPS(trackingNumber);
        break;
      case 'Correos':
        result = await trackCorreos(trackingNumber);
        break;
      case 'Amazon':
        result = await trackAmazon(trackingNumber);
        break;
      default:
        // Si no se detecta, usar datos de demostración
        console.warn('⚠️ No se detectó el transportista. Usando datos de demostración.');
        result = getRandomMockData(trackingNumber);
    }

    if (!result) {
      throw new Error('Número de rastreo no encontrado');
    }

    // Guardar en localStorage para acceso offline
    const cacheKey = `tracking_${trackingNumber}`;
    localStorage.setItem(cacheKey, JSON.stringify(result));

    return result;
  } catch (error) {
    console.error('❌ Error rastreando paquete:', error);

    // Intentar recuperar del localStorage (offline fallback)
    const cacheKey = `tracking_${trackingNumber}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      console.log('📚 Usando datos en caché (offline)');
      return JSON.parse(cached);
    }

    throw error;
  }
}

/**
 * Rastrea múltiples paquetes
 * @param {Array<string>} trackingNumbers - Array de números de rastreo
 * @returns {Promise<Array>} Array de resultados
 */
export async function trackMultiple(trackingNumbers) {
  try {
    const results = await Promise.allSettled(
      trackingNumbers.map((number) => trackPackage(number))
    );
    return results;
  } catch (error) {
    console.error('Error rastreando múltiples paquetes:', error);
    throw error;
  }
}

/**
 * Obtiene los transportistas disponibles
 * @returns {Promise<Array>} Array de transportistas
 */
export async function getCarriers() {
  return [
    { id: 'dhl', name: 'DHL', pattern: CARRIER_PATTERNS.DHL },
    { id: 'fedex', name: 'FedEx', pattern: CARRIER_PATTERNS.FedEx },
    { id: 'ups', name: 'UPS', pattern: CARRIER_PATTERNS.UPS },
    { id: 'correos', name: 'Correos España', pattern: CARRIER_PATTERNS.Correos },
    { id: 'amazon', name: 'Amazon Logistics', pattern: CARRIER_PATTERNS.Amazon }
  ];
}

/**
 * Obtiene el búsquedas guardadas del localStorage
 * @returns {Array} Array de búsquedas recientes
 */
export function getSearchHistory() {
  const keys = Object.keys(localStorage).filter((key) => key.startsWith('tracking_'));
  return keys.map((key) => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return null;
    }
  }).filter(Boolean);
}

/**
 * Limpia el historial de búsquedas
 */
export function clearSearchHistory() {
  const keys = Object.keys(localStorage).filter((key) => key.startsWith('tracking_'));
  keys.forEach((key) => localStorage.removeItem(key));
}

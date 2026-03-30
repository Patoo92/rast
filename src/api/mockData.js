// src/api/mockData.js
// Datos de demostración cuando la API no está disponible

const carriers = ['DHL', 'FedEx', 'UPS', 'Correos', 'Amazon Logistics'];
const statuses = ['En tránsito', 'En almacén', 'Entregado', 'Recogido', 'Entrega intentada'];
const locations = {
  Spain: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao', 'Málaga'],
  Europe: ['París', 'Berlín', 'Ámsterdam', 'Lisboa', 'Bruselas'],
  Global: ['Londres', 'Sídney', 'Singapur', 'Tokio', 'Nueva York']
};

/**
 * Genera datos aleatorios de un paquete
 * @param {string} trackingNumber - Número de rastreo
 * @returns {Object} Datos simulados del paquete
 */
export function getRandomMockData(trackingNumber) {
  const carrier = carriers[Math.floor(Math.random() * carriers.length)];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const spanishLocations = locations.Spain;
  const origin = spanishLocations[Math.floor(Math.random() * spanishLocations.length)];
  const destination = spanishLocations[Math.floor(Math.random() * spanishLocations.length)];

  const events = generateMockEvents(origin, destination, status);

  return {
    trackingNumber,
    status,
    carrier,
    lastUpdate: new Date().toLocaleString('es-ES'),
    origin: `${origin}, España`,
    destination: `${destination}, España`,
    events
  };
}

/**
 * Genera eventos de rastreo simulados
 * @param {string} origin - Origen
 * @param {string} destination - Destino
 * @param {string} status - Estado final
 * @returns {Array} Array de eventos
 */
function generateMockEvents(origin, destination, status) {
  const now = Date.now();
  const events = [];

  // Evento 1: Recogida
  events.push({
    date: new Date(now - 86400000 * 3).toLocaleString('es-ES'),
    status: 'Paquete recogido',
    location: `Centro de distribución ${origin}`
  });

  // Evento 2: En tránsito
  events.push({
    date: new Date(now - 86400000 * 2).toLocaleString('es-ES'),
    status: 'En tránsito',
    location: `Centro de distribución regional`
  });

  // Evento 3: En almacén
  events.push({
    date: new Date(now - 86400000).toLocaleString('es-ES'),
    status: 'En almacén local',
    location: `Centro de distribución ${destination}`
  });

  // Evento 4: Final (según estado)
  if (status === 'Entregado') {
    events.push({
      date: new Date(now - 3600000).toLocaleString('es-ES'),
      status: 'Entregado',
      location: `Puerta del cliente`
    });
  } else if (status === 'Entrega intentada') {
    events.push({
      date: new Date(now - 600000).toLocaleString('es-ES'),
      status: 'Entrega intentada',
      location: `${destination}, España`
    });
  } else {
    events.push({
      date: new Date().toLocaleString('es-ES'),
      status: status,
      location: `Centro de distribución ${destination}`
    });
  }

  return events;
}

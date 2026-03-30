// src/api/carriers/correos.js
// Integración con API de Correos España

const CORREOS_API_BASE = 'https://api.correos.es/v1';

export async function trackCorreos(trackingNumber) {
  try {
    const response = await fetch(`${CORREOS_API_BASE}/estatus/codigo/${trackingNumber}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_CORREOS_API_KEY || ''}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Correos API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.envios || data.envios.length === 0) {
      return null;
    }

    const shipment = data.envios[0];
    const latestEvent = shipment.eventos?.[0];

    return {
      trackingNumber,
      carrier: 'Correos España',
      status: latestEvent?.estado || 'Desconocido',
      lastUpdate: latestEvent?.fecha,
      origin: shipment.origen?.poblacion,
      destination: shipment.destino?.poblacion,
      events: shipment.eventos?.map((event) => ({
        date: event.fecha,
        status: event.estado,
        location: event.poblacion || 'No especificado'
      })) || []
    };
  } catch (error) {
    console.error('Error tracking Correos:', error);
    return null;
  }
}

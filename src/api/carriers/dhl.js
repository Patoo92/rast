// src/api/carriers/dhl.js
// Integración con API de DHL

const DHL_API_BASE = 'https://api.dhl.com';

export async function trackDHL(trackingNumber) {
  try {
    const response = await fetch(
      `${DHL_API_BASE}/track/v1/shipments?trackingNumber=${trackingNumber}`,
      {
        method: 'GET',
        headers: {
          'DHL-API-Key': process.env.REACT_APP_DHL_API_KEY || '',
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`DHL API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.shipments || data.shipments.length === 0) {
      return null;
    }

    const shipment = data.shipments[0];
    const latestEvent = shipment.events?.[0];

    return {
      trackingNumber,
      carrier: 'DHL',
      status: mapDHLStatus(latestEvent?.statusCode),
      lastUpdate: latestEvent?.timestamp,
      origin: shipment.origin?.address?.cityName,
      destination: shipment.destination?.address?.cityName,
      events: shipment.events?.map((event) => ({
        date: event.timestamp,
        status: event.description,
        location: event.location?.address?.cityName || 'No especificado'
      })) || []
    };
  } catch (error) {
    console.error('Error tracking DHL:', error);
    return null;
  }
}

function mapDHLStatus(statusCode) {
  const statusMap = {
    PU: 'Recogido',
    'IN-OUT': 'En tránsito',
    'IN-CUST': 'En almacén aduanal',
    DE: 'Entregado',
    DL: 'Entrega intentada',
    RTO: 'Devuelto'
  };
  return statusMap[statusCode] || 'Desconocido';
}

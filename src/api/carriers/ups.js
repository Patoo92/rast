// src/api/carriers/ups.js
// Integración con API de UPS

const UPS_API_BASE = 'https://onlinetools.ups.com/track/v1/details';

export async function trackUPS(trackingNumber) {
  try {
    const response = await fetch(`${UPS_API_BASE}/${trackingNumber}`, {
      method: 'GET',
      headers: {
        'ApiKey': process.env.REACT_APP_UPS_API_KEY || '',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`UPS API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.trackResponse?.shipment || data.trackResponse.shipment.length === 0) {
      return null;
    }

    const shipment = data.trackResponse.shipment[0];
    const package_ = shipment.package?.[0];

    if (!package_) {
      return null;
    }

    const latestActivity = package_.activity?.[0];

    return {
      trackingNumber,
      carrier: 'UPS',
      status: mapUPSStatus(latestActivity?.status?.statusCode),
      lastUpdate: latestActivity?.time,
      origin: shipment.shipper?.address?.city,
      destination: shipment.shipTo?.address?.city,
      events: package_.activity?.map((activity) => ({
        date: activity.time,
        status: activity.status?.description,
        location: activity.location?.address?.city || 'No especificado'
      })) || []
    };
  } catch (error) {
    console.error('Error tracking UPS:', error);
    return null;
  }
}

function mapUPSStatus(statusCode) {
  const statusMap = {
    'P': 'Recogido',
    'I': 'En tránsito',
    'D': 'Entregado',
    'X': 'Entrega no realizada',
    'C': 'Cancelado',
    'R': 'Devuelto'
  };
  return statusMap[statusCode] || 'Desconocido';
}

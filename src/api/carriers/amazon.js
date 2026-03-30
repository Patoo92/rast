// src/api/carriers/amazon.js
// Integración con Amazon Logistics

const AMAZON_API_BASE = 'https://api.amazonlogistics.com/api/v1';

export async function trackAmazon(trackingNumber) {
  try {
    const response = await fetch(`${AMAZON_API_BASE}/shipments/track/${trackingNumber}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_AMAZON_API_KEY || ''}`,
        'x-amzn-RequestId': generateRequestId(),
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Amazon API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.shipment) {
      return null;
    }

    const shipment = data.shipment;
    const latestEvent = shipment.events?.[0];

    return {
      trackingNumber,
      carrier: 'Amazon Logistics',
      status: shipment.shipmentStatus || 'Desconocido',
      lastUpdate: latestEvent?.eventTime,
      origin: shipment.originAddress?.city,
      destination: shipment.destinationAddress?.city,
      events: shipment.events?.map((event) => ({
        date: event.eventTime,
        status: event.eventDescription,
        location: event.location?.city || 'No especificado'
      })) || []
    };
  } catch (error) {
    console.error('Error tracking Amazon:', error);
    return null;
  }
}

function generateRequestId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

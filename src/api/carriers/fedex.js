// src/api/carriers/fedex.js
// Integración con API de FedEx

const FEDEX_API_BASE = 'https://apis.fedex.com';

export async function trackFedEx(trackingNumber) {
  try {
    // Obtener token de autenticación
    const token = await getFedExToken();

    const response = await fetch(`${FEDEX_API_BASE}/track/v1/shipments/fedexe`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        includeDetailedScans: true,
        trackingInfo: [
          {
            trackingNumberInfo: {
              trackingNumber: trackingNumber
            }
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`FedEx API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.output?.completeTrackResults || data.output.completeTrackResults.length === 0) {
      return null;
    }

    const trackResult = data.output.completeTrackResults[0];
    const shipment = trackResult.trackResults?.[0];

    if (!shipment) {
      return null;
    }

    const latestEvent = shipment.scanEvents?.[0];

    return {
      trackingNumber,
      carrier: 'FedEx',
      status: shipment.statusDetail?.description || 'Desconocido',
      lastUpdate: latestEvent?.scanDateTime,
      origin: shipment.originLocation?.address?.city,
      destination: shipment.destLocation?.address?.city,
      events: shipment.scanEvents?.map((event) => ({
        date: event.scanDateTime,
        status: event.statusDetail?.description,
        location: event.scanLocation?.city || 'No especificado'
      })) || []
    };
  } catch (error) {
    console.error('Error tracking FedEx:', error);
    return null;
  }
}

async function getFedExToken() {
  try {
    const response = await fetch(`${FEDEX_API_BASE}/oauth/authorize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.REACT_APP_FEDEX_API_KEY || '',
        client_secret: process.env.REACT_APP_FEDEX_SECRET_KEY || ''
      }).toString()
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting FedEx token:', error);
    throw error;
  }
}

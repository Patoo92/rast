import React from 'react';
import './PackageStatus.css';

function PackageStatus({ data }) {
  const getStatusColor = (status) => {
    const statuses = {
      'En tránsito': '#ff9800',
      'En almacén': '#2196f3',
      'Entregado': '#4caf50',
      'Devuelto': '#f44336'
    };
    return statuses[status] || '#757575';
  };

  return (
    <div className="package-status">
      <div className="status-header">
        <h2>Información del Paquete</h2>
        <p className="tracking-number">Número: {data.trackingNumber}</p>
      </div>

      <div className="status-info">
        <div className="info-card">
          <span className="label">Transportista:</span>
          <span className="value">{data.carrier}</span>
        </div>
        <div className="info-card">
          <span className="label">Estado:</span>
          <span className="value status" style={{ backgroundColor: getStatusColor(data.status) }}>
            {data.status}
          </span>
        </div>
        <div className="info-card">
          <span className="label">Última actualización:</span>
          <span className="value">{data.lastUpdate}</span>
        </div>
      </div>

      <div className="route">
        <div className="route-item">
          <span className="route-label">Origen</span>
          <span className="route-location">{data.origin}</span>
        </div>
        <div className="route-arrow">→</div>
        <div className="route-item">
          <span className="route-label">Destino</span>
          <span className="route-location">{data.destination}</span>
        </div>
      </div>

      <div className="events">
        <h3>Historial de Eventos</h3>
        <ul className="events-list">
          {data.events.map((event, index) => (
            <li key={index} className="event-item">
              <div className="event-circle"></div>
              <div className="event-details">
                <span className="event-status">{event.status}</span>
                <span className="event-location">{event.location}</span>
                <span className="event-date">{event.date}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PackageStatus;

import React, { useState } from 'react';
import './TrackingForm.css';

function TrackingForm({ onTrack, loading, carriers = [] }) {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [selectedCarrier, setSelectedCarrier] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      onTrack(trackingNumber.trim(), selectedCarrier || null);
      setTrackingNumber('');
    }
  };

  return (
    <form className="tracking-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="carrier-select">🚚 Transportista</label>
          <select
            id="carrier-select"
            value={selectedCarrier}
            onChange={(e) => setSelectedCarrier(e.target.value)}
            disabled={loading}
            className="carrier-select"
          >
            <option value="">Detectar automáticamente</option>
            {carriers.map((carrier) => (
              <option key={carrier.id} value={carrier.id}>
                {carrier.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="tracking-input">📦 Número de Rastreo</label>
          <input
            id="tracking-input"
            type="text"
            placeholder="Ingresa el número"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            disabled={loading}
            required
          />
        </div>
      </div>

      <button type="submit" disabled={loading} className="submit-btn">
        {loading ? (
          <>
            <span className="spinner"></span>
            Buscando paquete...
          </>
        ) : (
          <>
            🔍 Rastrear
          </>
        )}
      </button>

      <div className="form-hint">
        💡 <code>Auto-detección:</code> El sistema identificará automáticamente el transportista
      </div>
    </form>
  );
}

export default TrackingForm;

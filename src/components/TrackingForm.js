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
      <div className="form-group">
        <label htmlFor="carrier-select">Transportista (Opcional):</label>
        <select
          id="carrier-select"
          value={selectedCarrier}
          onChange={(e) => setSelectedCarrier(e.target.value)}
          disabled={loading}
          className="carrier-select"
        >
          <option value="">🔍 Detectar automáticamente</option>
          {carriers.map((carrier) => (
            <option key={carrier.id} value={carrier.id}>
              {carrier.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="tracking-input">Número de rastreo:</label>
        <input
          id="tracking-input"
          type="text"
          placeholder="Ej: 1234567890ABC"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          disabled={loading}
          required
        />
      </div>

      <button type="submit" disabled={loading} className="submit-btn">
        {loading ? '🔄 Rastreando...' : '🔍 Rastrear'}
      </button>

      <div className="form-hint">
        💡 <small>En muchos casos, el número de rastreo se detiene automáticamente</small>
      </div>
    </form>
  );
}

export default TrackingForm;

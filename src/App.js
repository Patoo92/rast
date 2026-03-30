import React, { useState } from 'react';
import './App.css';
import TrackingForm from './components/TrackingForm';
import PackageStatus from './components/PackageStatus';
import { trackPackage, getCarriers } from './api/tracking';

function App() {
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [carriers, setCarriers] = useState([]);

  // Cargar transportistas disponibles
  React.useEffect(() => {
    const loadCarriers = async () => {
      const carriersList = await getCarriers();
      setCarriers(carriersList);
    };
    loadCarriers();
  }, []);

  // Detectar si la PWA es instalable
  React.useEffect(() => {
    let deferredPrompt;

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      deferredPrompt = e;
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleTrackPackage = async (trackingNumber, selectedCarrier = null) => {
    setLoading(true);
    setError(null);
    setTrackingData(null);

    try {
      const data = await trackPackage(trackingNumber, selectedCarrier);
      setTrackingData(data);
    } catch (err) {
      setError(err.message || 'Error al rastrear el paquete. Intenta de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📦 Rastreo de Paquetes PWA</h1>
        <p>Rastrea tus paquetes con APIs reales de DHL, FedEx, UPS, Correos y Amazon</p>
        {isInstallable && (
          <button className="install-btn" onClick={() => alert('Instalar desde el menú del navegador')}>
            ⬇️ Instalar aplicación
          </button>
        )}
      </header>

      <main className="App-main">
        <TrackingForm
          onTrack={handleTrackPackage}
          loading={loading}
          carriers={carriers}
        />

        {error && <div className="error-message">{error}</div>}

        {trackingData && <PackageStatus data={trackingData} />}

        {!trackingData && !error && !loading && (
          <div className="welcome-message">
            <h2>Bienvenido</h2>
            <p>Ingresa un número de rastreo para ver el estado de tu paquete.</p>
            <p>✨ Funciona sin conexión - tus búsquedas se guardan automáticamente</p>
            <div className="carrier-info">
              <h3>🚚 Transportistas Soportados:</h3>
              <ul>
                {carriers.map((carrier) => (
                  <li key={carrier.id}>
                    <strong>{carrier.name}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>

      <footer className="App-footer">
        <p>PWA de Rastreo de Paquetes &copy; 2026 | Integración con APIs Reales</p>
      </footer>
    </div>
  );
}

export default App;

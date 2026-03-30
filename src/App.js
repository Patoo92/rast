import React, { useState } from 'react';
import './App.css';
import TrackingForm from './components/TrackingForm';
import PackageStatus from './components/PackageStatus';
import Login from './components/Login';
import { SkeletonLoaders } from './components/Skeleton';
import { useAuth } from './context/AuthContext';
import { trackPackage, getCarriers } from './api/tracking';

function App() {
  const { isAuthenticated, currentUser, logout } = useAuth();
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

  // Si no está autenticado, mostrar login
  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-top">
          <div className="header-left">
            <h1>📦 RAST</h1>
            <p>Rastreo de Paquetes PWA</p>
          </div>
          <div className="header-right">
            <div className="user-info">
              <span className="user-avatar">👤</span>
              <span className="user-name">{currentUser?.username}</span>
              <button className="logout-btn" onClick={logout}>
                Salir
              </button>
            </div>
            {isInstallable && (
              <button className="install-btn" onClick={() => alert('Instalar desde el menú del navegador')}>
                ⬇️ Instalar
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="App-main">
        <TrackingForm
          onTrack={handleTrackPackage}
          loading={loading}
          carriers={carriers}
        />

        {error && <div className="error-message">{error}</div>}

        {loading && <SkeletonLoaders count={2} />}

        {trackingData && !loading && <PackageStatus data={trackingData} />}

        {!trackingData && !error && !loading && (
          <div className="welcome-message">
            <h2>👋 Bienvenido, {currentUser?.username}!</h2>
            <p>Ingresa un número de rastreo para ver el estado de tu paquete.</p>
            <p>✨ Todos tus datos se guardan automáticamente - funciona sin conexión</p>
            <div className="carrier-info">
              <h3>🚚 Transportistas Soportados:</h3>
              <ul className="carriers-list">
                {carriers.map((carrier) => (
                  <li key={carrier.id}>
                    <span className="carrier-icon">{carrier.icon || '📦'}</span>
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

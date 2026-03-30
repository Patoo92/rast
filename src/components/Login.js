import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simular delay de autenticación
    setTimeout(() => {
      const result = login(username, password);
      if (!result.success) {
        setError(result.error);
      }
      setLoading(false);
    }, 500);
  };

  const handleDemoLogin = () => {
    setUsername('demo');
    setPassword('demo123');
    setTimeout(() => {
      login('demo', 'demo123');
    }, 100);
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="bg-gradient-1"></div>
        <div className="bg-gradient-2"></div>
      </div>

      <div className="login-content">
        <div className="login-card">
          <div className="login-header">
            <div className="logo-circle">📦</div>
            <h1>RAST</h1>
            <p className="subtitle">Rastreo de Paquetes PWA</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Usuario</label>
              <input
                id="username"
                type="text"
                placeholder="Mínimo 3 caracteres"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="form-input"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" disabled={loading} className="login-button">
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Ingresando...
                </>
              ) : (
                'Ingresar'
              )}
            </button>
          </form>

          <div className="login-divider">O</div>

          <button onClick={handleDemoLogin} disabled={loading} className="demo-button">
            🎯 Usar Demostración
          </button>

          <div className="login-footer">
            <p>Demo: usuario: <code>demo</code>, contraseña: <code>demo123</code></p>
          </div>
        </div>

        <div className="features-preview">
          <div className="feature">
            <span className="feature-icon">🌐</span>
            <p>Rastreo en Tiempo Real</p>
          </div>
          <div className="feature">
            <span className="feature-icon">📱</span>
            <p>Funciona Offline</p>
          </div>
          <div className="feature">
            <span className="feature-icon">🚚</span>
            <p>5 Transportistas</p>
          </div>
          <div className="feature">
            <span className="feature-icon">🔔</span>
            <p>Notificaciones</p>
          </div>
        </div>
      </div>
    </div>
  );
}

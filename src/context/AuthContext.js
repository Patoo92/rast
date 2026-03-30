import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user is already logged in
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  });

  const login = (username, password) => {
    // Simple validation - in production use real backend
    if (username && password && username.length >= 3 && password.length >= 6) {
      const user = { username, email: `${username}@rast.app` };
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true };
    }
    return { success: false, error: 'Usuario (3+ caracteres) y contraseña (6+ caracteres) requeridos' };
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

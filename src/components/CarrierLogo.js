import React from 'react';
import './CarrierLogo.css';

function CarrierLogo({ carrier, size = 'medium' }) {
  const getCarrierLogo = () => {
    const carrierId = carrier?.toLowerCase().replace(/\s+/g, '') || 'generic';
    
    switch (carrierId) {
      case 'dhl':
        return (
          <svg viewBox="0 0 100 60" className={`carrier-svg ${size}`}>
            <rect fill="#FFCC00" width="100" height="60"/>
            <text x="50" y="42" textAnchor="middle" fill="#003DA5" fontSize="36" fontWeight="bold" fontFamily="Arial">DHL</text>
          </svg>
        );
      case 'fedex':
        return (
          <svg viewBox="0 0 100 60" className={`carrier-svg ${size}`}>
            <rect fill="#4D148C" width="100" height="60"/>
            <text x="30" y="42" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontWeight="bold" fontFamily="Arial">Fed</text>
            <text x="70" y="42" textAnchor="middle" fill="#FF6600" fontSize="20" fontWeight="bold" fontFamily="Arial">Ex</text>
          </svg>
        );
      case 'ups':
        return (
          <svg viewBox="0 0 100 60" className={`carrier-svg ${size}`}>
            <rect fill="#351C15" width="100" height="60"/>
            <circle cx="20" cy="30" r="12" fill="#FFB81C"/>
            <text x="55" y="42" textAnchor="middle" fill="#FFFFFF" fontSize="24" fontWeight="bold" fontFamily="Arial">UPS</text>
          </svg>
        );
      case 'correos':
        return (
          <svg viewBox="0 0 100 60" className={`carrier-svg ${size}`}>
            <rect fill="#FFFFFF" width="100" height="60" stroke="#003DA5" strokeWidth="1"/>
            <text x="50" y="42" textAnchor="middle" fill="#003DA5" fontSize="16" fontWeight="bold" fontFamily="Arial">CORREOS</text>
          </svg>
        );
      case 'amazon':
        return (
          <svg viewBox="0 0 100 60" className={`carrier-svg ${size}`}>
            <rect fill="#FF9900" width="100" height="60"/>
            <text x="50" y="42" textAnchor="middle" fill="#FFFFFF" fontSize="24" fontWeight="bold" fontFamily="Arial">AMAZON</text>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 100 60" className={`carrier-svg ${size}`}>
            <rect fill="#E0E0E0" width="100" height="60" stroke="#999" strokeWidth="1"/>
            <text x="50" y="42" textAnchor="middle" fill="#666" fontSize="12" fontWeight="bold" fontFamily="Arial">{carrier || 'CARRIER'}</text>
          </svg>
        );
    }
  };

  return (
    <div className="carrier-logo-container">
      {getCarrierLogo()}
    </div>
  );
}

export default CarrierLogo;

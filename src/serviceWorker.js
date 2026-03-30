// Módulo para registrar el Service Worker
// Este archivo se ejecuta en el contexto de React, por lo que no necesitamos desactivar ESLint

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

export function register(config?: Config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // La URL del Service Worker
    const publicUrl = new URL(process.env.PUBLIC_URL || '', window.location.href);
    const swUrl = `${publicUrl.origin}/service-worker.js`;

    if (isLocalhost) {
      // En localhost, verificamos que el service worker existe
      checkValidServiceWorker(swUrl, config);
    } else {
      // En producción, registramos el service worker
      registerValidSW(swUrl, config);
    }
  } else if (process.env.NODE_ENV === 'development') {
    console.log('Service Worker desactivado en desarrollo');
  }
}

function registerValidSW(swUrl: string, config?: Config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // Se encontró una nueva versión del Service Worker
              console.log('Nueva versión disponible; recarga por favor.');
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // Service Worker instalado por primera vez
              console.log('El contenido se cacheó para uso offline.');
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Error durante el registro de Service Worker:', error);
    });
}

function checkValidServiceWorker(swUrl: string, config?: Config) {
  // Verifica que el service worker existe
  fetch(swUrl)
    .then((response) => {
      // Asegúrate que el service worker existe e ingresa válido
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // No es válido un service worker
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Es válido, así que registra el service worker
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log('No hay conexión a internet. Ejecutando en modo offline.');
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}

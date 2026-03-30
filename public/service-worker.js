/* eslint-disable no-restricted-globals, no-undef */
// Service Worker para PWA de Rastreo de Paquetes
// Maneja cacheo offline, actualizaciones en segundo plano y notificaciones push
// Nota: Este archivo se ejecuta en un Web Worker separado

const CACHE_NAME = 'rastreo-paquetes-v1';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/static/css/main.css',
  '/static/js/main.js'
];

// Evento de instalación: precachea los archivos esenciales
self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Precacheando archivos');
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('Error al precachear algunos archivos:', err);
        // Continuar incluso si hay errores al precachear
      });
    })
  );
  self.skipWaiting(); // Activar inmediatamente sin esperar a que se cierre la pestaña anterior
});

// Evento de activación: limpia cachés antiguas
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activando...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Eliminando caché antigua:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // Tomar control de clientes inmediatamente
});

// Evento de fetch: maneja las estrategias de caché
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // No cachear peticiones a APIs externas (solo caché en caso de error)
  if (url.origin !== self.location.origin) {
    event.respondWith(
      fetch(request).catch(() => {
        return caches.match('/offline.html').catch(() => {
          return new Response('Offline - No hay datos disponibles');
        });
      })
    );
    return;
  }

  // Estrategia Cache-First para archivos estáticos
  if (
    request.method === 'GET' &&
    (request.destination === 'style' ||
      request.destination === 'script' ||
      request.destination === 'image' ||
      request.destination === 'font')
  ) {
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request).then((response) => {
          // Actualizar caché con la nueva versión
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, response.clone());
            return response;
          });
        });
      })
    );
    return;
  }

  // Estrategia Network-First para otras solicitudes
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Actualizar caché sin importar la respuesta
        if (response.status === 200) {
          const cacheClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, cacheClone);
          });
        }
        return response;
      })
      .catch(() => {
        // Fallback a caché si no hay conexión
        return caches.match(request).then((response) => {
          return response || new Response('Offline - No hay datos disponibles en caché');
        });
      })
  );
});

// Evento de notificación push (para funciones avanzadas futuras)
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || 'Tu paquete ha sido actualizado',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    tag: data.tag || 'notification',
    requireInteraction: data.requireInteraction || false
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Rastreo de Paquetes', options)
  );
});

// Evento al hacer clic en una notificación
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clientList) => {
      for (let client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow('/');
      }
    })
  );
});

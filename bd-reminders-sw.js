'use strict';

// This worker only handles reminders. Application pages are never cached here.
self.addEventListener('push', event => {
  event.waitUntil(self.registration.showNotification('Bendito Compras', {
    body: 'Hora de fazer sua lista de mercado. Toque para abrir o aplicativo.',
    tag: 'bendito-lista-mercado',
    renotify: false,
    data: { url: new URL('bem-dito-compras.html', self.registration.scope).href }
  }));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const destination = new URL('bem-dito-compras.html', self.registration.scope).href;
  event.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windows => {
    const existing = windows.find(client => client.url.split('?')[0] === destination);
    return existing ? existing.focus() : self.clients.openWindow(destination);
  }));
});

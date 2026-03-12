// Service Worker — Push notifications only, no caching
/* eslint-disable no-restricted-globals */

self.addEventListener("push", (event) => {
  if (!event.data) return;

  let data;
  try {
    data = event.data.json();
  } catch {
    data = { title: "HolaBonjour", body: event.data.text() };
  }

  const options = {
    body: data.body || "",
    icon: "/images/logo-holabonjour-01.svg",
    badge: "/images/logo-holabonjour-01.svg",
    data: { url: data.url || "/" },
  };

  event.waitUntil(self.registration.showNotification(data.title || "HolaBonjour", options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/";
  event.waitUntil(clients.openWindow(url));
});

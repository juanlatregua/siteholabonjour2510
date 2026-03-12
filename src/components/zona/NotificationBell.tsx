"use client";

import React, { useState, useEffect } from "react";
import { FiBell, FiBellOff } from "react-icons/fi";

export default function NotificationBell() {
  const [permission, setPermission] = useState<NotificationPermission | "unsupported">("default");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!("Notification" in window) || !("serviceWorker" in navigator)) {
      setPermission("unsupported");
      return;
    }
    setPermission(Notification.permission);
  }, []);

  async function subscribe() {
    if (permission === "unsupported") return;
    setLoading(true);

    try {
      const perm = await Notification.requestPermission();
      setPermission(perm);
      if (perm !== "granted") {
        setLoading(false);
        return;
      }

      const registration = await navigator.serviceWorker.register("/sw.js");
      await navigator.serviceWorker.ready;

      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!vapidKey) {
        setLoading(false);
        return;
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey),
      });

      const json = subscription.toJSON();
      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          endpoint: json.endpoint,
          keys: json.keys,
        }),
      });
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }

  if (permission === "unsupported") return null;

  return (
    <button
      onClick={subscribe}
      disabled={loading || permission === "granted"}
      className={`flex items-center justify-center rounded-lg p-1.5 transition-colors ${
        permission === "granted"
          ? "text-green-600"
          : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
      }`}
      title={
        permission === "granted"
          ? "Notificaciones activadas"
          : "Activar notificaciones"
      }
    >
      {permission === "granted" ? (
        <FiBell className="h-4 w-4" />
      ) : (
        <FiBellOff className="h-4 w-4" />
      )}
    </button>
  );
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

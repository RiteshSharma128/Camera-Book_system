import { useEffect } from "react";
import io from "socket.io-client";

const socket = io("https://camera-book-system-1.onrender.com");

export default function LiveTracking({ bookingId }) {
  useEffect(() => {
    if (!bookingId) return;

    // ✅ Customer location watch
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        socket.emit("send-location", {
          bookingId,
          lat: latitude,
          lng: longitude,
        });
      },
      (err) => {
        console.error("Location error:", err);
      },
      { enableHighAccuracy: true, maximumAge: 0 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [bookingId]);

  return <p className="text-sm text-green-400">📡 Sharing live location...</p>;
}

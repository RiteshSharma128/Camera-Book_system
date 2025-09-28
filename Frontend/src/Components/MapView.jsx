// import React from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
//   iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
//   shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png"
// });

// export default function MapView({ center = [20.59, 78.96], markers = [] }) {
//   return (
//     <MapContainer center={center} zoom={13} style={{ height: "400px", width: "100%" }}>
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       {markers.map((m, i) => (
//         <Marker key={i} position={[m.lat, m.lng]}>
//           <Popup>{m.label}</Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// }


import { useEffect } from "react";
import io from "socket.io-client";

const socket = io("https://camera-book-system.onrender.com");

export default function LiveTracking({ bookingId }) {
  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        socket.emit("customer-location", {
          bookingId,
          lat: latitude,
          lng: longitude,
        });
      },
      (error) => console.error("Geolocation error:", error),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [bookingId]);

  return null; // ye UI show nahi karta, sirf location send karta hai
}

// import { useEffect, useState } from "react";
// import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000");

// export default function VendorLiveMap({ bookingId }) {
//   const [customerLocation, setCustomerLocation] = useState(null);

//   // Load Google Maps API
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // <-- Replace with your key
//   });

//   useEffect(() => {
//     if (!bookingId) return;

//     // Vendor joins booking room
//     socket.emit("join-booking", bookingId);

//     // Listen for customer location
//     socket.on("customer-location", ({ lat, lng }) => {
//       setCustomerLocation({ lat, lng });
//     });

//     return () => {
//       socket.off("customer-location");
//     };
//   }, [bookingId]);

//   if (!isLoaded) return <p>Loading map...</p>;

//   return (
//     <div className="w-full h-96">
//       <GoogleMap
//         center={customerLocation || { lat: 20.5937, lng: 78.9629 }} // India center default
//         zoom={customerLocation ? 15 : 5}
//         mapContainerStyle={{ width: "100%", height: "100%" }}
//       >
//         {customerLocation && (
//           <Marker
//             position={customerLocation}
//             label="Customer"
//             icon={{
//               url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
//             }}
//           />
//         )}
//       </GoogleMap>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000");

// // ✅ Fix default Leaflet icon bug
// const defaultIcon = new L.Icon({
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// export default function VendorLiveMap({ bookingId }) {
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     // Join Socket.IO room for this booking
//     socket.emit("join-booking", bookingId);

//     // Listen for customer location updates
//     socket.on("customer-location", ({ bookingId: id, lat, lng }) => {
//       if (id === bookingId) {
//         setLocation({ lat, lng });
//       }
//     });

//     return () => {
//       socket.off("customer-location");
//     };
//   }, [bookingId]);

//   if (!location)
//     return (
//       <div className="bg-gray-900 border border-yellow-400 p-4 rounded-2xl text-gray-300 text-center">
//         Waiting for customer location...
//       </div>
//     );

//   return (
//     <div className="mt-6 h-96 w-full md:w-3/4 mx-auto rounded-3xl overflow-hidden border-2 border-yellow-400 shadow-2xl">
//       <MapContainer
//         center={[location.lat, location.lng]}
//         zoom={15}
//         style={{ height: "100%", width: "100%" }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution="© OpenStreetMap contributors"
//         />
//         <Marker position={[location.lat, location.lng]} icon={defaultIcon}>
//           <Popup>📍 Customer is here</Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

// ✅ Fix default Leaflet icon bug
const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function VendorLiveMap({ bookingId }) {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!bookingId) return;

    // Join Socket.IO room for this booking
    socket.emit("join-booking", bookingId);

    // Listen for customer location updates
    const handleLocation = ({ bookingId: id, lat, lng }) => {
      if (id === bookingId) {
        setLocation({ lat, lng });
      }
    };

    socket.on("customer-location", handleLocation);
    socket.on("vendor-customer-location", handleLocation); // for new merged system

    return () => {
      socket.off("customer-location", handleLocation);
      socket.off("vendor-customer-location", handleLocation);
    };
  }, [bookingId]);

  if (!location) {
    return (
      <div className="bg-gray-900 border border-yellow-400 p-4 rounded-2xl text-gray-300 text-center">
        Waiting for customer location...
      </div>
    );
  }

  return (
    <div className="mt-6 h-96 w-full md:w-3/4 mx-auto rounded-3xl overflow-hidden border-2 border-yellow-400 shadow-2xl">
      <MapContainer
        center={[location.lat, location.lng]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        <Marker position={[location.lat, location.lng]} icon={defaultIcon}>
          <Popup>📍 Customer is here</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

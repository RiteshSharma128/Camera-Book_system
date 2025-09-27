
// import React, { useState } from "react";
// import useLocationTracking from "./UseLocationTracking";

// export default function LocationTracker() {
//   const [enabled, setEnabled] = useState(true);
//   const location = useLocationTracking(null, enabled);

//   return (
//     <div style={{
//       maxWidth: 350,
//       margin: "2rem auto",
//       padding: "1.5rem",
//       border: "1px solid #ddd",
//       borderRadius: 8,
//       boxShadow: "0 2px 8px #eee",
//       fontFamily: "sans-serif"
//     }}>
//       <h2>Location Tracker</h2>
//       <div>
//         <strong>Status:</strong>{" "}
//         {enabled ? "Tracking enabled" : "Tracking disabled"}
//       </div>
//       <div style={{ margin: "1rem 0" }}>
//         <strong>Latitude:</strong> {location.lat ?? "N/A"}<br />
//         <strong>Longitude:</strong> {location.lng ?? "N/A"}
//       </div>
//       <button
//         onClick={() => setEnabled((e) => !e)}
//         style={{
//           padding: "0.5rem 1rem",
//           borderRadius: 4,
//           border: "none",
//           background: enabled ? "#e74c3c" : "#2ecc71",
//           color: "#fff",
//           cursor: "pointer"
//         }}
//       >
//         {enabled ? "Stop Tracking" : "Start Tracking"}
//       </button>
//     </div>
//   );
// }


import React, { useState } from "react";
import useLocationTracking from "./UseLocationTracking";

export default function LocationTracker() {
  const [enabled, setEnabled] = useState(true);
  const location = useLocationTracking(null, enabled);

  return (
    <div className="max-w-sm mx-auto mt-16 p-6 bg-gray-900 text-white rounded-2xl shadow-2xl font-sans">
      <h2 className="text-2xl font-bold mb-4 text-green-400 text-center">
        Location Tracker
      </h2>

      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold">Status:</span>
        <span
          className={`font-bold ${
            enabled ? "text-green-400" : "text-red-500"
          }`}
        >
          {enabled ? "Tracking Enabled" : "Tracking Disabled"}
        </span>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-inner mb-4">
        <p>
          <span className="font-semibold">Latitude:</span>{" "}
          <span className="text-green-300">{location.lat ?? "N/A"}</span>
        </p>
        <p>
          <span className="font-semibold">Longitude:</span>{" "}
          <span className="text-green-300">{location.lng ?? "N/A"}</span>
        </p>
      </div>

      <button
        onClick={() => setEnabled((prev) => !prev)}
        className={`w-full py-2 rounded-lg font-semibold transition-colors ${
          enabled
            ? "bg-red-600 hover:bg-red-500"
            : "bg-green-600 hover:bg-green-500"
        }`}
      >
        {enabled ? "Stop Tracking" : "Start Tracking"}
      </button>
    </div>
  );
}

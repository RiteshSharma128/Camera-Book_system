


// import { useEffect, useState } from "react";
// import { getBookings, cancelBooking, getCameras } from "../Utils/api";
// import { useNavigate } from "react-router-dom";
// import io from "socket.io-client";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import LiveTracking from "../Components/Livecation";

// const socket = io("http://localhost:5000");

// // ✅ Fix default Leaflet icon bug
// const defaultIcon = new L.Icon({
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// export default function CustomerDashboard() {
//   const [bookings, setBookings] = useState([]);
//   const [cameras, setCameras] = useState([]);
//   const [notifications, setNotifications] = useState([]);
//   const [customerLocations, setCustomerLocations] = useState({});
//   const [loadingBookings, setLoadingBookings] = useState(true);
//   const [loadingCameras, setLoadingCameras] = useState(true);
//   const navigate = useNavigate();

//   // Fetch bookings
//   const fetchBookings = async () => {
//     setLoadingBookings(true);
//     try {
//       const data = await getBookings();
//       setBookings(data);
//     } catch (err) {
//       console.error(err);
//     }
//     setLoadingBookings(false);
//   };

//   // Fetch cameras
//   const fetchCameras = async () => {
//     setLoadingCameras(true);
//     try {
//       const data = await getCameras();
//       setCameras(data);
//     } catch (err) {
//       console.error(err);
//     }
//     setLoadingCameras(false);
//   };

//   useEffect(() => {
//     fetchBookings();
//     fetchCameras();
//   }, []);

//   // Socket.IO for live notifications & locations
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user) return;

//     socket.emit("join-customer", user._id);

//     socket.on("new-booking", (booking) => {
//       setNotifications((prev) => [...prev, booking]);
//       fetchBookings();
//     });

//     socket.on("customer-location", ({ bookingId, lat, lng }) => {
//       setCustomerLocations((prev) => ({ ...prev, [bookingId]: { lat, lng } }));
//     });

//     return () => {
//       socket.off("new-booking");
//       socket.off("customer-location");
//     };
//   }, []);

//   const handleCancel = async (id) => {
//     if (window.confirm("Are you sure to cancel this booking?")) {
//       await cancelBooking(id);
//       fetchBookings();
//     }
//   };

//   const handleBookNow = (camera) => {
//     navigate("/select-dates", { state: { camera, bookings } });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-gray-900 to-black text-white p-8 md:p-12">
//       {/* Available Cameras */}
//       <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-400 mb-8 tracking-wide">
//         Available Cameras
//       </h1>
//       {loadingCameras && <p className="text-gray-300">Loading cameras...</p>}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
//         {cameras.length === 0 && !loadingCameras && <p>No cameras available.</p>}
//         {cameras.map((cam) => (
//           <div
//             key={cam._id}
//             className="bg-gray-800 p-6 rounded-3xl shadow-2xl border border-yellow-500 hover:scale-105 transition-transform duration-300"
//           >
//             <img
//               src={cam.image || "/default-camera.png"}
//               alt={cam.title}
//               className="w-full h-48 object-cover rounded-2xl mb-4"
//             />
//             <h3 className="font-bold text-yellow-400 text-xl mb-2">{cam.title}</h3>
//             <p className="text-gray-300 mb-2">{cam.description}</p>
//             <p className="text-yellow-300 font-semibold text-lg mb-4">
//               ₹{cam.pricePerDay} / day
//             </p>
//             <button
//               className="w-full py-2 bg-yellow-400 text-black rounded-xl font-bold hover:bg-yellow-300 transition-colors"
//               onClick={() => handleBookNow(cam)}
//             >
//               Book Now
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* My Bookings */}
//       <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-400 mb-8 tracking-wide">
//         My Bookings
//       </h1>
//       {loadingBookings && <p className="text-gray-300">Loading bookings...</p>}
//       {!loadingBookings && bookings.length === 0 && <p>No bookings yet.</p>}

//       <div className="grid gap-8">
//         {bookings.map((b) => (
//           <div
//             key={b._id}
//             className="bg-yellow-400/20 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-yellow-500 hover:shadow-2xl transition-shadow"
//           >
//             <div className="flex flex-col md:flex-row items-center gap-6">
//               <img
//                 src={b.camera?.image || "/default-camera.png"}
//                 alt={b.camera?.title}
//                 className="w-32 h-32 object-cover rounded-2xl"
//               />
//               <div className="flex-1">
//                 <h3 className="font-bold text-xl md:text-2xl mb-1">{b.eventName}</h3>
//                 <p className="text-gray-200 mb-1">{b.camera?.title}</p>
//                 <p className="text-gray-300 mb-1">
//                   {new Date(b.startDate).toLocaleDateString()} -{" "}
//                   {new Date(b.endDate).toLocaleDateString()}
//                 </p>
//                 <p className="text-gray-200 mb-1 font-semibold">₹{b.totalPrice}</p>
//                 <p className="text-gray-200 mb-2">Status: {b.paymentStatus}</p>

//                 <LiveTracking bookingId={b._id} />

//                 {/* Live Map */}
//                 {customerLocations[b._id] && (
//                   <div className="mt-4 h-64 w-full md:w-96 rounded-2xl overflow-hidden border-2 border-yellow-400 shadow-lg">
//                     <MapContainer
//                       center={[customerLocations[b._id].lat, customerLocations[b._id].lng]}
//                       zoom={15}
//                       style={{ height: "100%", width: "100%" }}
//                     >
//                       <TileLayer
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         attribution="© OpenStreetMap contributors"
//                       />
//                       <Marker
//                         position={[customerLocations[b._id].lat, customerLocations[b._id].lng]}
//                         icon={defaultIcon}
//                       >
//                         <Popup>📍 Customer is here</Popup>
//                       </Marker>
//                     </MapContainer>
//                   </div>
//                 )}
//               </div>
//             </div>
//             <button
//               className="mt-4 px-6 py-2 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-500 transition-colors"
//               onClick={() => handleCancel(b._id)}
//             >
//               Cancel Booking
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import { getBookings, cancelBooking, getCameras } from "../Utils/api";
// import { useNavigate } from "react-router-dom";
// import io from "socket.io-client";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import LiveTracking from "../Components/Livecation";

// const socket = io("http://localhost:5000");

// // ✅ Fix default Leaflet icon bug
// const defaultIcon = new L.Icon({
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// export default function CustomerDashboard() {
//   const [bookings, setBookings] = useState([]);
//   const [cameras, setCameras] = useState([]);
//   const [notifications, setNotifications] = useState([]);
//   const [customerLocations, setCustomerLocations] = useState({});
//   const [loadingBookings, setLoadingBookings] = useState(true);
//   const [loadingCameras, setLoadingCameras] = useState(true);
//   const navigate = useNavigate();

//   // Fetch bookings
//   const fetchBookings = async () => {
//     setLoadingBookings(true);
//     try {
//       const data = await getBookings();
//       setBookings(data);
//     } catch (err) {
//       console.error(err);
//     }
//     setLoadingBookings(false);
//   };

//   // Fetch cameras
//   const fetchCameras = async () => {
//     setLoadingCameras(true);
//     try {
//       const data = await getCameras();
//       setCameras(data);
//     } catch (err) {
//       console.error(err);
//     }
//     setLoadingCameras(false);
//   };

//   useEffect(() => {
//     fetchBookings();
//     fetchCameras();
//   }, []);

//   // Socket.IO for live notifications & locations
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user) return;

//     socket.emit("join-customer", user._id);

//     socket.on("booking-update", () => {
//       fetchBookings(); // ✅ customer ko update milega
//     });

//     socket.on("customer-location", ({ bookingId, lat, lng }) => {
//       setCustomerLocations((prev) => ({ ...prev, [bookingId]: { lat, lng } }));
//     });

//     return () => {
//       socket.off("booking-update");
//       socket.off("customer-location");
//     };
//   }, []);

//   const handleCancel = async (id) => {
//     if (window.confirm("Are you sure to cancel this booking?")) {
//       await cancelBooking(id);
//       fetchBookings();
//     }
//   };

//   const handleBookNow = (camera) => {
//     navigate("/select-dates", { state: { camera, bookings } });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-gray-900 to-black text-white p-8 md:p-12">
//       {/* Available Cameras */}
//       <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-400 mb-8 tracking-wide">
//         Available Cameras
//       </h1>
//       {loadingCameras && <p className="text-gray-300">Loading cameras...</p>}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
//         {cameras.length === 0 && !loadingCameras && <p>No cameras available.</p>}
//         {cameras.map((cam) => (
//           <div
//             key={cam._id}
//             className="bg-gray-800 p-6 rounded-3xl shadow-2xl border border-yellow-500 hover:scale-105 transition-transform duration-300"
//           >
//             <img
//               src={cam.image || "/default-camera.png"}
//               alt={cam.title}
//               className="w-full h-48 object-cover rounded-2xl mb-4"
//             />
//             <h3 className="font-bold text-yellow-400 text-xl mb-2">{cam.title}</h3>
//             <p className="text-gray-300 mb-2">{cam.description}</p>
//             <p className="text-yellow-300 font-semibold text-lg mb-4">
//               ₹{cam.pricePerDay} / day
//             </p>
//             <button
//               className="w-full py-2 bg-yellow-400 text-black rounded-xl font-bold hover:bg-yellow-300 transition-colors"
//               onClick={() => handleBookNow(cam)}
//             >
//               Book Now
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* My Bookings */}
//       <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-400 mb-8 tracking-wide">
//         My Bookings
//       </h1>
//       {loadingBookings && <p className="text-gray-300">Loading bookings...</p>}
//       {!loadingBookings && bookings.length === 0 && <p>No bookings yet.</p>}

//       <div className="grid gap-8">
//         {bookings.map((b) => (
//           <div
//             key={b._id}
//             className="bg-yellow-400/20 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-yellow-500 hover:shadow-2xl transition-shadow"
//           >
//             <div className="flex flex-col md:flex-row items-center gap-6">
//               <img
//                 src={b.camera?.image || "/default-camera.png"}
//                 alt={b.camera?.title}
//                 className="w-32 h-32 object-cover rounded-2xl"
//               />
//               <div className="flex-1">
//                 <h3 className="font-bold text-xl md:text-2xl mb-1">{b.customerName}</h3>
//                 <p className="text-gray-200 mb-1">{b.camera?.title}</p>
//                 <p className="text-gray-300 mb-1">
//                   {new Date(b.startDate).toLocaleDateString()} -{" "}
//                   {new Date(b.endDate).toLocaleDateString()}
//                 </p>
//                 <p className="text-gray-200 mb-1 font-semibold">₹{b.totalPrice}</p>
//                 <p className="text-gray-200 mb-2">Status: {b.paymentStatus}</p>

//                 <LiveTracking bookingId={b._id} />

//                 {/* Live Map */}
//                 {customerLocations[b._id] && (
//                   <div className="mt-4 h-64 w-full md:w-96 rounded-2xl overflow-hidden border-2 border-yellow-400 shadow-lg">
//                     <MapContainer
//                       center={[customerLocations[b._id].lat, customerLocations[b._id].lng]}
//                       zoom={15}
//                       style={{ height: "100%", width: "100%" }}
//                     >
//                       <TileLayer
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         attribution="© OpenStreetMap contributors"
//                       />
//                       <Marker
//                         position={[customerLocations[b._id].lat, customerLocations[b._id].lng]}
//                         icon={defaultIcon}
//                       >
//                         <Popup>📍 Customer is here</Popup>
//                       </Marker>
//                     </MapContainer>
//                   </div>
//                 )}
//               </div>
//             </div>
//             <button
//               className="mt-4 px-6 py-2 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-500 transition-colors"
//               onClick={() => handleCancel(b._id)}
//             >
//               Cancel Booking
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { getBookings, cancelBooking, getCameras } from "../Utils/api";
// import { useNavigate } from "react-router-dom";
// import io from "socket.io-client";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import LiveTracking from "../Components/Livecation";

// const socket = io("http://localhost:5000");

// // ✅ Fix default Leaflet icon bug
// const defaultIcon = new L.Icon({
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// export default function CustomerDashboard() {
//   const [bookings, setBookings] = useState([]);
//   const [cameras, setCameras] = useState([]);
//   const [customerLocations, setCustomerLocations] = useState({});
//   const [loadingBookings, setLoadingBookings] = useState(true);
//   const [loadingCameras, setLoadingCameras] = useState(true);
//   const navigate = useNavigate();

//   // Fetch bookings
//   const fetchBookings = async () => {
//     setLoadingBookings(true);
//     try {
//       const data = await getBookings();
//       setBookings(data);
//     } catch (err) {
//       console.error(err);
//     }
//     setLoadingBookings(false);
//   };

//   // Fetch cameras
//   const fetchCameras = async () => {
//     setLoadingCameras(true);
//     try {
//       const data = await getCameras();
//       setCameras(data);
//     } catch (err) {
//       console.error(err);
//     }
//     setLoadingCameras(false);
//   };

//   useEffect(() => {
//     fetchBookings();
//     fetchCameras();
//   }, []);

//   // Socket.IO for live notifications & locations
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user) return;

//     socket.emit("join-customer", user._id);

//     socket.on("booking-update", () => {
//       fetchBookings(); // ✅ customer ko update milega
//     });

//     socket.on("customer-location", ({ bookingId, lat, lng }) => {
//       setCustomerLocations((prev) => ({ ...prev, [bookingId]: { lat, lng } }));
//     });

//     return () => {
//       socket.off("booking-update");
//       socket.off("customer-location");
//     };
//   }, []);

//   const handleCancel = async (id) => {
//     if (window.confirm("Are you sure to cancel this booking?")) {
//       await cancelBooking(id);
//       fetchBookings();
//     }
//   };

//   const handleBookNow = (camera) => {
//     navigate("/select-dates", { state: { camera, bookings } });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-gray-900 to-black text-white p-8 md:p-12">
//       {/* ✅ Available Cameras */}
//       <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-400 mb-8 tracking-wide">
//         Available Cameras
//       </h1>
//       {loadingCameras && <p className="text-gray-300">Loading cameras...</p>}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
//         {cameras.length === 0 && !loadingCameras && <p>No cameras available.</p>}
//         {cameras.map((cam) => (
//           <div
//             key={cam._id}
//             className="bg-gray-800 p-6 rounded-3xl shadow-2xl border border-yellow-500 hover:scale-105 transition-transform duration-300"
//           >
//             <img
//               src={cam.image || "/default-camera.png"}
//               alt={cam.title}
//               className="w-full h-48 object-cover rounded-2xl mb-4"
//             />
//             <h3 className="font-bold text-yellow-400 text-xl mb-2">{cam.title}</h3>
//             <p className="text-gray-300 mb-2">{cam.description}</p>
//             <p className="text-yellow-300 font-semibold text-lg mb-4">
//               ₹{cam.pricePerDay} / day
//             </p>
//             <button
//               className="w-full py-2 bg-yellow-400 text-black rounded-xl font-bold hover:bg-yellow-300 transition-colors"
//               onClick={() => handleBookNow(cam)}
//             >
//               Book Now
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* ✅ My Bookings */}
//       <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-400 mb-8 tracking-wide">
//         My Bookings
//       </h1>
//       {loadingBookings && <p className="text-gray-300">Loading bookings...</p>}
//       {!loadingBookings && bookings.length === 0 && <p>No bookings yet.</p>}

//       <div className="grid gap-8">
//         {bookings.map((b) => (
//           <div
//             key={b._id}
//             className="bg-yellow-400/20 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-yellow-500 hover:shadow-2xl transition-shadow"
//           >
//             <div className="flex flex-col md:flex-row items-center gap-6">
//               <img
//                 src={b.camera?.image || "/default-camera.png"}
//                 alt={b.camera?.title}
//                 className="w-32 h-32 object-cover rounded-2xl"
//               />
//               <div className="flex-1">
//                 {/* ✅ Customer Profile Info */}
//                 <h3 className="font-bold text-xl md:text-2xl mb-1">
//                   {b.customer?.name || b.customerName}
//                 </h3>
//                 <p className="text-gray-300 mb-1">🆔 {b.customer?._id}</p>
//                 <p className="text-gray-300 mb-1">📧 {b.customer?.email}</p>

//                 {/* ✅ Booking & Camera Info */}
//                 <p className="text-gray-200 mb-1">{b.camera?.title}</p>
//                 <p className="text-gray-300 mb-1">
//                   {new Date(b.startDate).toLocaleDateString()} -{" "}
//                   {new Date(b.endDate).toLocaleDateString()}
//                 </p>
//                 <p className="text-gray-200 mb-1 font-semibold">₹{b.totalPrice}</p>
//                 <p className="text-gray-200 mb-2">Status: {b.paymentStatus}</p>

//                 <LiveTracking bookingId={b._id} />

//                 {/* ✅ Live Map */}
//                 {customerLocations[b._id] && (
//                   <div className="mt-4 h-64 w-full md:w-96 rounded-2xl overflow-hidden border-2 border-yellow-400 shadow-lg">
//                     <MapContainer
//                       center={[customerLocations[b._id].lat, customerLocations[b._id].lng]}
//                       zoom={15}
//                       style={{ height: "100%", width: "100%" }}
//                     >
//                       <TileLayer
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         attribution="© OpenStreetMap contributors"
//                       />
//                       <Marker
//                         position={[customerLocations[b._id].lat, customerLocations[b._id].lng]}
//                         icon={defaultIcon}
//                       >
//                         <Popup>📍 Customer is here</Popup>
//                       </Marker>
//                     </MapContainer>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <button
//               className="mt-4 px-6 py-2 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-500 transition-colors"
//               onClick={() => handleCancel(b._id)}
//             >
//               Cancel Booking
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { getBookings, cancelBooking, getCameras } from "../Utils/api";
// import { useNavigate } from "react-router-dom";
// import io from "socket.io-client";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import LiveTracking from "../Components/Livecation";

// const socket = io("http://localhost:5000");

// // ✅ Fix default Leaflet icon bug
// const defaultIcon = new L.Icon({
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// export default function CustomerDashboard() {
//   const [bookings, setBookings] = useState([]);
//   const [cameras, setCameras] = useState([]);
//   const [customerLocations, setCustomerLocations] = useState({});
//   const [loadingBookings, setLoadingBookings] = useState(true);
//   const [loadingCameras, setLoadingCameras] = useState(true);
//   const [user, setUser] = useState(null); // ✅ Profile user state
//   const navigate = useNavigate();

//   // Fetch bookings
//   const fetchBookings = async () => {
//     setLoadingBookings(true);
//     try {
//       const data = await getBookings();
//       setBookings(data);
//     } catch (err) {
//       console.error(err);
//     }
//     setLoadingBookings(false);
//   };

//   // Fetch cameras
//   const fetchCameras = async () => {
//     setLoadingCameras(true);
//     try {
//       const data = await getCameras();
//       setCameras(data);
//     } catch (err) {
//       console.error(err);
//     }
//     setLoadingCameras(false);
//   };

//   useEffect(() => {
//     fetchBookings();
//     fetchCameras();

//     // ✅ Load user profile from localStorage
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) setUser(storedUser);
//   }, []);

//   // Socket.IO for live notifications & locations
//   useEffect(() => {
//     if (!user) return;

//     socket.emit("join-customer", user._id);

//     socket.on("booking-update", () => {
//       fetchBookings();
//     });

//     socket.on("customer-location", ({ bookingId, lat, lng }) => {
//       setCustomerLocations((prev) => ({ ...prev, [bookingId]: { lat, lng } }));
//     });

//     return () => {
//       socket.off("booking-update");
//       socket.off("customer-location");
//     };
//   }, [user]);

//   const handleCancel = async (id) => {
//     if (window.confirm("Are you sure to cancel this booking?")) {
//       await cancelBooking(id);
//       fetchBookings();
//     }
//   };

//   const handleBookNow = (camera) => {
//     navigate("/select-dates", { state: { camera, bookings } });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-gray-900 to-black text-white p-8 md:p-12">
      
//       {/* ✅ Customer Profile Section */}
//       {user && (
//         <div className="bg-gray-800 p-6 rounded-3xl shadow-xl border border-yellow-500 mb-12 flex items-center gap-6">
//           <img
//             src={user.avatar || "/default-avatar.png"}
//             alt={user.name}
//             className="w-24 h-24 rounded-full border-4 border-yellow-400 object-cover"
//           />
//           <div>
//             <h2 className="text-2xl font-bold text-yellow-400">{user.name}</h2>
//             <p className="text-gray-300">📧 {user.email}</p>
//             {user.phone && <p className="text-gray-300">📞 {user.phone}</p>}
//             <p className="text-gray-400 mt-2">Customer ID: {user._id}</p>
//           </div>
//         </div>
//       )}

//       {/* ✅ Available Cameras */}
//       <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-400 mb-8 tracking-wide">
//         Available Cameras
//       </h1>
//       {loadingCameras && <p className="text-gray-300">Loading cameras...</p>}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
//         {cameras.length === 0 && !loadingCameras && <p>No cameras available.</p>}
//         {cameras.map((cam) => (
//           <div
//             key={cam._id}
//             className="bg-gray-800 p-6 rounded-3xl shadow-2xl border border-yellow-500 hover:scale-105 transition-transform duration-300"
//           >
//             <img
//               src={cam.image || "/default-camera.png"}
//               alt={cam.title}
//               className="w-full h-48 object-cover rounded-2xl mb-4"
//             />
//             <h3 className="font-bold text-yellow-400 text-xl mb-2">{cam.title}</h3>
//             <p className="text-gray-300 mb-2">{cam.description}</p>
//             <p className="text-yellow-300 font-semibold text-lg mb-4">
//               ₹{cam.pricePerDay} / day
//             </p>
//             <button
//               className="w-full py-2 bg-yellow-400 text-black rounded-xl font-bold hover:bg-yellow-300 transition-colors"
//               onClick={() => handleBookNow(cam)}
//             >
//               Book Now
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* ✅ My Bookings */}
//       <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-400 mb-8 tracking-wide">
//         My Bookings
//       </h1>
//       {loadingBookings && <p className="text-gray-300">Loading bookings...</p>}
//       {!loadingBookings && bookings.length === 0 && <p>No bookings yet.</p>}

//       <div className="grid gap-8">
//         {bookings.map((b) => (
//           <div
//             key={b._id}
//             className="bg-yellow-400/20 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-yellow-500 hover:shadow-2xl transition-shadow"
//           >
//             <div className="flex flex-col md:flex-row items-center gap-6">
//               <img
//                 src={b.camera?.image || "/default-camera.png"}
//                 alt={b.camera?.title}
//                 className="w-32 h-32 object-cover rounded-2xl"
//               />
//               <div className="flex-1">
//                 <h3 className="font-bold text-xl md:text-2xl mb-1">
//                   {b.customer?.name || b.customerName}
//                 </h3>
//                 <p className="text-gray-300 mb-1">🆔 {b.customer?._id}</p>
//                 <p className="text-gray-300 mb-1">📧 {b.customer?.email}</p>

//                 <p className="text-gray-200 mb-1">{b.camera?.title}</p>
//                 <p className="text-gray-300 mb-1">
//                   {new Date(b.startDate).toLocaleDateString()} -{" "}
//                   {new Date(b.endDate).toLocaleDateString()}
//                 </p>
//                 <p className="text-gray-200 mb-1 font-semibold">₹{b.totalPrice}</p>
//                 <p className="text-gray-200 mb-2">Status: {b.paymentStatus}</p>

//                 <LiveTracking bookingId={b._id} />

//                 {customerLocations[b._id] && (
//                   <div className="mt-4 h-64 w-full md:w-96 rounded-2xl overflow-hidden border-2 border-yellow-400 shadow-lg">
//                     <MapContainer
//                       center={[customerLocations[b._id].lat, customerLocations[b._id].lng]}
//                       zoom={15}
//                       style={{ height: "100%", width: "100%" }}
//                     >
//                       <TileLayer
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         attribution="© OpenStreetMap contributors"
//                       />
//                       <Marker
//                         position={[customerLocations[b._id].lat, customerLocations[b._id].lng]}
//                         icon={defaultIcon}
//                       >
//                         <Popup>📍 Customer is here</Popup>
//                       </Marker>
//                     </MapContainer>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <button
//               className="mt-4 px-6 py-2 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-500 transition-colors"
//               onClick={() => handleCancel(b._id)}
//             >
//               Cancel Booking
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { getBookings, cancelBooking, getCameras } from "../Utils/api";
// import { useNavigate } from "react-router-dom";
// import io from "socket.io-client";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import LiveTracking from "../Components/Livecation";

// const socket = io("http://localhost:5000");

// // ✅ Fix default Leaflet icon bug
// const defaultIcon = new L.Icon({
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// export default function CustomerDashboard() {
//   const [bookings, setBookings] = useState([]);
//   const [cameras, setCameras] = useState([]);
//   const [customerLocations, setCustomerLocations] = useState({});
//   const [loadingBookings, setLoadingBookings] = useState(true);
//   const [loadingCameras, setLoadingCameras] = useState(true);
//   const [user, setUser] = useState(null); // ✅ Profile user state
//   const navigate = useNavigate();

//   // Fetch bookings
//   const fetchBookings = async () => {
//     setLoadingBookings(true);
//     try {
//       const data = await getBookings();
//       setBookings(data);
//     } catch (err) {
//       console.error(err);
//     }
//     setLoadingBookings(false);
//   };

//   // Fetch cameras
//   const fetchCameras = async () => {
//     setLoadingCameras(true);
//     try {
//       const data = await getCameras();
//       setCameras(data);
//     } catch (err) {
//       console.error(err);
//     }
//     setLoadingCameras(false);
//   };

//   useEffect(() => {
//     fetchBookings();
//     fetchCameras();

//     // ✅ Load user profile from localStorage
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) setUser(storedUser);
//   }, []);

//   // Socket.IO for live notifications & locations
//   useEffect(() => {
//     if (!user) return;

//     socket.emit("join-customer", user._id);

//     socket.on("booking-update", () => {
//       fetchBookings();
//     });

//     socket.on("customer-location", ({ bookingId, lat, lng }) => {
//       setCustomerLocations((prev) => ({ ...prev, [bookingId]: { lat, lng } }));
//     });

//     return () => {
//       socket.off("booking-update");
//       socket.off("customer-location");
//     };
//   }, [user]);

//   const handleCancel = async (id) => {
//     if (window.confirm("Are you sure to cancel this booking?")) {
//       await cancelBooking(id);
//       fetchBookings();
//     }
//   };

//   const handleBookNow = (camera) => {
//     navigate("/select-dates", { state: { camera, bookings } });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-gray-900 to-black text-white p-8 md:p-12">
      
//       {/* ✅ Customer Profile Section */}
//       {user && (
//         <div className="bg-gray-800 p-6 rounded-3xl shadow-xl border border-yellow-500 mb-12 flex items-center gap-6">
//           <img
//             src={user.avatar || "/default-avatar.png"}
//             alt={user.name}
//             className="w-24 h-24 rounded-full border-4 border-yellow-400 object-cover"
//           />
//           <div>
//             <h2 className="text-2xl font-bold text-yellow-400">{user.name}</h2>
//             <p className="text-gray-300">📧 {user.email}</p>
//             {user.phone && <p className="text-gray-300">📞 {user.phone}</p>}
//             {user.address && <p className="text-gray-300">🏠 {user.address}</p>}
//             <p className="text-gray-400 mt-2">Customer ID: {user._id}</p>
//           </div>
//         </div>
//       )}

//       {/* ✅ Available Cameras */}
//       <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-400 mb-8 tracking-wide">
//         Available Cameras
//       </h1>
//       {loadingCameras && <p className="text-gray-300">Loading cameras...</p>}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
//         {cameras.length === 0 && !loadingCameras && <p>No cameras available.</p>}
//         {cameras.map((cam) => (
//           <div
//             key={cam._id}
//             className="bg-gray-800 p-6 rounded-3xl shadow-2xl border border-yellow-500 hover:scale-105 transition-transform duration-300"
//           >
//             <img
//               src={cam.image || "/default-camera.png"}
//               alt={cam.title}
//               className="w-full h-48 object-cover rounded-2xl mb-4"
//             />
//             <h3 className="font-bold text-yellow-400 text-xl mb-2">{cam.title}</h3>
//             <p className="text-gray-300 mb-2">{cam.description}</p>
//             <p className="text-yellow-300 font-semibold text-lg mb-4">
//               ₹{cam.pricePerDay} / day
//             </p>
//             <button
//               className="w-full py-2 bg-yellow-400 text-black rounded-xl font-bold hover:bg-yellow-300 transition-colors"
//               onClick={() => handleBookNow(cam)}
//             >
//               Book Now
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* ✅ My Bookings */}
//       <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-400 mb-8 tracking-wide">
//         My Bookings
//       </h1>
//       {loadingBookings && <p className="text-gray-300">Loading bookings...</p>}
//       {!loadingBookings && bookings.length === 0 && <p>No bookings yet.</p>}

//       <div className="grid gap-8">
//         {bookings.map((b) => (
//           <div
//             key={b._id}
//             className="bg-yellow-400/20 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-yellow-500 hover:shadow-2xl transition-shadow"
//           >
//             <div className="flex flex-col md:flex-row items-center gap-6">
//               <img
//                 src={b.camera?.image || "/default-camera.png"}
//                 alt={b.camera?.title}
//                 className="w-32 h-32 object-cover rounded-2xl"
//               />
//               <div className="flex-1">
//                 <h3 className="font-bold text-xl md:text-2xl mb-1">
//                   {b.customer?.name || b.customerName}
//                 </h3>
//                 <p className="text-gray-300 mb-1">🆔 {b.customer?._id}</p>
//                 <p className="text-gray-300 mb-1">📧 {b.customer?.email}</p>

//                 <p className="text-gray-200 mb-1">{b.camera?.title}</p>
//                 <p className="text-gray-300 mb-1">
//                   {new Date(b.startDate).toLocaleDateString()} -{" "}
//                   {new Date(b.endDate).toLocaleDateString()}
//                 </p>
//                 <p className="text-gray-200 mb-1 font-semibold">₹{b.totalPrice}</p>
//                 <p className="text-gray-200 mb-2">Status: {b.paymentStatus}</p>

//                 <LiveTracking bookingId={b._id} />

//                 {customerLocations[b._id] && (
//                   <div className="mt-4 h-64 w-full md:w-96 rounded-2xl overflow-hidden border-2 border-yellow-400 shadow-lg">
//                     <MapContainer
//                       center={[customerLocations[b._id].lat, customerLocations[b._id].lng]}
//                       zoom={15}
//                       style={{ height: "100%", width: "100%" }}
//                     >
//                       <TileLayer
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         attribution="© OpenStreetMap contributors"
//                       />
//                       <Marker
//                         position={[customerLocations[b._id].lat, customerLocations[b._id].lng]}
//                         icon={defaultIcon}
//                       >
//                         <Popup>📍 Customer is here</Popup>
//                       </Marker>
//                     </MapContainer>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <button
//               className="mt-4 px-6 py-2 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-500 transition-colors"
//               onClick={() => handleCancel(b._id)}
//             >
//               Cancel Booking
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
































// import { useEffect, useState } from "react";
// import { getBookings, cancelBooking, getCameras, getProfile, updateProfile } from "../Utils/api";
// import { useNavigate } from "react-router-dom";
// import io from "socket.io-client";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import LiveTracking from "../Components/Livecation";

// const socket = io("http://localhost:5000");

// const defaultIcon = new L.Icon({
//   iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// export default function CustomerDashboard() {
//   const [bookings, setBookings] = useState([]);
//   const [cameras, setCameras] = useState([]);
//   const [customerLocations, setCustomerLocations] = useState({});
//   const [loadingBookings, setLoadingBookings] = useState(true);
//   const [loadingCameras, setLoadingCameras] = useState(true);
//   const [user, setUser] = useState(null);
//   const [editing, setEditing] = useState(false);
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [avatarFile, setAvatarFile] = useState(null);

//   const navigate = useNavigate();

//   const fetchBookings = async () => {
//     setLoadingBookings(true);
//     try {
//       const data = await getBookings();
//       setBookings(data);
//     } catch (err) {
//       console.error(err);
//     }
//     setLoadingBookings(false);
//   };

//   const fetchCameras = async () => {
//     setLoadingCameras(true);
//     try {
//       const data = await getCameras();
//       setCameras(data);
//     } catch (err) {
//       console.error(err);
//     }
//     setLoadingCameras(false);
//   };

//   // ✅ Fetch profile from API
//   const fetchProfile = async () => {
//     try {
//       const res = await getProfile();
//       setUser(res.data);
//       setName(res.data.name || "");
//       setPhone(res.data.phone || "");
//       setAddress(res.data.address || "");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//     fetchCameras();
//     fetchProfile();
//   }, []);

//   useEffect(() => {
//     if (!user) return;

//     socket.emit("join-customer", user._id);

//     socket.on("booking-update", () => {
//       fetchBookings();
//     });

//     socket.on("customer-location", ({ bookingId, lat, lng }) => {
//       setCustomerLocations((prev) => ({ ...prev, [bookingId]: { lat, lng } }));
//     });

//     return () => {
//       socket.off("booking-update");
//       socket.off("customer-location");
//     };
//   }, [user]);

//   const handleCancel = async (id) => {
//     if (window.confirm("Are you sure to cancel this booking?")) {
//       await cancelBooking(id);
//       fetchBookings();
//     }
//   };

//   const handleBookNow = (camera) => {
//     navigate("/select-dates", { state: { camera, bookings } });
//   };

//   // ✅ Profile update handler
//   const handleProfileSave = async () => {
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("phone", phone);
//     formData.append("address", address);
//     if (avatarFile) formData.append("avatar", avatarFile);

//     try {
//       const res = await updateProfile(formData);
//       setUser(res.data);
//       setEditing(false);
//       alert("Profile updated successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update profile.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-gray-900 to-black text-white p-8 md:p-12">
      
//       {/* ✅ Customer Profile Section */}
//       {user && (
//         <div className="bg-gray-800 p-6 rounded-3xl shadow-xl border border-yellow-500 mb-12 flex flex-col md:flex-row items-center gap-6">
//           <img
//             src={avatarFile ? URL.createObjectURL(avatarFile) : user.avatar || "/default-avatar.png"}
//             alt={user.name}
//             className="w-24 h-24 rounded-full border-4 border-yellow-400 object-cover"
//           />
//           <div className="flex-1">
//             {!editing ? (
//               <>
//                 <h2 className="text-2xl font-bold text-yellow-400">{user.name}</h2>
//                 <p className="text-gray-300">📧 {user.email}</p>
//                 {user.phone && <p className="text-gray-300">📞 {user.phone}</p>}
//                 {user.address && <p className="text-gray-300">🏠 {user.address}</p>}
//                 <p className="text-gray-400 mt-2">Customer ID: {user._id}</p>
//                 <button
//                   className="mt-4 px-4 py-2 bg-yellow-400 text-black rounded-xl font-bold hover:bg-yellow-300"
//                   onClick={() => setEditing(true)}
//                 >
//                   Edit Profile
//                 </button>
//               </>
//             ) : (
//               <div className="flex flex-col gap-2">
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="p-2 rounded-lg text-black"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Phone"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   className="p-2 rounded-lg text-black"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Address"
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                   className="p-2 rounded-lg text-black"
//                 />
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => setAvatarFile(e.target.files[0])}
//                   className="mt-2"
//                 />
//                 <div className="flex gap-2 mt-2">
//                   <button
//                     className="px-4 py-2 bg-green-500 text-black rounded-xl font-bold hover:bg-green-400"
//                     onClick={handleProfileSave}
//                   >
//                     Save
//                   </button>
//                   <button
//                     className="px-4 py-2 bg-red-500 text-black rounded-xl font-bold hover:bg-red-400"
//                     onClick={() => setEditing(false)}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* ✅ Available Cameras */}
//       <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-400 mb-8 tracking-wide">
//         Available Cameras
//       </h1>
//       {loadingCameras && <p className="text-gray-300">Loading cameras...</p>}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
//         {cameras.length === 0 && !loadingCameras && <p>No cameras available.</p>}
//         {cameras.map((cam) => (
//           <div
//             key={cam._id}
//             className="bg-gray-800 p-6 rounded-3xl shadow-2xl border border-yellow-500 hover:scale-105 transition-transform duration-300"
//           >
//             <img
//               src={cam.image || "/default-camera.png"}
//               alt={cam.title}
//               className="w-full h-48 object-cover rounded-2xl mb-4"
//             />
//             <h3 className="font-bold text-yellow-400 text-xl mb-2">{cam.title}</h3>
//             <p className="text-gray-300 mb-2">{cam.description}</p>
//             <p className="text-yellow-300 font-semibold text-lg mb-4">
//               ₹{cam.pricePerDay} / day
//             </p>
//             <button
//               className="w-full py-2 bg-yellow-400 text-black rounded-xl font-bold hover:bg-yellow-300 transition-colors"
//               onClick={() => handleBookNow(cam)}
//             >
//               Book Now
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* ✅ My Bookings */}
//       <h1 className="text-3xl md:text-4xl font-extrabold text-yellow-400 mb-8 tracking-wide">
//         My Bookings
//       </h1>
//       {loadingBookings && <p className="text-gray-300">Loading bookings...</p>}
//       {!loadingBookings && bookings.length === 0 && <p>No bookings yet.</p>}

//       <div className="grid gap-8">
//         {bookings.map((b) => (
//           <div
//             key={b._id}
//             className="bg-yellow-400/20 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-yellow-500 hover:shadow-2xl transition-shadow"
//           >
//             <div className="flex flex-col md:flex-row items-center gap-6">
//               <img
//                 src={b.camera?.image || "/default-camera.png"}
//                 alt={b.camera?.title}
//                 className="w-32 h-32 object-cover rounded-2xl"
//               />
//               <div className="flex-1">
//                 <h3 className="font-bold text-xl md:text-2xl mb-1">
//                   {b.customer?.name || b.customerName}
//                 </h3>
//                 <p className="text-gray-300 mb-1">🆔 {b.customer?._id}</p>
//                 <p className="text-gray-300 mb-1">📧 {b.customer?.email}</p>

//                 <p className="text-gray-200 mb-1">{b.camera?.title}</p>
//                 <p className="text-gray-300 mb-1">
//                   {new Date(b.startDate).toLocaleDateString()} -{" "}
//                   {new Date(b.endDate).toLocaleDateString()}
//                 </p>
//                 <p className="text-gray-200 mb-1 font-semibold">₹{b.totalPrice}</p>
//                 <p className="text-gray-200 mb-2">Status: {b.paymentStatus}</p>

//                 <LiveTracking bookingId={b._id} />

//                 {customerLocations[b._id] && (
//                   <div className="mt-4 h-64 w-full md:w-96 rounded-2xl overflow-hidden border-2 border-yellow-400 shadow-lg">
//                     <MapContainer
//                       center={[customerLocations[b._id].lat, customerLocations[b._id].lng]}
//                       zoom={15}
//                       style={{ height: "100%", width: "100%" }}
//                     >
//                       <TileLayer
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         attribution="© OpenStreetMap contributors"
//                       />
//                       <Marker
//                         position={[customerLocations[b._id].lat, customerLocations[b._id].lng]}
//                         icon={defaultIcon}
//                       >
//                         <Popup>📍 Customer is here</Popup>
//                       </Marker>
//                     </MapContainer>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <button
//               className="mt-4 px-6 py-2 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-500 transition-colors"
//               onClick={() => handleCancel(b._id)}
//             >
//               Cancel Booking
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }











import { useEffect, useState } from "react";
import { getBookings, cancelBooking, getCameras, getProfile, updateProfile } from "../Utils/api";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import LiveTracking from "../Components/Livecation";

const socket = io("http://localhost:5000");

const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function CustomerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [cameras, setCameras] = useState([]);
  const [customerLocations, setCustomerLocations] = useState({});
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingCameras, setLoadingCameras] = useState(true);
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);

  const navigate = useNavigate();

  const fetchBookings = async () => {
    setLoadingBookings(true);
    try {
      const data = await getBookings();
      setBookings(data);
    } catch (err) {
      console.error(err);
    }
    setLoadingBookings(false);
  };

  const fetchCameras = async () => {
    setLoadingCameras(true);
    try {
      const data = await getCameras();
      setCameras(data);
    } catch (err) {
      console.error(err);
    }
    setLoadingCameras(false);
  };

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      setUser(res.data);
      setName(res.data.name || "");
      setPhone(res.data.phone || "");
      setAddress(res.data.address || "");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchCameras();
    fetchProfile();
  }, []);

  useEffect(() => {
    if (!user) return;

    socket.emit("join-customer", user._id);

    socket.on("booking-update", () => {
      fetchBookings();
    });

    socket.on("customer-location", ({ bookingId, lat, lng }) => {
      setCustomerLocations((prev) => ({ ...prev, [bookingId]: { lat, lng } }));
    });

    return () => {
      socket.off("booking-update");
      socket.off("customer-location");
    };
  }, [user]);

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure to cancel this booking?")) {
      await cancelBooking(id);
      fetchBookings();
    }
  };

  const handleBookNow = (camera) => {
    navigate("/select-dates", { state: { camera, bookings } });
  };

  const handleProfileSave = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("address", address);
    if (avatarFile) formData.append("avatar", avatarFile);

    try {
      const res = await updateProfile(formData);
      setUser(res.data);
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 text-gray-800 p-8 md:p-12">
      
      {/* ✅ Customer Profile Section */}
      {user && (
        <div className="backdrop-blur-xl bg-white/70 p-6 rounded-3xl shadow-2xl border border-indigo-300 mb-12 flex flex-col md:flex-row items-center gap-6">
          <img
            src={avatarFile ? URL.createObjectURL(avatarFile) : user.avatar || "/default-avatar.png"}
            alt={user.name}
            className="w-24 h-24 rounded-full border-4 border-indigo-400 object-cover"
          />
          <div className="flex-1">
            {!editing ? (
              <>
                <h2 className="text-2xl font-bold text-indigo-600">{user.name}</h2>
                <p className="text-gray-600">📧 {user.email}</p>
                {user.phone && <p className="text-gray-600">📞 {user.phone}</p>}
                {user.address && <p className="text-gray-600">🏠 {user.address}</p>}
                <p className="text-gray-500 mt-2">Customer ID: {user._id}</p>
                <button
                  className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-xl font-bold hover:bg-indigo-400"
                  onClick={() => setEditing(true)}
                >
                  Edit Profile
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-2 rounded-lg border border-gray-300"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="p-2 rounded-lg border border-gray-300"
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="p-2 rounded-lg border border-gray-300"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAvatarFile(e.target.files[0])}
                  className="mt-2"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-xl font-bold hover:bg-green-400"
                    onClick={handleProfileSave}
                  >
                    Save
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-xl font-bold hover:bg-red-400"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ✅ Available Cameras */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 mb-8 tracking-wide">
        Available Cameras
      </h1>
      {loadingCameras && <p className="text-gray-600">Loading cameras...</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
        {cameras.length === 0 && !loadingCameras && <p>No cameras available.</p>}
        {cameras.map((cam) => (
          <div
            key={cam._id}
            className="bg-white p-6 rounded-3xl shadow-xl border border-indigo-200 hover:scale-105 transition-transform duration-300"
          >
            <img
              src={cam.image || "/default-camera.png"}
              alt={cam.title}
              className="w-full h-48 object-cover rounded-2xl mb-4"
            />
            <h3 className="font-bold text-indigo-600 text-xl mb-2">{cam.title}</h3>
            <p className="text-gray-600 mb-2">{cam.description}</p>
            <p className="text-indigo-500 font-semibold text-lg mb-4">
              ₹{cam.pricePerDay} / day
            </p>
            <button
              className="w-full py-2 bg-pink-500 text-white rounded-xl font-bold hover:bg-pink-400 transition-colors"
              onClick={() => handleBookNow(cam)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* ✅ My Bookings */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-700 mb-8 tracking-wide">
        My Bookings
      </h1>
      {loadingBookings && <p className="text-gray-600">Loading bookings...</p>}
      {!loadingBookings && bookings.length === 0 && <p>No bookings yet.</p>}

      <div className="grid gap-8">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-lg border border-indigo-200"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                src={b.camera?.image || "/default-camera.png"}
                alt={b.camera?.title}
                className="w-32 h-32 object-cover rounded-2xl"
              />
              <div className="flex-1">
                <h3 className="font-bold text-xl md:text-2xl mb-1 text-indigo-600">
                  {b.customer?.name || b.customerName}
                </h3>
                <p className="text-gray-600 mb-1">🆔 {b.customer?._id}</p>
                <p className="text-gray-600 mb-1">📧 {b.customer?.email}</p>

                <p className="text-gray-700 mb-1">{b.camera?.title}</p>
                <p className="text-gray-600 mb-1">
                  {new Date(b.startDate).toLocaleDateString()} -{" "}
                  {new Date(b.endDate).toLocaleDateString()}
                </p>
                <p className="text-indigo-500 font-semibold mb-1">₹{b.totalPrice}</p>
                <p className="text-gray-600 mb-2">Status: {b.paymentStatus}</p>

                <LiveTracking bookingId={b._id} />

                {customerLocations[b._id] && (
                  <div className="mt-4 h-64 w-full md:w-96 rounded-2xl overflow-hidden border-2 border-indigo-400 shadow-md">
                    <MapContainer
                      center={[customerLocations[b._id].lat, customerLocations[b._id].lng]}
                      zoom={15}
                      style={{ height: "100%", width: "100%" }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="© OpenStreetMap contributors"
                      />
                      <Marker
                        position={[customerLocations[b._id].lat, customerLocations[b._id].lng]}
                        icon={defaultIcon}
                      >
                        <Popup>📍 Customer is here</Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                )}
              </div>
            </div>

            <button
              className="mt-4 px-6 py-2 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-400 transition-colors"
              onClick={() => handleCancel(b._id)}
            >
              Cancel Booking
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

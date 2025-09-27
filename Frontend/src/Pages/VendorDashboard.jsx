







// import React, { useState, useEffect } from "react";
// import {
//   getVendorCameras,
//   addCamera,
//   updateCamera,
//   deleteCamera,
//   getVendorBookings,
//   acceptBooking,
//   rejectBooking,
// } from "../Utils/api";
// import io from "socket.io-client";
// import VendorLiveMap from "../Components/VenderLLive";

// const socket = io("http://localhost:5000");

// export default function VendorDashboard() {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     pricePerDay: "",
//     image: "",
//   });
//   const [cameras, setCameras] = useState([]);
//   const [editing, setEditing] = useState(null);
//   const [vendor, setVendor] = useState(null);
//   const [notifications, setNotifications] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [totalBookings, setTotalBookings] = useState(0);
//   const [selectedBooking, setSelectedBooking] = useState(null);

//   // Fetch vendor cameras
//   const fetchCameras = async () => {
//     const data = await getVendorCameras();
//     const user = JSON.parse(localStorage.getItem("user"));
//     setVendor(user);
//     setCameras(data);
//   };

//   // Fetch vendor bookings
//   const fetchBookings = async () => {
//     try {
//       const data = await getVendorBookings();
//       setBookings(data);
//       setTotalBookings(data.length);
//     } catch (err) {
//       console.error("Error fetching vendor bookings:", err);
//     }
//   };

//   // Socket.IO
//   useEffect(() => {
//     fetchCameras();
//     fetchBookings();

//     const handleNewBooking = (booking) => {
//       setNotifications((prev) => [...prev, booking]);
//       fetchBookings();
//       alert(
//         `📢 New booking from ${booking.customerName} for ${booking.cameraTitle}`
//       );
//     };

//     socket.on("new-booking", handleNewBooking);

//     return () => {
//       socket.off("new-booking", handleNewBooking);
//     };
//   }, []);

//   // Add / Update camera
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editing) await updateCamera(editing._id, form);
//       else await addCamera(form);
//       setForm({ title: "", description: "", pricePerDay: "", image: "" });
//       setEditing(null);
//       fetchCameras();
//     } catch (err) {
//       console.error("Camera API error:", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this camera?")) return;
//     try {
//       await deleteCamera(id);
//       fetchCameras();
//     } catch (err) {
//       console.error("Delete error:", err);
//     }
//   };

//   const handleEdit = (cam) => {
//     setEditing(cam);
//     setForm({
//       title: cam.title,
//       description: cam.description,
//       pricePerDay: cam.pricePerDay,
//       image: cam.image,
//     });
//   };

//   // Accept / Reject booking
//   const handleAccept = async (id) => {
//     await acceptBooking(id);
//     fetchBookings();
//   };

//   const handleReject = async (id) => {
//     await rejectBooking(id);
//     fetchBookings();
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-gray-900 to-black text-white p-8 md:p-12">
//       {/* Vendor Info */}
//       {vendor && (
//         <div className="flex items-center gap-6 mb-8 bg-gray-900 border border-yellow-400 rounded-3xl shadow-2xl p-6 max-w-2xl mx-auto">
//           <img
//             src={vendor.avatar || `https://ui-avatars.com/api/?name=${vendor.name}`}
//             className="w-20 h-20 rounded-full border-4 border-yellow-400 object-cover"
//             alt="Vendor"
//           />
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold text-yellow-400">{vendor.name}</h1>
//             <p className="text-gray-300">{vendor.email}</p>
//             <p className="text-yellow-300 font-semibold mt-2">
//               Total Bookings: {totalBookings}
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Camera Form */}
//       <div className="max-w-2xl mx-auto mb-12">
//         <h2 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-400 text-center">
//           {editing ? "Edit Camera" : "Add Camera"}
//         </h2>
//         <form
//           onSubmit={handleSubmit}
//           className="bg-gray-900 border border-yellow-400 p-6 rounded-3xl shadow-2xl"
//         >
//           <input
//             type="text"
//             placeholder="Title"
//             value={form.title}
//             onChange={(e) => setForm({ ...form, title: e.target.value })}
//             className="w-full mb-4 px-3 py-2 bg-black border border-yellow-400 text-white rounded-xl"
//           />
//           <textarea
//             placeholder="Description"
//             value={form.description}
//             onChange={(e) => setForm({ ...form, description: e.target.value })}
//             className="w-full mb-4 px-3 py-2 bg-black border border-yellow-400 text-white rounded-xl"
//           />
//           <input
//             type="number"
//             placeholder="Price per day"
//             value={form.pricePerDay}
//             onChange={(e) => setForm({ ...form, pricePerDay: e.target.value })}
//             className="w-full mb-4 px-3 py-2 bg-black border border-yellow-400 text-white rounded-xl"
//           />
//           <input
//             type="text"
//             placeholder="Image URL"
//             value={form.image}
//             onChange={(e) => setForm({ ...form, image: e.target.value })}
//             className="w-full mb-4 px-3 py-2 bg-black border border-yellow-400 text-white rounded-xl"
//           />
//           <button className="w-full py-2 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 transition">
//             {editing ? "Update Camera" : "Add Camera"}
//           </button>
//         </form>
//       </div>

//       {/* Cameras List */}
//       <div className="max-w-3xl mx-auto mb-12">
//         <h2 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-400 text-center">
//           📷 My Cameras
//         </h2>
//         {cameras.length === 0 && (
//           <p className="text-gray-400 text-center">No cameras added yet.</p>
//         )}
//         {cameras.map((cam) => (
//           <div
//             key={cam._id}
//             className="bg-gray-900 border border-yellow-400 p-4 rounded-2xl mb-4 flex justify-between items-center hover:shadow-2xl transition-shadow"
//           >
//             <div className="flex items-center gap-4">
//               {cam.image && (
//                 <img
//                   src={cam.image}
//                   alt={cam.title}
//                   className="w-20 h-20 rounded-lg object-cover border border-yellow-400"
//                 />
//               )}
//               <div>
//                 <p className="font-semibold text-yellow-300">{cam.title}</p>
//                 <p className="text-gray-300">{cam.description}</p>
//                 <p className="text-yellow-300 font-semibold">₹{cam.pricePerDay}/day</p>
//               </div>
//             </div>
//             <div className="flex gap-2">
//               <button
//                 className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-400"
//                 onClick={() => handleEdit(cam)}
//               >
//                 Edit
//               </button>
//               <button
//                 className="px-3 py-1 bg-red-500 rounded hover:bg-red-400"
//                 onClick={() => handleDelete(cam._id)}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Bookings List */}
//       <div className="max-w-3xl mx-auto mb-12">
//         <h2 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-400 text-center">
//           📦 Bookings
//         </h2>
//         {bookings.length === 0 && (
//           <p className="text-gray-400 text-center">No bookings yet.</p>
//         )}
//         {bookings.map((b) => (
//           <div
//             key={b._id}
//             className="bg-gray-900 border border-yellow-400 p-4 rounded-2xl mb-4 hover:shadow-xl transition-shadow cursor-pointer"
//           >
//             <div className="flex justify-between items-center">
//               <div>
//                 <p className="text-yellow-300 font-semibold">
//                   {b.customer?.name || b.customerName}
//                 </p>
//                 <p className="text-gray-300">
//                   booked {b.camera?.title || b.cameraTitle}
//                 </p>
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   className="px-3 py-1 bg-green-500 rounded hover:bg-green-400"
//                   onClick={() => handleAccept(b._id)}
//                 >
//                   Accept
//                 </button>
//                 <button
//                   className="px-3 py-1 bg-red-500 rounded hover:bg-red-400"
//                   onClick={() => handleReject(b._id)}
//                 >
//                   Reject
//                 </button>
//               </div>
//             </div>
//             <button
//               className="mt-3 w-full text-left text-gray-200 underline"
//               onClick={() => setSelectedBooking(b)}
//             >
//               View Live Map
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Notifications */}
//       <div className="max-w-3xl mx-auto mb-12">
//         <h2 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-400 text-center">
//           📢 Notifications
//         </h2>
//         {notifications.length === 0 && (
//           <div className="bg-gray-900 border border-yellow-400 p-4 rounded-2xl text-gray-400 text-center">
//             No new notifications
//           </div>
//         )}
//         {notifications.map((note, idx) => (
//           <div
//             key={idx}
//             className="bg-gray-900 border border-yellow-400 p-4 rounded-2xl mb-2 text-white"
//           >
//             <span className="text-yellow-300 font-semibold">
//               {note.customerName}
//             </span>{" "}
//             booked{" "}
//             <span className="text-yellow-300 font-semibold">{note.cameraTitle}</span>
//           </div>
//         ))}
//       </div>

//       {/* Selected Booking Live Map */}
//       {selectedBooking && <VendorLiveMap bookingId={selectedBooking._id} />}
//     </div>
//   );
// }



// working code




// //  working code 2
// import React, { useState, useEffect } from "react";
// import {
//   getVendorCameras,
//   addCamera,
//   updateCamera,
//   deleteCamera,
//   getVendorBookings,
//   acceptBooking,
//   rejectBooking,
// } from "../Utils/api";
// import io from "socket.io-client";
// import VendorLiveMap from "../Components/VenderLLive";

// const socket = io("http://localhost:5000");

// export default function VendorDashboard() {
//   const [form, setForm] = useState({ title: "", description: "", pricePerDay: "", image: "" });
//   const [cameras, setCameras] = useState([]);
//   const [editing, setEditing] = useState(null);
//   const [vendor, setVendor] = useState(null);
//   const [notifications, setNotifications] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [totalBookings, setTotalBookings] = useState(0);
//   const [selectedBooking, setSelectedBooking] = useState(null);

//   const fetchCameras = async () => {
//     const data = await getVendorCameras();
//     const user = JSON.parse(localStorage.getItem("user"));
//     setVendor(user);
//     setCameras(data);
//   };

//   const fetchBookings = async () => {
//     try {
//       const data = await getVendorBookings();
//       setBookings(data);
//       setTotalBookings(data.length);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchCameras();
//     fetchBookings();

//     const handleNewBooking = (booking) => {
//       setNotifications((prev) => [...prev, booking]);
//       fetchBookings();
//       alert(`📢 New booking from ${booking.customerName} for ${booking.cameraTitle}`);
//     };

//     socket.on("new-booking", handleNewBooking);

//     return () => socket.off("new-booking", handleNewBooking);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editing) await updateCamera(editing._id, form);
//       else await addCamera(form);
//       setForm({ title: "", description: "", pricePerDay: "", image: "" });
//       setEditing(null);
//       fetchCameras();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this camera?")) return;
//     try {
//       await deleteCamera(id);
//       fetchCameras();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleEdit = (cam) => {
//     setEditing(cam);
//     setForm({ ...cam });
//   };

//   const handleAccept = async (bookingId) => {
//     try {
//       await acceptBooking(bookingId);
//       alert("Booking accepted!");
//       fetchBookings();
//       setNotifications((prev) => prev.filter((n) => n._id !== bookingId));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleReject = async (bookingId) => {
//     try {
//       await rejectBooking(bookingId);
//       alert("Booking rejected!");
//       fetchBookings();
//       setNotifications((prev) => prev.filter((n) => n._id !== bookingId));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8 md:p-12">
//       {/* Vendor Info */}
//       {vendor && (
//         <div className="flex flex-col md:flex-row items-center gap-6 mb-10 bg-gray-900 border border-yellow-400 rounded-3xl shadow-2xl p-6 max-w-3xl mx-auto">
//           <img
//             src={vendor.avatar || `https://ui-avatars.com/api/?name=${vendor.name}`}
//             className="w-24 h-24 rounded-full border-4 border-yellow-400 object-cover"
//             alt="Vendor"
//           />
//           <div className="text-center md:text-left">
//             <h1 className="text-3xl font-bold text-yellow-400">{vendor.name}</h1>
//             <p className="text-gray-300">{vendor.email}</p>
//             <p className="text-yellow-300 font-semibold mt-2">Total Bookings: {totalBookings}</p>
//           </div>
//         </div>
//       )}

//       {/* Camera Form */}
//       <div className="max-w-3xl mx-auto mb-12">
//         <h2 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-400 text-center">
//           {editing ? "Edit Camera" : "Add Camera"}
//         </h2>
//         <form className="bg-gray-900 border border-yellow-400 p-6 rounded-3xl shadow-2xl" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Title"
//             value={form.title}
//             onChange={(e) => setForm({ ...form, title: e.target.value })}
//             className="w-full mb-4 px-4 py-2 bg-black border border-yellow-400 text-white rounded-xl focus:outline-none"
//           />
//           <textarea
//             placeholder="Description"
//             value={form.description}
//             onChange={(e) => setForm({ ...form, description: e.target.value })}
//             className="w-full mb-4 px-4 py-2 bg-black border border-yellow-400 text-white rounded-xl focus:outline-none"
//           />
//           <input
//             type="number"
//             placeholder="Price per day"
//             value={form.pricePerDay}
//             onChange={(e) => setForm({ ...form, pricePerDay: e.target.value })}
//             className="w-full mb-4 px-4 py-2 bg-black border border-yellow-400 text-white rounded-xl focus:outline-none"
//           />
//           <input
//             type="text"
//             placeholder="Image URL"
//             value={form.image}
//             onChange={(e) => setForm({ ...form, image: e.target.value })}
//             className="w-full mb-4 px-4 py-2 bg-black border border-yellow-400 text-white rounded-xl focus:outline-none"
//           />
//           <button className="w-full py-2 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 transition">
//             {editing ? "Update Camera" : "Add Camera"}
//           </button>
//         </form>
//       </div>

//       {/* Cameras List */}
//       <div className="max-w-3xl mx-auto mb-12">
//         <h2 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-400 text-center">📷 My Cameras</h2>
//         {cameras.length === 0 ? (
//           <p className="text-gray-400 text-center">No cameras added yet.</p>
//         ) : (
//           cameras.map((cam) => (
//             <div key={cam._id} className="bg-gray-900 border border-yellow-400 p-4 rounded-2xl mb-4 flex justify-between items-center hover:shadow-2xl transition-shadow">
//               <div className="flex items-center gap-4">
//                 {cam.image && <img src={cam.image} alt={cam.title} className="w-20 h-20 rounded-lg object-cover border border-yellow-400" />}
//                 <div>
//                   <p className="font-semibold text-yellow-300">{cam.title}</p>
//                   <p className="text-gray-300">{cam.description}</p>
//                   <p className="text-yellow-300 font-semibold">₹{cam.pricePerDay}/day</p>
//                 </div>
//               </div>
//               <div className="flex gap-2">
//                 <button className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-400" onClick={() => handleEdit(cam)}>Edit</button>
//                 <button className="px-3 py-1 bg-red-500 rounded hover:bg-red-400" onClick={() => handleDelete(cam._id)}>Delete</button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Bookings List */}
//       <div className="max-w-3xl mx-auto mb-12">
//         <h2 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-400 text-center">📦 Bookings</h2>
//         {bookings.length === 0 ? (
//           <p className="text-gray-400 text-center">No bookings yet.</p>
//         ) : (
//           bookings.map((b) => (
//             <div key={b._id} className="bg-gray-900 border border-yellow-400 p-4 rounded-2xl mb-4 hover:shadow-xl transition-shadow flex justify-between items-center">
//               <div onClick={() => setSelectedBooking(b)} className="cursor-pointer">
//                 <span className="text-yellow-300 font-semibold">{b.customer?.name || b.customerName}</span>{" "}
//                 booked <span className="text-yellow-300 font-semibold">{b.camera?.title || b.cameraTitle}</span>
//               </div>
//               {b.status === "pending" && (
//                 <div className="flex gap-2">
//                   <button className="px-3 py-1 bg-green-500 rounded hover:bg-green-400" onClick={() => handleAccept(b._id)}>Accept</button>
//                   <button className="px-3 py-1 bg-red-500 rounded hover:bg-red-400" onClick={() => handleReject(b._id)}>Reject</button>
//                 </div>
//               )}
//               {b.status !== "pending" && (
//                 <span className={`px-3 py-1 rounded ${b.status === "accepted" ? "bg-green-600" : "bg-red-600"}`}>
//                   {b.status.toUpperCase()}
//                 </span>
//               )}
//             </div>
//           ))
//         )}
//       </div>

//       {/* Notifications */}
//       <div className="max-w-3xl mx-auto mb-12">
//         <h2 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-400 text-center">📢 Notifications</h2>
//         {notifications.length === 0 ? (
//           <div className="bg-gray-900 border border-yellow-400 p-4 rounded-2xl text-gray-400 text-center">No new notifications</div>
//         ) : (
//           notifications.map((note, idx) => (
//             <div key={idx} className="bg-gray-900 border border-yellow-400 p-4 rounded-2xl mb-2 text-white">
//               <span className="text-yellow-300 font-semibold">{note.customerName}</span> booked{" "}
//               <span className="text-yellow-300 font-semibold">{note.cameraTitle}</span>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Selected Booking Live Map */}
//       {selectedBooking && <VendorLiveMap bookingId={selectedBooking._id} />}
//     </div>
//   );
// }


























// import React, { useState, useEffect } from "react";
// import {
//   getVendorCameras,
//   addCamera,
//   updateCamera,
//   deleteCamera,
//   getVendorBookings,
//   acceptBooking,
//   rejectBooking,
// } from "../Utils/api";
// import io from "socket.io-client";
// import VendorLiveMap from "../Components/VenderLLive";

// const socket = io("http://localhost:5000");

// export default function VendorDashboard() {
//   const [form, setForm] = useState({ title: "", description: "", pricePerDay: "", image: "" });
//   const [cameras, setCameras] = useState([]);
//   const [editing, setEditing] = useState(null);
//   const [vendor, setVendor] = useState(null);
//   const [notifications, setNotifications] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [totalBookings, setTotalBookings] = useState(0);
//   const [customerLocations, setCustomerLocations] = useState({});
//   const [selectedBooking, setSelectedBooking] = useState(null);

//   const fetchCameras = async () => {
//     const data = await getVendorCameras();
//     const user = JSON.parse(localStorage.getItem("user"));
//     setVendor(user);
//     setCameras(data);
//   };

//   const fetchBookings = async () => {
//     try {
//       const data = await getVendorBookings();
//       setBookings(data);
//       setTotalBookings(data.length);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchCameras();
//     fetchBookings();

//     const handleNewBooking = (booking) => {
//       setNotifications((prev) => [...prev, booking]);
//       fetchBookings();
//       alert(`📢 New booking from ${booking.customerName} for ${booking.cameraTitle}`);
//     };

//     const handleLocation = ({ bookingId, lat, lng }) => {
//       setCustomerLocations((prev) => ({ ...prev, [bookingId]: { lat, lng } }));
//     };

//     socket.on("new-booking", handleNewBooking);
//     socket.on("customer-location", handleLocation);

//     return () => {
//       socket.off("new-booking", handleNewBooking);
//       socket.off("customer-location", handleLocation);
//     };
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editing) await updateCamera(editing._id, form);
//       else await addCamera(form);
//       setForm({ title: "", description: "", pricePerDay: "", image: "" });
//       setEditing(null);
//       fetchCameras();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this camera?")) return;
//     try {
//       await deleteCamera(id);
//       fetchCameras();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleEdit = (cam) => {
//     setEditing(cam);
//     setForm({ ...cam });
//   };

//   const handleAccept = async (bookingId) => {
//     try {
//       await acceptBooking(bookingId);
//       fetchBookings();
//       setNotifications((prev) => prev.filter((n) => n._id !== bookingId));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleReject = async (bookingId) => {
//     try {
//       await rejectBooking(bookingId);
//       fetchBookings();
//       setNotifications((prev) => prev.filter((n) => n._id !== bookingId));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8 md:p-12">
//       {/* Vendor Info */}
//       {vendor && (
//         <div className="flex flex-col md:flex-row items-center gap-6 mb-10 bg-gray-900 border border-yellow-400 rounded-3xl shadow-2xl p-6 max-w-3xl mx-auto">
//           <img
//             src={vendor.avatar || `https://ui-avatars.com/api/?name=${vendor.name}`}
//             className="w-24 h-24 rounded-full border-4 border-yellow-400 object-cover"
//             alt="Vendor"
//           />
//           <div className="text-center md:text-left">
//             <h1 className="text-3xl font-bold text-yellow-400">{vendor.name}</h1>
//             <p className="text-gray-300">{vendor.email}</p>
//             <p className="text-yellow-300 font-semibold mt-2">Total Bookings: {totalBookings}</p>
//           </div>
//         </div>
//       )}

//       {/* Camera Form */}
//       <div className="max-w-3xl mx-auto mb-12">
//         <h2 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-400 text-center">
//           {editing ? "Edit Camera" : "Add Camera"}
//         </h2>
//         <form className="bg-gray-900 border border-yellow-400 p-6 rounded-3xl shadow-2xl" onSubmit={handleSubmit}>
//           <input type="text" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full mb-4 px-4 py-2 bg-black border border-yellow-400 text-white rounded-xl focus:outline-none" />
//           <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full mb-4 px-4 py-2 bg-black border border-yellow-400 text-white rounded-xl focus:outline-none" />
//           <input type="number" placeholder="Price per day" value={form.pricePerDay} onChange={(e) => setForm({ ...form, pricePerDay: e.target.value })} className="w-full mb-4 px-4 py-2 bg-black border border-yellow-400 text-white rounded-xl focus:outline-none" />
//           <input type="text" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full mb-4 px-4 py-2 bg-black border border-yellow-400 text-white rounded-xl focus:outline-none" />
//           <button className="w-full py-2 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 transition">{editing ? "Update Camera" : "Add Camera"}</button>
//         </form>
//       </div>

//       {/* Cameras List */}
//       <div className="max-w-3xl mx-auto mb-12">
//         <h2 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-400 text-center">📷 My Cameras</h2>
//         {cameras.length === 0 ? <p className="text-gray-400 text-center">No cameras added yet.</p> :
//           cameras.map((cam) => (
//             <div key={cam._id} className="bg-gray-900 border border-yellow-400 p-4 rounded-2xl mb-4 flex justify-between items-center hover:shadow-2xl transition-shadow">
//               <div className="flex items-center gap-4">
//                 {cam.image && <img src={cam.image} alt={cam.title} className="w-20 h-20 rounded-lg object-cover border border-yellow-400" />}
//                 <div>
//                   <p className="font-semibold text-yellow-300">{cam.title}</p>
//                   <p className="text-gray-300">{cam.description}</p>
//                   <p className="text-yellow-300 font-semibold">₹{cam.pricePerDay}/day</p>
//                 </div>
//               </div>
//               <div className="flex gap-2">
//                 <button className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-400" onClick={() => handleEdit(cam)}>Edit</button>
//                 <button className="px-3 py-1 bg-red-500 rounded hover:bg-red-400" onClick={() => handleDelete(cam._id)}>Delete</button>
//               </div>
//             </div>
//           ))
//         }
//       </div>

//       {/* Bookings List with Accept/Reject */}
//       <div className="max-w-3xl mx-auto mb-12">
//         <h2 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-400 text-center">📦 Bookings</h2>
//         {bookings.length === 0 ? <p className="text-gray-400 text-center">No bookings yet.</p> :
//           bookings.map((b) => (
//             <div key={b._id} className="flex flex-col md:flex-row justify-between items-start md:items-center border p-3 rounded-lg mb-3">
//               <div>
//                 <p><strong>{b.customer?.name || b.customerName}</strong> booked <strong>{b.camera?.title || b.cameraTitle}</strong></p>
//                 {b.status === "accepted" && <span className="text-green-500">Accepted</span>}
//                 {b.status === "rejected" && <span className="text-red-500">Rejected</span>}
//               </div>
//               {b.status === "pending" && (
//                 <div className="flex gap-2 mt-2 md:mt-0">
//                   <button onClick={() => handleAccept(b._id)} className="bg-green-600 px-3 py-1 rounded">Accept</button>
//                   <button onClick={() => handleReject(b._id)} className="bg-red-600 px-3 py-1 rounded">Reject</button>
//                 </div>
//               )}
//               {/* Live Map button */}
//               <button onClick={() => setSelectedBooking(b)} className="bg-yellow-400 text-black px-3 py-1 rounded mt-2 md:mt-0">View Live Map</button>
//             </div>
//           ))
//         }
//       </div>

//       {/* Notifications */}
//       <div className="max-w-3xl mx-auto mb-12">
//         <h2 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-400 text-center">📢 Notifications</h2>
//         {notifications.length === 0 ? (
//           <div className="bg-gray-900 border border-yellow-400 p-4 rounded-2xl text-gray-400 text-center">No new notifications</div>
//         ) : (
//           notifications.map((note, idx) => (
//             <div key={idx} className="bg-gray-900 border border-yellow-400 p-4 rounded-2xl mb-2 text-white">
//               <span className="text-yellow-300 font-semibold">{note.customerName}</span> booked{" "}
//               <span className="text-yellow-300 font-semibold">{note.cameraTitle}</span>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Selected Booking Live Map */}
//       {selectedBooking && <VendorLiveMap bookingId={selectedBooking._id} />}
//     </div>
//   );
// }













import React, { useState, useEffect } from "react";
import {
  getVendorCameras,
  addCamera,
  updateCamera,
  deleteCamera,
  getVendorBookings,
  acceptBooking,
  rejectBooking,
} from "../Utils/api";
import io from "socket.io-client";
import VendorLiveMap from "../Components/VenderLLive";

const socket = io("http://localhost:5000");

export default function VendorDashboard() {
  const [form, setForm] = useState({ title: "", description: "", pricePerDay: "", image: "" });
  const [cameras, setCameras] = useState([]);
  const [editing, setEditing] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [totalBookings, setTotalBookings] = useState(0);
  const [customerLocations, setCustomerLocations] = useState({});
  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchCameras = async () => {
    const data = await getVendorCameras();
    const user = JSON.parse(localStorage.getItem("user"));
    setVendor(user);
    setCameras(data);
  };

  const fetchBookings = async () => {
    try {
      const data = await getVendorBookings();
      setBookings(data);
      setTotalBookings(data.length);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCameras();
    fetchBookings();

    const handleNewBooking = (booking) => {
      setNotifications((prev) => [...prev, booking]);
      fetchBookings();
      alert(`📢 New booking from ${booking.customerName} for ${booking.cameraTitle}`);
    };

    const handleLocation = ({ bookingId, lat, lng }) => {
      setCustomerLocations((prev) => ({ ...prev, [bookingId]: { lat, lng } }));
    };

    socket.on("new-booking", handleNewBooking);
    socket.on("customer-location", handleLocation);

    return () => {
      socket.off("new-booking", handleNewBooking);
      socket.off("customer-location", handleLocation);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) await updateCamera(editing._id, form);
      else await addCamera(form);
      setForm({ title: "", description: "", pricePerDay: "", image: "" });
      setEditing(null);
      fetchCameras();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this camera?")) return;
    try {
      await deleteCamera(id);
      fetchCameras();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (cam) => {
    setEditing(cam);
    setForm({ ...cam });
  };

  const handleAccept = async (bookingId) => {
    try {
      await acceptBooking(bookingId);
      fetchBookings();
      setNotifications((prev) => prev.filter((n) => n._id !== bookingId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (bookingId) => {
    try {
      await rejectBooking(bookingId);
      fetchBookings();
      setNotifications((prev) => prev.filter((n) => n._id !== bookingId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-teal-900 text-white p-8 md:p-12">
      
      {/* Vendor Info */}
      {vendor && (
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10 bg-gradient-to-r from-teal-600 to-indigo-700 rounded-3xl shadow-2xl p-6 max-w-3xl mx-auto border border-white/20">
          <img
            src={vendor.avatar || `https://ui-avatars.com/api/?name=${vendor.name}`}
            className="w-24 h-24 rounded-full border-4 border-pink-400 object-cover"
            alt="Vendor"
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-pink-300">{vendor.name}</h1>
            <p className="text-gray-200">{vendor.email}</p>
            <p className="text-yellow-300 font-semibold mt-2">📦 Total Bookings: {totalBookings}</p>
          </div>
        </div>
      )}

      {/* Camera Form */}
      <div className="max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-pink-300">
          {editing ? "✏️ Edit Camera" : "➕ Add Camera"}
        </h2>
        <form
          className="bg-gradient-to-r from-indigo-800 to-purple-800 p-6 rounded-3xl shadow-2xl border border-white/20"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Camera Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full mb-4 px-4 py-2 bg-gray-900 border border-pink-400 text-white rounded-xl focus:outline-none"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full mb-4 px-4 py-2 bg-gray-900 border border-pink-400 text-white rounded-xl focus:outline-none"
          />
          <input
            type="number"
            placeholder="Price per day"
            value={form.pricePerDay}
            onChange={(e) => setForm({ ...form, pricePerDay: e.target.value })}
            className="w-full mb-4 px-4 py-2 bg-gray-900 border border-pink-400 text-white rounded-xl focus:outline-none"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full mb-4 px-4 py-2 bg-gray-900 border border-pink-400 text-white rounded-xl focus:outline-none"
          />
          <button className="w-full py-2 bg-pink-400 text-black font-bold rounded-xl hover:bg-pink-300 transition">
            {editing ? "Update Camera" : "Add Camera"}
          </button>
        </form>
      </div>

      {/* Cameras List */}
      <div className="max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-pink-300">📷 My Cameras</h2>
        {cameras.length === 0 ? (
          <p className="text-gray-200 text-center">No cameras added yet.</p>
        ) : (
          cameras.map((cam) => (
            <div
              key={cam._id}
              className="bg-gradient-to-r from-purple-800 to-indigo-800 p-4 rounded-2xl mb-4 flex justify-between items-center shadow-lg hover:scale-[1.02] transition"
            >
              <div className="flex items-center gap-4">
                {cam.image && (
                  <img
                    src={cam.image}
                    alt={cam.title}
                    className="w-20 h-20 rounded-lg object-cover border-2 border-pink-400"
                  />
                )}
                <div>
                  <p className="font-semibold text-yellow-300">{cam.title}</p>
                  <p className="text-gray-200">{cam.description}</p>
                  <p className="text-green-300 font-bold">₹{cam.pricePerDay}/day</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-400"
                  onClick={() => handleEdit(cam)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-500 rounded hover:bg-red-400"
                  onClick={() => handleDelete(cam._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bookings List */}
      <div className="max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-pink-300">📦 Bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-200 text-center">No bookings yet.</p>
        ) : (
          bookings.map((b) => (
            <div
              key={b._id}
              className="bg-gradient-to-r from-indigo-800 to-purple-800 p-4 rounded-2xl mb-4 flex flex-col md:flex-row justify-between items-start md:items-center shadow-lg"
            >
              <div>
                <p>
                  <strong className="text-yellow-300">
                    {b.customer?.name || b.customerName}
                  </strong>{" "}
                  booked{" "}
                  <strong className="text-green-300">
                    {b.camera?.title || b.cameraTitle}
                  </strong>
                </p>
                {b.status === "accepted" && <span className="text-green-400">✅ Accepted</span>}
                {b.status === "rejected" && <span className="text-red-400">❌ Rejected</span>}
              </div>
              {b.status === "pending" && (
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button
                    onClick={() => handleAccept(b._id)}
                    className="bg-green-600 px-3 py-1 rounded hover:bg-green-500"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(b._id)}
                    className="bg-red-600 px-3 py-1 rounded hover:bg-red-500"
                  >
                    Reject
                  </button>
                </div>
              )}
              <button
                onClick={() => setSelectedBooking(b)}
                className="bg-pink-400 text-black px-3 py-1 rounded mt-2 md:mt-0 hover:bg-pink-300"
              >
                View Live Map
              </button>
            </div>
          ))
        )}
      </div>

      {/* Notifications */}
      <div className="max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-pink-300">📢 Notifications</h2>
        {notifications.length === 0 ? (
          <div className="bg-gradient-to-r from-purple-800 to-indigo-800 p-4 rounded-2xl text-gray-200 text-center">
            No new notifications
          </div>
        ) : (
          notifications.map((note, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-r from-indigo-800 to-purple-800 p-4 rounded-2xl mb-2 text-white shadow"
            >
              <span className="text-yellow-300 font-semibold">{note.customerName}</span> booked{" "}
              <span className="text-green-300 font-semibold">{note.cameraTitle}</span>
            </div>
          ))
        )}
      </div>

      {/* Live Map */}
      {selectedBooking && <VendorLiveMap bookingId={selectedBooking._id} />}
    </div>
  );
}








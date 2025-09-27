
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupCustomer } from "../Utils/api";

export default function SignupCustomer() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signupCustomer(form); // API call
      console.log("Signup success:", data);
      navigate("/login");
    } catch (err) {
      console.error("Signup failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-yellow-400 p-8 rounded-xl shadow-2xl w-full max-w-md space-y-5"
      >
        <h2 className="text-3xl font-extrabold text-center text-black mb-2">
          Customer Signup
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border-2 border-black px-4 py-3 rounded-lg bg-black text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border-2 border-black px-4 py-3 rounded-lg bg-black text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border-2 border-black px-4 py-3 rounded-lg bg-black text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-600"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          type="submit"
          className="w-full bg-black text-yellow-400 font-bold py-3 rounded-lg hover:bg-yellow-500 hover:text-black transition"
        >
          Sign Up
        </button>

        <div className="flex items-center justify-between mt-4">
          <span className="text-black font-medium">or sign up with</span>
          <div className="flex space-x-2">
            <button
              type="button"
              className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200 font-semibold"
              disabled
            >
              Google
            </button>
            <button
              type="button"
              className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200 font-semibold"
              disabled
            >
              Facebook
            </button>
          </div>
        </div>

        <p className="text-sm text-center text-black mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-black underline font-bold hover:text-yellow-700">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}


// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import API, { getCustomerBookings } from "../Utils/api";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000");

// export default function PaymentPage() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const { camera, startDate, endDate } = state || {};

//   const [form, setForm] = useState({
//     eventName: "",
//     customerName: "",
//     phone: "",
//     address: "",
//   });
//   const [bookingId, setBookingId] = useState(null);
//   const [location, setLocation] = useState({ lat: 0, lng: 0 });
//   const [existingBookings, setExistingBookings] = useState([]);

//   const user = JSON.parse(localStorage.getItem("user"));

//   // Fetch existing bookings for double booking check
//   useEffect(() => {
//     const fetchBookings = async () => {
//       const data = await getCustomerBookings();
//       setExistingBookings(data);
//     };
//     fetchBookings();
//   }, []);

//   // Live location tracking after booking
//   useEffect(() => {
//     if (!bookingId) return;

//     const geoSuccess = (pos) => {
//       const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
//       setLocation(coords);
//       socket.emit("customer-location", { bookingId, ...coords });
//     };

//     const geoError = (err) => console.warn("Geo error:", err);
//     const watcher = navigator.geolocation.watchPosition(geoSuccess, geoError, { enableHighAccuracy: true });

//     return () => navigator.geolocation.clearWatch(watcher);
//   }, [bookingId]);

//   const handlePayment = async () => {
//     const overlap = existingBookings.some(b => b.camera._id === camera._id &&
//       (new Date(startDate) <= new Date(b.endDate) && new Date(endDate) >= new Date(b.startDate))
//     );

//     if (overlap) {
//       alert("This camera is already booked for the selected dates.");
//       return;
//     }

//     try {
//       const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1;
//       const { data: order } = await API.post("/payment/order", { amount: camera.pricePerDay * days * 100 });

//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY,
//         amount: order.amount,
//         currency: "INR",
//         name: form.customerName,
//         description: form.eventName,
//         order_id: order.id,
//         prefill: { name: form.customerName, contact: form.phone },
//         theme: { color: "#FFD600" },
//         handler: async function (response) {
//           try {
//             const res = await API.post("/payment/verify", {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               bookingData: {
//                 camera: camera._id,
//                 startDate,
//                 endDate,
//                 totalPrice: camera.pricePerDay * days,
//                 ...form,
//               },
//             });

//             setBookingId(res.data.booking._id);
//             alert("Booking & Payment successful!");
//             navigate("/customer-dashboard");
//           } catch (err) {
//             console.error(err);
//             alert("Payment verification failed!");
//           }
//         },
//       };

//       new window.Razorpay(options).open();
//     } catch (err) {
//       console.error(err);
//       alert("Payment failed!");
//     }
//   };

  

//   return (
//     <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
//       <h2 className="text-4xl font-extrabold mb-6 text-yellow-400 drop-shadow-lg text-center">
//         Complete Your Booking
//       </h2>

//       <div className="relative bg-gray-900 p-8 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
//         {/* Decorative blurred circles */}
//         <div className="absolute -top-8 -right-8 w-24 h-24 bg-yellow-400 rounded-full opacity-30 blur-3xl"></div>
//         <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-green-500 rounded-full opacity-20 blur-2xl"></div>

//         <div className="relative z-10 flex flex-col gap-4">
//           <p className="text-yellow-300 font-semibold text-lg">
//             Camera: <span className="text-white">{camera?.title}</span>
//           </p>
          
//           <input
//             type="text"
//             placeholder="Event Name"
//             value={form.eventName}
//             onChange={(e) => setForm({ ...form, eventName: e.target.value })}
//             className="w-full p-3 rounded-xl bg-black text-white placeholder-yellow-300 border border-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-inner"
//           />
//           <input
//             type="text"
//             placeholder="Your Name"
//             value={form.customerName}
//             onChange={(e) => setForm({ ...form, customerName: e.target.value })}
//             className="w-full p-3 rounded-xl bg-black text-white placeholder-yellow-300 border border-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-inner"
//           />
//           <input
//             type="text"
//             placeholder="Phone Number"
//             value={form.phone}
//             onChange={(e) => setForm({ ...form, phone: e.target.value })}
//             className="w-full p-3 rounded-xl bg-black text-white placeholder-yellow-300 border border-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-inner"
//           />
//           <textarea
//             placeholder="Address"
//             value={form.address}
//             onChange={(e) => setForm({ ...form, address: e.target.value })}
//             className="w-full p-3 rounded-xl bg-black text-white placeholder-yellow-300 border border-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-inner resize-none"
//           />
    
//           <button
//             onClick={handlePayment}
//             className="w-full py-3 mt-4 bg-yellow-400 text-black font-bold rounded-2xl shadow-lg hover:bg-yellow-500 hover:text-white transition-transform transform hover:scale-105"
//           >
//             Pay & Book
//           </button>
//         </div>

//         {/* Price info box */}
//         <div className="mt-6 bg-black bg-opacity-60 p-4 rounded-2xl text-yellow-300 text-center relative z-10 shadow-inner">
//           {startDate && endDate && (
//             <>
//               <p className="font-semibold">
//                 Price per day: <span className="text-white">{camera.pricePerDay} ₹</span>
//               </p>
//               <p className="font-semibold">
//                 Total Days: <span className="text-white">{Math.ceil((new Date(endDate) - new Date(startDate)) / (1000*60*60*24)) + 1}</span>
//               </p>
//               <p className="font-bold text-white text-lg">
//                 Total: <span className="text-yellow-400">{camera.pricePerDay * (Math.ceil((new Date(endDate) - new Date(startDate)) / (1000*60*60*24)) + 1)} ₹</span>
//               </p>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


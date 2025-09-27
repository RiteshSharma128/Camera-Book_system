

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function BookingModal({ camera, onClose }) {
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [totalPrice, setTotalPrice] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (startDate && endDate) {
//       const start = new Date(startDate);
//       const end = new Date(endDate);
//       const diffTime = end - start;
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
//       setTotalPrice(diffDays > 0 ? diffDays * camera.pricePerDay : 0);
//     }
//   }, [startDate, endDate, camera.pricePerDay]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (totalPrice <= 0) {
//       alert("End date must be after start date");
//       return;
//     }
//     navigate("/payment", {
//       state: { camera, startDate, endDate, totalPrice },
//     });
//   };

//   return (
//     <div className="fixed inset-0 bg-black flex justify-center items-center z-50">
//       <div className="bg-yellow-400 text-black p-8 rounded-3xl w-96 shadow-2xl border-2 border-yellow-500 relative animate-fadeIn">
//         <h2 className="text-3xl font-extrabold mb-4 text-center tracking-wide drop-shadow-lg">Book {camera.title}</h2>
//         <p className="mb-4 text-lg text-center">
//           Price per Day: <span className="font-bold text-yellow-900">₹{camera.pricePerDay}</span>
//         </p>
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-black font-semibold mb-1">Start Date</label>
//             <input
//               type="date"
//               className="w-full border-2 border-yellow-600 bg-yellow-200 text-black px-3 py-2 rounded-lg focus:ring-2 focus:ring-yellow-700 transition"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-black font-semibold mb-1">End Date</label>
//             <input
//               type="date"
//               className="w-full border-2 border-yellow-600 bg-yellow-200 text-black px-3 py-2 rounded-lg focus:ring-2 focus:ring-yellow-700 transition"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               required
//             />
//           </div>
//           <p className="text-black font-bold text-lg text-center">
//             Total Price: <span className="text-yellow-900 font-extrabold">₹{totalPrice}</span>
//           </p>
//           <div className="flex justify-between gap-4 mt-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 w-1/2 border-2 border-yellow-700 rounded-lg bg-yellow-200 text-yellow-900 font-bold hover:bg-yellow-700 hover:text-white transition"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 w-1/2 bg-black text-yellow-400 font-bold rounded-lg border-2 border-black hover:bg-yellow-500 hover:text-black transition"
//             >
//               Book Now
//             </button>
//           </div>
//         </form>
//         {/* Decorative circle */}
//         <div className="absolute -top-6 -right-6 w-16 h-16 bg-yellow-300 rounded-full opacity-60 blur-lg"></div>
//         <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-yellow-500 rounded-full opacity-40 blur-lg"></div>
//       </div>
//       <style>
//         {`
//           .animate-fadeIn {
//             animation: fadeIn 0.5s;
//           }
//           @keyframes fadeIn {
//             from { opacity: 0; transform: scale(0.95);}
//             to { opacity: 1; transform: scale(1);}
//           }
//         `}
//       </style>
//     </div>
//   );
// }





import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function BookingModal({ camera, onClose }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = end - start;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setTotalPrice(diffDays > 0 ? diffDays * camera.pricePerDay : 0);
    }
  }, [startDate, endDate, camera.pricePerDay]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (totalPrice <= 0) {
      alert("End date must be after start date");
      return;
    }
    navigate("/payment", { state: { camera, startDate, endDate, totalPrice } });
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="relative w-96 bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 text-black p-8 rounded-3xl shadow-2xl border-2 border-yellow-500 animate-fadeIn overflow-hidden">
        <h2 className="text-3xl font-extrabold mb-4 text-center tracking-wide drop-shadow-lg">
          Book {camera.title}
        </h2>
        <p className="mb-4 text-lg text-center font-semibold">
          Price per Day: <span className="text-yellow-900 font-bold">₹{camera.pricePerDay}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-black font-semibold mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-xl border-2 border-yellow-600 bg-yellow-200 text-black focus:ring-2 focus:ring-yellow-700 transition"
            />
          </div>
          <div>
            <label className="block text-black font-semibold mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-xl border-2 border-yellow-600 bg-yellow-200 text-black focus:ring-2 focus:ring-yellow-700 transition"
            />
          </div>

          <p className="text-black font-bold text-lg text-center">
            Total Price: <span className="text-yellow-900 font-extrabold">₹{totalPrice}</span>
          </p>

          <div className="flex justify-between gap-4 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2 border-2 border-yellow-700 rounded-xl bg-yellow-200 text-yellow-900 font-bold hover:bg-yellow-700 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 py-2 rounded-xl bg-black text-yellow-400 font-bold border-2 border-black hover:bg-yellow-500 hover:text-black transition"
            >
              Book Now
            </button>
          </div>
        </form>

        {/* Decorative Circles */}
        <div className="absolute -top-6 -right-6 w-16 h-16 bg-yellow-300 rounded-full opacity-60 blur-2xl animate-pulse"></div>
        <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-yellow-500 rounded-full opacity-40 blur-2xl animate-pulse"></div>
      </div>

      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}


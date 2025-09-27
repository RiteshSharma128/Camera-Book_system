// import React from "react";

// export default function Step({ number, text }) {
//   return (
//     <div
//       className="flex items-center gap-4 p-4 rounded-lg mb-4 shadow-md transition-transform duration-200"
//       style={{ background: "#FFD600" }}
//       onMouseOver={e => {
//         e.currentTarget.style.transform = "translateY(-4px) scale(1.03)";
//         e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.25)";
//       }}
//       onMouseOut={e => {
//         e.currentTarget.style.transform = "";
//         e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
//       }}
//     >
//       <div className="w-12 h-12 rounded-full bg-indigo-700 text-white flex items-center justify-center font-extrabold text-xl shadow-lg border-4 border-white">
//         {number}
//       </div>
//       <p className="text-lg text-black font-semibold">{text}</p>
//     </div>
//   );
// }


import React from "react";

export default function Step({ number, text }) {
  return (
    <div className="flex items-center gap-4 p-5 rounded-3xl bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer relative overflow-hidden">
      
      {/* Decorative Circle Glow */}
      <div className="absolute -top-4 -left-4 w-16 h-16 bg-yellow-200 rounded-full opacity-30 blur-2xl animate-pulse"></div>

      {/* Step Number */}
      <div className="w-14 h-14 rounded-full bg-black text-yellow-400 flex items-center justify-center font-extrabold text-xl shadow-xl border-4 border-yellow-300">
        {number}
      </div>

      {/* Step Text */}
      <p className="text-lg text-black font-semibold drop-shadow-sm">{text}</p>
    </div>
  );
}

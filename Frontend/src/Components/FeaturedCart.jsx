// import React from "react";

// export default function FeatureCard({ icon, title, desc }) {
//   return (
//     <div className="p-6 rounded-2xl shadow hover:shadow-lg transition bg-gray-50">
//       <div className="mb-4">{icon}</div>
//       <h4 className="text-xl font-semibold text-gray-900">{title}</h4>
//       <p className="text-gray-600 mt-2">{desc}</p>
//     </div>
//   );
// }


import React from "react";

export default function FeatureCard({ icon, title, desc }) {
  return (
    <div className="relative p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-transform transform hover:-translate-y-2 bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 text-black cursor-pointer">
      {/* Icon container */}
      <div className="mb-4 w-14 h-14 flex items-center justify-center bg-black/10 rounded-full text-2xl drop-shadow-lg">
        {icon}
      </div>

      {/* Title */}
      <h4 className="text-xl font-bold drop-shadow-sm">{title}</h4>

      {/* Description */}
      <p className="mt-2 text-black/80">{desc}</p>

      {/* Decorative glow */}
      <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-300 rounded-full opacity-30 blur-2xl animate-pulse"></div>
    </div>
  );
}

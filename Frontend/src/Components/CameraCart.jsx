
// export default function CameraCard({ camera, onBook }) {
//   return (
//     <div className="bg-white rounded-xl shadow p-4">
//       <img
//         src={camera.image || "https://via.placeholder.com/150"}
//         alt={camera.name}
//         className="w-full h-40 object-cover rounded-lg"
//       />
//       <h3 className="text-lg font-bold mt-2">{camera.name}</h3>
//       <p className="text-gray-600">₹{camera.price}/day</p>
//       <button
//         onClick={() => onBook(camera)}
//         className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
//       >
//         Book Now
//       </button>
//     </div>
//   );
// }



export default function CameraCard({ camera, onBook }) {
  return (
    <div className="bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 rounded-2xl shadow-xl p-4 transform transition hover:scale-105 hover:shadow-2xl duration-300">
      <div className="overflow-hidden rounded-xl">
        <img
          src={camera.image || "https://via.placeholder.com/300"}
          alt={camera.name}
          className="w-full h-44 object-cover rounded-xl transition-transform duration-300 hover:scale-110"
        />
      </div>
      <h3 className="text-xl font-bold mt-3 text-black drop-shadow-lg">{camera.name}</h3>
      <p className="text-black/80 font-semibold mt-1">₹{camera.price}/day</p>
      <button
        onClick={() => onBook(camera)}
        className="mt-4 w-full py-2 rounded-xl bg-black text-yellow-400 font-bold border-2 border-black hover:bg-yellow-400 hover:text-black transition duration-300"
      >
        Book Now
      </button>

      {/* Decorative Glow Circle */}
      <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-300 rounded-full opacity-30 blur-xl animate-pulse"></div>
    </div>
  );
}

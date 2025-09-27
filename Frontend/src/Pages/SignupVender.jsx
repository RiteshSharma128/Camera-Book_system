// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { signupCustomer } from "../Utils/api";

// export default function SignupCustomer() {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = await signupCustomer(form); // API call
//       console.log("Signup success:", data);
//       navigate("/login");
//     } catch (err) {
//       console.error("Signup failed:", err.response?.data || err.message);
//       alert(err.response?.data?.message || "Signup failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-lg shadow-md w-96 space-y-4"
//       >
//         <h2 className="text-2xl font-bold text-center text-green-600">
//           Customer Signup
//         </h2>

//         <input
//           type="text"
//           placeholder="Name"
//           className="w-full border px-3 py-2 rounded"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full border px-3 py-2 rounded"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full border px-3 py-2 rounded"
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />

//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
//         >
//           Sign Up
//         </button>

//         <p className="text-sm text-center text-gray-600 mt-2">
//           Already have an account?{" "}
//           <Link to="/login" className="text-green-600 hover:underline">
//             Login
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }





import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupVendor } from "../Utils/api";
import { signupCustomer } from "../Utils/api";

export default function SignupVendor() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = await signupVendor(form); // vendor signup
    console.log("Vendor signup success:", data);

    // ✅ Directly vendor dashboard pe le jao
    navigate("/vendor-dashboard");
  } catch (err) {
    console.error("Signup failed:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Signup failed");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="relative w-full max-w-md">
        {/* Decorative Background Circles */}
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-green-400 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-yellow-400 rounded-full opacity-20 blur-2xl"></div>

        <form
          onSubmit={handleSubmit}
          className="relative bg-gray-800 p-10 rounded-3xl shadow-2xl space-y-6 z-10"
        >
          <h2 className="text-3xl font-extrabold text-center text-green-400 drop-shadow-lg">
            Vender Signup
          </h2>

          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-xl bg-gray-900 text-white placeholder-green-300 border-2 border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-inner transition"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-gray-900 text-white placeholder-green-300 border-2 border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-inner transition"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-gray-900 text-white placeholder-green-300 border-2 border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-inner transition"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-bold rounded-2xl shadow-lg hover:bg-green-500 hover:scale-105 transform transition"
          >
            Sign Up
          </button>

          <p className="text-sm text-center text-green-300 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-400 font-bold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}


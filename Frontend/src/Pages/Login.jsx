



// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { login } from "../Utils/api";

// export default function Login() {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     role: "customer",
//   });
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const data = await login(form);
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));
//       if (data.user.role === "customer") navigate("/customer-dashboard");
//       else navigate("/vendor-dashboard");
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-black p-6">
//       <div className="w-full max-w-md bg-yellow-400 rounded-2xl shadow-lg p-8 border-4 border-yellow-500">
//         <h2 className="text-3xl font-extrabold text-center text-black mb-6 drop-shadow">
//           Login
//         </h2>
//         <form onSubmit={handleLogin} className="space-y-5">
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full px-4 py-2 border border-yellow-600 rounded-lg bg-black text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-600"
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full px-4 py-2 border border-yellow-600 rounded-lg bg-black text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-600"
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//           />
//           <select
//             className="w-full px-4 py-2 border border-yellow-600 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-yellow-600"
//             value={form.role}
//             onChange={(e) => setForm({ ...form, role: e.target.value })}
//           >
//             <option value="customer">Customer</option>
//             <option value="vendor">Vendor</option>
//           </select>
//           <button className="w-full bg-black text-yellow-400 font-bold py-2 rounded-lg hover:bg-yellow-500 hover:text-black transition">
//             Login
//           </button>
//         </form>

//         <div className="mt-8 text-center space-y-3">
//           <p className="text-sm text-black">
//             New Customer?{" "}
//             <Link to="/signup-customer" className="text-white font-semibold hover:underline">
//               Create Customer Account
//             </Link>
//           </p>
//           <p className="text-sm text-black">
//             Want to rent out cameras?{" "}
//             <Link to="/signup-vendor" className="text-white font-semibold hover:underline">
//               Create Vendor Account
//             </Link>
//           </p>
//           <hr className="my-4 border-yellow-600" />
//           <p className="text-xs text-black">
//             Forgot your password?{" "}
//             <Link to="/forgot-password" className="text-white hover:underline">
//               Reset here
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../Utils/api";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "customer",
  });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      if (data.user.role === "customer") navigate("/customer-dashboard");
      else navigate("/vendor-dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <div className="w-full max-w-md bg-yellow-400 rounded-3xl shadow-2xl p-8 border-4 border-yellow-500 relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-yellow-300 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-yellow-500 rounded-full opacity-40 blur-2xl"></div>

        <h2 className="text-3xl font-extrabold text-center text-black mb-8 drop-shadow-lg">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5 relative z-10">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-yellow-600 rounded-xl bg-black text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-600 shadow-inner"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-yellow-600 rounded-xl bg-black text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-600 shadow-inner"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <select
            className="w-full px-4 py-3 border border-yellow-600 rounded-xl bg-black text-white focus:outline-none focus:ring-2 focus:ring-yellow-600 shadow-inner"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="customer">Customer</option>
            <option value="vendor">Vendor</option>
          </select>

          <button className="w-full bg-black text-yellow-400 font-bold py-3 rounded-xl hover:bg-yellow-500 hover:text-black transition-transform transform hover:scale-105 shadow-lg">
            Login
          </button>
        </form>

        <div className="mt-8 text-center relative z-10 space-y-3">
          <p className="text-sm text-black">
            New Customer?{" "}
            <Link to="/signup-customer" className="text-white font-semibold hover:underline">
              Create Customer Account
            </Link>
          </p>
          <p className="text-sm text-black">
            Want to rent out cameras?{" "}
            <Link to="/signup-vendor" className="text-white font-semibold hover:underline">
              Create Vendor Account
            </Link>
          </p>
          <hr className="my-4 border-yellow-600" />
          <p className="text-xs text-black">
            Forgot your password?{" "}
            <Link to="/forgot-password" className="text-white hover:underline">
              Reset here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

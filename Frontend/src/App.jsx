// import React from "react";
// import Lading from "./Pages/LadingPage";

// import SignupVendor from "./Pages/SignupVender";
// import ProtectedRoute from "./Components/Protectet";
// import CustomerDashboard from "./Pages/CustomerDashboard";
// import VendorDashboard from "./Pages/VendorDashboard";
// import { Route, Routes } from "react-router-dom";
// import Login from "./Pages/Login";
// import SignupCustomer from "./Pages/SignupCustomer";
// import 'leaflet/dist/leaflet.css';





// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Lading />} />
//       <Route path="/signup-customer" element={<SignupCustomer/>} />
//       <Route path="/signup-vendor" element={<SignupVendor />} />
//       <Route path="/login" element={<Login />} />

//       {/* Protected Dashboards */}
//       <Route
//         path="/customer-dashboard"
//         element={
//           <ProtectedRoute role="customer">
//             <CustomerDashboard />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/vendor-dashboard"
//         element={
//           <ProtectedRoute role="vendor">
//             <VendorDashboard />
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// }

// export default App;


import React from "react";
import { Route, Routes } from "react-router-dom";
import Lading from "./Pages/LadingPage";

import SignupCustomer from "./Pages/SignupCustomer";
import Login from "./Pages/Login";
import CustomerDashboard from "./Pages/CustomerDashboard";
import VendorDashboard from "./Pages/VendorDashboard";

import ProtectedRoute from "./Components/Protectet";
import "leaflet/dist/leaflet.css";
import PaymentPage from "./Pages/Payments";
import DateSelectionPage from "./Pages/DateSelection";
import SignupVendor from "./Pages/SignupVender";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Lading />} />
      <Route path="/signup-customer" element={<SignupCustomer />} />
      <Route path="/signup-vendor" element={<SignupVendor />} />
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route
        path="/customer-dashboard"
        element={
          <ProtectedRoute role="customer">
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendor-dashboard"
        element={
          <ProtectedRoute role="vendor">
            <VendorDashboard />
          </ProtectedRoute>
        }
      />


       <Route
        path="/select-dates"
        element={
          <ProtectedRoute role="customer">
            <DateSelectionPage />
          </ProtectedRoute>
        }
      />

      {/* Payment page (customer only) */}
      <Route
        path="/payment"
        element={
          <ProtectedRoute role="customer">
            <PaymentPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;


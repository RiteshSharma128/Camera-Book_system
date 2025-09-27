
import React from "react";
import { Navigate } from "react-router-dom";
import { getUser, getToken } from "../Utils/auth.js";

export default function ProtectedRoute({ children, role }) {
  const user = getUser();
  const token = getToken();

  // Agar login hi nahi hai
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  // Agar role mismatch hai (customer → vendor page ya vendor → customer page)
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // Sab sahi hai → page dikhado
  return children;
}

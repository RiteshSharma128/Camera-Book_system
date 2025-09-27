

import express from "express";

import { protect } from "../Middlerware/authMiddleware.js";
import { createOrder, verifyPayment } from "../Controllers/paymentController.js";

const paymentRoutes = express.Router();

// ✅ Create Razorpay Order
paymentRoutes.post("/order", protect, createOrder);


// ✅ Verify Razorpay Payment
// paymentRoutes.post("/verify", protect, verifyPayment);
paymentRoutes.post("/verify", protect, verifyPayment);

export default paymentRoutes;



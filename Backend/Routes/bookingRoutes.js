


// import express from "express";
// const bookingRoutes = express.Router();

// import { createBooking, getBookings, cancelBooking, getVendorBookings } from "../Controllers/BookingControoler.js";
// import { protect } from "../Middlerware/authMiddleware.js";

// bookingRoutes.get("/", protect, getBookings);
// bookingRoutes.post("/", protect, createBooking);
// bookingRoutes.get("/vendor", protect, getVendorBookings);

// // ✅ cancel booking route
// bookingRoutes.delete("/:id", protect, cancelBooking);

// export default bookingRoutes;


// import express from "express";
// import { getCustomerBookings } from "../Controllers/bookingController.js";
// import { verifyPayment, createOrder } from "../Controllers/paymentController.js";
// import authMiddleware from "../Middleware/authMiddleware.js";

// const router = express.Router();

// // ✅ Customer bookings
// router.get("/my", authMiddleware, getCustomerBookings);

// // ✅ Razorpay
// router.post("/payment/order", authMiddleware, createOrder);
// router.post("/payment/verify", authMiddleware, verifyPayment);

// export default router;





// import express from "express";
// const bookingRoutes = express.Router();

// import { protect } from "../Middlerware/authMiddleware.js";
// import { acceptBooking, cancelBooking, createBooking, getVendorBookings, rejectBooking } from "../Controllers/BookingControoler.js";

// // Customer routes
// bookingRoutes.get("/", protect, getVendorBookings);
// bookingRoutes.post("/", protect, createBooking);
// bookingRoutes.delete("/:id", protect, cancelBooking);

// // Vendor routes
// bookingRoutes.get("/vendor", protect, getVendorBookings);
// bookingRoutes.put("/accept/:id", protect, acceptBooking); // ✅ new
// bookingRoutes.put("/reject/:id", protect, rejectBooking); // ✅ new

// export default bookingRoutes;



import express from "express";
const bookingRoutes = express.Router();

import { protect } from "../Middlerware/authMiddleware.js";
import { acceptBooking, cancelBooking, createBooking, getBookings, getVendorBookings, rejectBooking } from "../Controllers/BookingControoler.js";


bookingRoutes.get("/", protect, getBookings);

// Customer routes
bookingRoutes.get("/", protect, getVendorBookings);
bookingRoutes.post("/", protect, createBooking);
bookingRoutes.delete("/:id", protect, cancelBooking);

// Vendor routes
bookingRoutes.get("/vendor", protect, getVendorBookings);
bookingRoutes.put("/accept/:id", protect, acceptBooking); // ✅ new
bookingRoutes.put("/reject/:id", protect, rejectBooking); // ✅ new

export default bookingRoutes;





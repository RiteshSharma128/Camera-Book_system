
// import dotenv from "dotenv";
// dotenv.config();
// import Razorpay from "razorpay";
// import crypto from "crypto";
// import Booking from "../Models/Booking.js";
// import { io } from "../index.js";

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,          // ✅ env me RAZORPAY_KEY_ID hona chahiye
//   key_secret: process.env.RAZORPAY_SECRET,  // ✅ correct key
// });

// // ----------------------
// // Create Razorpay Order
// // ----------------------
// export const createOrder = async (req, res) => {
//   try {
//     let { amount } = req.body;

//     if (!amount || amount <= 0) {
//       return res.status(400).json({ message: "Invalid amount" });
//     }

//     // ✅ Amount ko paise me convert
//     amount = Math.round(amount);

//     const order = await razorpay.orders.create({
//       amount, // e.g. 50000 = ₹500
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     });

//     res.json(order);
//   } catch (err) {
//     console.error("❌ Razorpay createOrder error:", err);
//     res.status(500).json({ message: "Failed to create Razorpay order" });
//   }
// };

// // ----------------------
// // Verify Payment + Save Booking
// // ----------------------
// export const verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingData } = req.body;

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//       return res.status(400).json({ message: "Missing payment details" });
//     }

//     // ✅ Verify signature
//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_SECRET)
//       .update(body.toString())
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({ message: "Invalid payment signature" });
//     }

//     // ✅ Save booking
//     const booking = await Booking.create({
//       ...bookingData,
//       customer: req.user._id, // req.user set hona chahiye auth middleware se
//       paymentStatus: "success",
//       transactionId: razorpay_payment_id,
//     });

//     // ✅ Notify vendor (agar bookingData me vendor diya hai)
//     if (booking.vendor) {
//       io.to(booking.vendor.toString()).emit("new-booking", {
//         customerName: booking.customerName,
//         cameraTitle: bookingData.cameraTitle,
//         startDate: booking.startDate,
//         endDate: booking.endDate,
//       });
//     }

//     res.json({ message: "Payment verified & booking saved", booking });
//   } catch (err) {
//     console.error("❌ Payment verification error:", err);
//     res.status(500).json({ message: "Payment verification failed" });
//   }
// };





// try kar chuke
// import dotenv from "dotenv";
// dotenv.config();
// import Razorpay from "razorpay";
// import crypto from "crypto";
// import Booking from "../Models/Booking.js";
// import Camera from "../Models/Camera.js";
// import { io } from "../index.js";

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET,
// });

// // ----------------------
// // Create Razorpay Order
// // ----------------------
// export const createOrder = async (req, res) => {
//   try {
//     let { amount } = req.body;

//     if (!amount || amount <= 0) {
//       return res.status(400).json({ message: "Invalid amount" });
//     }

//     // Convert to paise
//     amount = Math.round(amount * 100);

//     const order = await razorpay.orders.create({
//       amount,
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     });

//     res.json(order);
//   } catch (err) {
//     console.error("❌ Razorpay createOrder error:", err);
//     res.status(500).json({ message: "Failed to create Razorpay order" });
//   }
// };

// // ----------------------
// // Verify Payment + Save Booking
// // ----------------------
// export const verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingData } = req.body;

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingData) {
//       return res.status(400).json({ message: "Missing payment or booking details" });
//     }

//     // ✅ Verify signature
//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_SECRET)
//       .update(body.toString())
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({ message: "Invalid payment signature" });
//     }

//     // ✅ Fetch camera to get vendor
//     const camera = await Camera.findById(bookingData.camera);
//     if (!camera) return res.status(404).json({ message: "Camera not found" });

//     // ✅ Save booking
//     const booking = await Booking.create({
//       ...bookingData,
//       customer: req.user._id,
//       vendor: camera.vendor, // must include vendor
//       paymentStatus: "success",
//       transactionId: razorpay_payment_id,
//     });

//     // ✅ Populate camera for front-end
//     const populatedBooking = await booking.populate("camera", "title description pricePerDay image vendor");

//     // ✅ Notify vendor
//     io.to(camera.vendor.toString()).emit("new-booking", {
//       customerName: booking.customerName,
//       cameraTitle: camera.title,
//       startDate: booking.startDate,
//       endDate: booking.endDate,
//     });

//     // ✅ Notify customer
//     io.to(req.user._id.toString()).emit("booking-update", {
//       bookingId: booking._id,
//       status: "success",
//       cameraTitle: camera.title,
//     });

//     res.json({ message: "Payment verified & booking saved", booking: populatedBooking });
//   } catch (err) {
//     console.error("❌ Payment verification error:", err);
//     res.status(500).json({ message: "Payment verification failed" });
//   }
// };






import dotenv from "dotenv";
dotenv.config();
import Razorpay from "razorpay";
import crypto from "crypto";
import Booking from "../Models/Booking.js";
import Camera from "../Models/Camera.js";
import { io } from "../index.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// ----------------------
// Create Razorpay Order
// ----------------------
export const createOrder = async (req, res) => {
  try {
    let { amount } = req.body; // frontend se rupees me aayega (e.g., 399)

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // ✅ Convert to paise
    const finalAmount = Math.round(amount * 100);

    const order = await razorpay.orders.create({
      amount: finalAmount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.json(order);
  } catch (err) {
    console.error("❌ Razorpay createOrder error:", err);
    res.status(500).json({ message: "Failed to create Razorpay order" });
  }
};

// ----------------------
// Verify Payment + Save Booking
// ----------------------
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingData } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingData) {
      return res.status(400).json({ message: "Missing payment or booking details" });
    }

    // ✅ Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // ✅ Fetch camera
    const camera = await Camera.findById(bookingData.camera);
    if (!camera) return res.status(404).json({ message: "Camera not found" });

    // ✅ Save booking
    const booking = await Booking.create({
      ...bookingData,
      customer: req.user._id,
      vendor: camera.vendor,
      paymentStatus: "success",
      transactionId: razorpay_payment_id,
    });

    const populatedBooking = await booking.populate("camera", "title description pricePerDay image vendor");

    // ✅ Notify vendor
    io.to(camera.vendor.toString()).emit("new-booking", {
      customerName: booking.customerName,
      cameraTitle: camera.title,
      startDate: booking.startDate,
      endDate: booking.endDate,
    });

    // ✅ Notify customer
    io.to(req.user._id.toString()).emit("booking-update", {
      bookingId: booking._id,
      status: "success",
      cameraTitle: camera.title,
    });

    res.json({ message: "Payment verified & booking saved", booking: populatedBooking });
  } catch (err) {
    console.error("❌ Payment verification error:", err);
    res.status(500).json({ message: "Payment verification failed" });
  }
};















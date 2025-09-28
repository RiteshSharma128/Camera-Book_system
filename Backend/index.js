


// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import authrouter from "./Routes/authRoutes.js";
// import cameraRoutes from "./Routes/cameraRoutes.js";
// import bookingRoutes from "./Routes/bookingRoutes.js";
// import { connectDB } from "./config/db.js";
// import paymentRoutes from "./Routes/paymentRoutes.js";



// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authrouter);
// app.use("/api/cameras", cameraRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/payment", paymentRoutes);



// // =======================
// // Socket.IO Setup
// // =======================
// export const io = new Server(server, {
//   cors: { origin: "*" }, // front-end URL
// });

// io.on("connection", (socket) => {
//   console.log("New client connected:", socket.id);

//   // Join a booking room
//   socket.on("join-booking", (bookingId) => {
//     socket.join(bookingId);
//   });

//   // Customer sends location
//   socket.on("customer-location", ({ bookingId, lat, lng }) => {
//     socket.to(bookingId).emit("customer-location", { lat, lng });
//   });

//   // Vendor sends location
//   socket.on("vendor-location", ({ bookingId, lat, lng }) => {
//     socket.to(bookingId).emit("vendor-location", { lat, lng });
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected:", socket.id);
//   });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// Corrent code use
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { Server } from "socket.io";
// import http from "http"; // Node.js HTTP server
// import authrouter from "./Routes/authRoutes.js";
// import cameraRoutes from "./Routes/cameraRoutes.js";
// import bookingRoutes from "./Routes/bookingRoutes.js";
// import paymentRoutes from "./Routes/paymentRoutes.js";
// import { connectDB } from "./config/db.js";

// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authrouter);
// app.use("/api/cameras", cameraRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/payment", paymentRoutes);

// // ✅ Create HTTP server for Socket.IO
// const server = http.createServer(app);

// // =======================
// // Socket.IO Setup
// // =======================
// export const io = new Server(server, {
//   cors: { origin: "*" }, // front-end URL
// });

// io.on("connection", (socket) => {
//   console.log("New client connected:", socket.id);

//   socket.on("join-booking", (bookingId) => {
//     socket.join(bookingId);
//   });

//   socket.on("customer-location", ({ bookingId, lat, lng }) => {
//     socket.to(bookingId).emit("customer-location", { lat, lng });
//   });

//   socket.on("vendor-location", ({ bookingId, lat, lng }) => {
//     socket.to(bookingId).emit("vendor-location", { lat, lng });
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected:", socket.id);
//   });
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { Server } from "socket.io";
// import http from "http";

// import authrouter from "./Routes/authRoutes.js";
// import cameraRoutes from "./Routes/cameraRoutes.js";
// import bookingRoutes from "./Routes/bookingRoutes.js";
// import paymentRoutes from "./Routes/paymentRoutes.js";
// import { connectDB } from "./config/db.js";

// dotenv.config();
// connectDB();

// const app = express();

// // ✅ Middlewares
// app.use(cors({ origin: "http://localhost:3000", credentials: true })); // frontend ka URL
// app.use(express.json());

// // ✅ Routes
// app.use("/api/auth", authrouter);
// app.use("/api/cameras", cameraRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/payment", paymentRoutes);

// // ✅ HTTP + Socket.IO
// const server = http.createServer(app);

// export const io = new Server(server, {
//   cors: { origin: "http://localhost:3000" },
// });

// io.on("connection", (socket) => {
//   console.log("✅ New client connected:", socket.id);

//   socket.on("join-booking", (bookingId) => {
//     socket.join(bookingId);
//   });

//   socket.on("customer-location", ({ bookingId, lat, lng }) => {
//     socket.to(bookingId).emit("customer-location", { lat, lng });
//   });

//   socket.on("vendor-location", ({ bookingId, lat, lng }) => {
//     socket.to(bookingId).emit("vendor-location", { lat, lng });
//   });

//   socket.on("disconnect", () => {
//     console.log("❌ Client disconnected:", socket.id);
//   });
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () =>
//   console.log(`🚀 Server running on http://localhost:${PORT}`)
// );

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { Server } from "socket.io";
// import http from "http";

// import authrouter from "./Routes/authRoutes.js";
// import cameraRoutes from "./Routes/cameraRoutes.js";
// import bookingRoutes from "./Routes/bookingRoutes.js";
// import paymentRoutes from "./Routes/paymentRoutes.js";
// import { connectDB } from "./config/db.js";

// dotenv.config();
// connectDB();

// const app = express();

// // ✅ Middlewares
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "http://localhost:3000"], // dono allow kar diye
//     credentials: true,
//   })
// );
// app.use(express.json());

// // ✅ Routes
// app.use("/api/auth", authrouter);
// app.use("/api/cameras", cameraRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/payment", paymentRoutes);

// // ✅ HTTP + Socket.IO
// const server = http.createServer(app);

// export const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:5173", "http://localhost:3000"], // ✅ yaha bhi dono
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// io.on("connection", (socket) => {
//   console.log("✅ New client connected:", socket.id);

//   socket.on("join-booking", (bookingId) => {
//     socket.join(bookingId);
//     console.log(`📌 Client ${socket.id} joined booking room: ${bookingId}`);
//   });

//   socket.on("customer-location", ({ bookingId, lat, lng }) => {
//     socket.to(bookingId).emit("customer-location", { lat, lng });
//   });

//   socket.on("vendor-location", ({ bookingId, lat, lng }) => {
//     socket.to(bookingId).emit("vendor-location", { lat, lng });
//   });

//   socket.on("disconnect", () => {
//     console.log("❌ Client disconnected:", socket.id);
//   });
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () =>
//   console.log(`🚀 Server running on http://localhost:${PORT}`)
// )

// import express from "express";
// import http from "http";
// import { Server } from "socket.io";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";

// // Routes
// import authRoutes from "./Routes/authRoutes.js";
// import bookingRoutes from "./Routes/bookingRoutes.js";
// import cameraRoutes from "./Routes/cameraRoutes.js";
// import paymentRoutes from "./Routes/paymentRoutes.js";
// import { connectDB } from "./config/db.js";

// dotenv.config();
// connectDB(); // Connect to MongoDB

// const app = express();

// // ✅ Middlewares
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "http://localhost:3000"], // frontend URLs
//     credentials: true,
//   })
// );
// app.use(express.json());

// // ✅ Routes router
// app.use("/api/auth", authRoutes);
// app.use("/api/cameras", cameraRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/payment", paymentRoutes);

// // ✅ HTTP + Socket.IO
// const server = http.createServer(app);

// export const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:5173", "http://localhost:3000"], 
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// // ✅ Socket.IO events
// io.on("connection", (socket) => {
//   console.log("✅ New client connected:", socket.id);

//   // Vendor joins a room for booking notifications
//   socket.on("join-vendor", (vendorId) => {
//     socket.join(vendorId);
//     console.log(`📌 Vendor joined room: ${vendorId}`);
//   });

//   // Customer joins a booking room for live location updates
//   socket.on("join-booking", (bookingId) => {
//     socket.join(bookingId);
//     console.log(`📌 Client ${socket.id} joined booking room: ${bookingId}`);
//   });

//   // Customer sends live location
//   socket.on("customer-location", ({ bookingId, lat, lng }) => {
//     socket.to(bookingId).emit("customer-location", { lat, lng });
//   });

//   // Vendor sends live location
//   socket.on("vendor-location", ({ bookingId, lat, lng }) => {
//     socket.to(bookingId).emit("vendor-location", { lat, lng });
//   });

//   socket.on("disconnect", () => {
//     console.log("❌ Client disconnected:", socket.id);
//   });
// });

// // ✅ Start server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () =>
//   console.log(`🚀 Server running on http://localhost:${PORT}`)
// );


// import express from "express";
// import http from "http";
// import { Server } from "socket.io";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";

// // Routes
// import authRoutes from "./Routes/authRoutes.js";
// import bookingRoutes from "./Routes/bookingRoutes.js";
// import cameraRoutes from "./Routes/cameraRoutes.js";
// import paymentRoutes from "./Routes/paymentRoutes.js";
// import { connectDB } from "./config/db.js";
// import profileRoutes from "./Routes/ProfileRoutes.js";


// dotenv.config();
// connectDB(); // Connect to MongoDB

// const app = express();

// // ✅ Middlewares
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "http://localhost:3000"], // frontend URLs
//     credentials: true,
//   })
// );
// app.use(express.json());

// // ✅ Routes router
// app.use("/api/auth", authRoutes);
// app.use("/api/cameras", cameraRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/payment", paymentRoutes);

// // ✅ HTTP + Socket.IO
// const server = http.createServer(app);

// export const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:5173", "http://localhost:3000"],
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// // ✅ Socket.IO events
// io.on("connection", (socket) => {
//   console.log("✅ New client connected:", socket.id);

//   // 🔹 VENDOR joins his own room (for booking notifications)
//   socket.on("join-vendor", (vendorId) => {
//     socket.join(vendorId);
//     console.log(`📌 Vendor joined room: ${vendorId}`);
//   });

//   // 🔹 CUSTOMER joins booking room (for live location)
//   socket.on("join-booking", (bookingId) => {
//     socket.join(bookingId);
//     console.log(`📌 Client ${socket.id} joined booking room: ${bookingId}`);
//   });

//   // 🔹 Customer sends live location (new system → room-based)
//   socket.on("customer-location", ({ bookingId, lat, lng }) => {
//     socket.to(bookingId).emit("customer-location", { lat, lng });
//   });

//   // 🔹 Vendor sends live location (room-based)
//   socket.on("vendor-location", ({ bookingId, lat, lng }) => {
//     socket.to(bookingId).emit("vendor-location", { lat, lng });
//   });

//   // ✅ BACKWARD COMPATIBLE: Old syntax support
//   socket.on("send-location", ({ bookingId, lat, lng }) => {
//     console.log("📍 [OLD] Location received:", bookingId, lat, lng);

//     // Purane code ke liye vendor sabko broadcast hoga
//     io.emit("customer-location", { bookingId, lat, lng });
//   });

//   socket.on("disconnect", () => {
//     console.log("❌ Client disconnected:", socket.id);
//   });
// });

// // index.js (Socket.IO)
// io.on("connection", (socket) => {
//   // Vendor joins
//   socket.on("join-vendor", (vendorId) => {
//     socket.join(vendorId);
//   });

//   // Customer joins
//   socket.on("join-customer", (customerId) => {
//     socket.join(customerId);
//   });
// });

// app.use("/api/profile", profileRoutes);
// app.use("/uploads", express.static("uploads"));

// // ✅ Start server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () =>
//   console.log(`🚀 Server running on http://localhost:${PORT}`)
// );


import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Routes
import authRoutes from "./Routes/authRoutes.js";
import bookingRoutes from "./Routes/bookingRoutes.js";
import cameraRoutes from "./Routes/cameraRoutes.js";
import paymentRoutes from "./Routes/paymentRoutes.js";
import profileRoutes from "./Routes/ProfileRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();
 connectDB() // Connect to MongoDB

const app = express();

// ✅ Middlewares
app.use(
  cors({
    origin: ["https://camera-book-system-1.onrender.com", "https://camera-book-system-1.onrender.com"], // frontend URLs
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/cameras", cameraRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/profile", profileRoutes);

// ✅ HTTP + Socket.IO
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: ["https://camera-book-system-1.onrender.com", "https://camera-book-system-1.onrender.com"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// ✅ Socket.IO logic
io.on("connection", (socket) => {
  console.log("✅ New client connected:", socket.id);

  // Vendor joins his room (for booking notifications & customer location)
  socket.on("join-vendor", (vendorId) => {
    socket.join(vendorId);
    console.log(`📌 Vendor joined room: ${vendorId}`);
  });

  // Customer joins booking room
  socket.on("join-booking", (bookingId) => {
    socket.join(bookingId);
    console.log(`📌 Client ${socket.id} joined booking room: ${bookingId}`);
  });

  // Customer sends live location to vendor
  socket.on("customer-location", ({ bookingId, lat, lng, vendorId }) => {
    io.to(vendorId).emit("vendor-customer-location", { bookingId, lat, lng });
  });

  // Vendor can send live location (optional)
  socket.on("vendor-location", ({ bookingId, lat, lng }) => {
    socket.to(bookingId).emit("vendor-location", { lat, lng });
  });

  // Backward compatible old event
  socket.on("send-location", ({ bookingId, lat, lng }) => {
    console.log("📍 [OLD] Location received:", bookingId, lat, lng);
    io.emit("customer-location", { bookingId, lat, lng });
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

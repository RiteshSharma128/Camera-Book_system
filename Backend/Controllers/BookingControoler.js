














import Booking from "../Models/Booking.js";
import Camera from "../Models/Camera.js";
import { io } from "../index.js";

// ----------------------
// Create Booking
// ----------------------
export const createBooking = async (req, res) => {
  try {
    const { camera: cameraId, startDate, endDate, totalPrice, customerName } = req.body;

    if (!cameraId || !startDate || !endDate || !totalPrice) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const camera = await Camera.findById(cameraId);
    if (!camera) return res.status(404).json({ message: "Camera not found" });

    // ✅ Check overlapping bookings
    const overlapping = await Booking.findOne({
      camera: cameraId,
      $or: [
        { startDate: { $lte: new Date(endDate), $gte: new Date(startDate) } },
        { endDate: { $gte: new Date(startDate), $lte: new Date(endDate) } },
        { startDate: { $lte: new Date(startDate) }, endDate: { $gte: new Date(endDate) } },
      ],
    });
    if (overlapping) return res.status(400).json({ message: "Camera already booked" });

    // ✅ Create booking with vendor reference
    const booking = await Booking.create({
      customer: req.user._id,
      vendor: camera.vendor,
      camera: cameraId,
      startDate,
      endDate,
      totalPrice,
      customerName,
    });

    const populatedBooking = await booking.populate("camera", "title description pricePerDay image vendor");

    // 🔔 Notify vendor
    io.to(camera.vendor.toString()).emit("new-booking", {
      bookingId: booking._id,
      customerName,
      cameraTitle: camera.title,
      startDate,
      endDate,
    });

    // 🔔 Notify customer (pending status)
    io.to(req.user._id.toString()).emit("booking-update", {
      bookingId: booking._id,
      status: "pending",
      cameraTitle: camera.title,
    });

    res.status(201).json(populatedBooking);
  } catch (err) {
    console.error("❌ Error creating booking:", err);
    res.status(500).json({ message: "Failed to create booking" });
  }
};

// ----------------------
// Get Bookings for Customer
// ----------------------
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.user._id })
      .populate("camera", "title description pricePerDay image vendor")
      .populate("vendor", "name email")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error("❌ Error fetching customer bookings:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// ----------------------
// Get Bookings for Vendor
// ----------------------
export const getVendorBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ vendor: req.user._id })
      .populate("customer", "name email")
      .populate("camera", "title description pricePerDay image")
      .populate("vendor", "name email")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error("❌ Error fetching vendor bookings:", err);
    res.status(500).json({ message: "Failed to fetch vendor bookings" });
  }
};

// ----------------------
// Cancel Booking (Customer)
// ----------------------
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("camera", "title");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await booking.deleteOne();

    // 🔔 Notify vendor
    io.to(booking.vendor.toString()).emit("booking-update", {
      bookingId: booking._id,
      status: "cancelled",
      cameraTitle: booking.camera.title,
    });

    res.json({ message: "Booking cancelled" });
  } catch (err) {
    console.error("❌ Error cancelling booking:", err);
    res.status(500).json({ message: "Failed to cancel booking" });
  }
};

// ----------------------
// Accept Booking (Vendor)
// ----------------------
export const acceptBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("customer", "name email")
      .populate("camera", "title");

    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.vendor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    booking.status = "accepted";
    await booking.save();

    // 🔔 Notify customer
    io.to(booking.customer._id.toString()).emit("booking-update", {
      bookingId: booking._id,
      status: "accepted",
      cameraTitle: booking.camera.title,
    });

    res.json({ message: "Booking accepted", booking });
  } catch (err) {
    console.error("❌ Error accepting booking:", err);
    res.status(500).json({ message: "Failed to accept booking" });
  }
};

// ----------------------
// Reject Booking (Vendor)
// ----------------------
export const rejectBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("customer", "name email")
      .populate("camera", "title");

    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.vendor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    booking.status = "rejected";
    await booking.save();

    // 🔔 Notify customer
    io.to(booking.customer._id.toString()).emit("booking-update", {
      bookingId: booking._id,
      status: "rejected",
      cameraTitle: booking.camera.title,
    });

    res.json({ message: "Booking rejected", booking });
  } catch (err) {
    console.error("❌ Error rejecting booking:", err);
    res.status(500).json({ message: "Failed to reject booking" });
  }
};





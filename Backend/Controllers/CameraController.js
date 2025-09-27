

import Camera from "../Models/Camera.js"; 
import Booking from "../Models/Booking.js";

// export const addCamera = async (req, res) => {
//   const { title, description, pricePerDay, image } = req.body;
//   const camera = await Camera.create({
//     title,
//     description,
//     pricePerDay,
//     image,
//     vendor: req.user._id
//   });
//   res.status(201).json(camera);
// };

export const addCamera = async (req, res) => {
  try {
    const camera = await Camera.create({
      ...req.body,
      vendor: req.user._id   // ✅ vendor id yaha save karna hoga
    });

    res.status(201).json(camera);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add camera" });
  }
};

// ✅ Get cameras with their booked slots
export const getCameras = async (req, res) => {
  const cameras = await Camera.find().populate("vendor", "name email");
  const camerasWithBookings = await Promise.all(
    cameras.map(async (cam) => {
      const bookings = await Booking.find({ camera: cam._id }).select("startDate endDate -_id");
      return { ...cam.toObject(), bookings };
    })
  );
  res.json(camerasWithBookings);
};

export const updateCamera = async (req, res) => {
  const { id } = req.params;
  const { title, description, pricePerDay, image } = req.body;
  const camera = await Camera.findById(id);
  if (!camera) return res.status(404).json({ message: "Camera not found" });
  if (camera.vendor.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Not authorized" });
  camera.title = title || camera.title;
  camera.description = description || camera.description;
  camera.pricePerDay = pricePerDay || camera.pricePerDay;
  camera.image = image || camera.image;
  const updatedCamera = await camera.save();
  res.json(updatedCamera);
};

export const deleteCamera = async (req, res) => {
  const { id } = req.params;
  const camera = await Camera.findById(id);
  if (!camera) return res.status(404).json({ message: "Camera not found" });
  if (camera.vendor.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Not authorized" });
  await camera.deleteOne();
  res.json({ message: "Camera deleted successfully" });
};

// ✅ Vendor ke apne cameras
export const getVendorCameras = async (req, res) => {
  try {
    const cameras = await Camera.find({ vendor: req.user._id })
      .populate("vendor", "name email");

    const camerasWithBookings = await Promise.all(
      cameras.map(async (cam) => {
        const bookings = await Booking.find({ camera: cam._id }).select("startDate endDate -_id");
        return { ...cam.toObject(), bookings };
      })
    );

    res.json(camerasWithBookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch vendor cameras" });
  }
};


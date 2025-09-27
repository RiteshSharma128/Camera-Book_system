


import express from "express";
import multer from "multer";
import path from "path";   // ✅ path import karo
import fs from "fs";       // ✅ uploads folder check ke liye
import { getProfile, updateProfile } from "../Controllers/ProfileController.js";
import { protect } from "../Middlerware/authMiddleware.js";

const profileRoutes = express.Router();

// ✅ Ensure uploads folder exist kare
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // ✅ absolute path
  },
  filename: function (req, file, cb) {
    // filename safe rakhne ke liye spaces replace karenge
    const safeName = file.originalname.replace(/\s+/g, "_");
    const uniqueSuffix = Date.now() + "-" + safeName;
    cb(null, uniqueSuffix);
  },
});

export const upload = multer({ storage });

// ✅ Profile Routes
profileRoutes.get("/", protect, getProfile);
profileRoutes.put("/", protect, upload.single("avatar"), updateProfile);

export default profileRoutes;

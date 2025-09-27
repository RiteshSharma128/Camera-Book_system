
import express from "express";
import { addCamera, getCameras, updateCamera, deleteCamera, getVendorCameras } from "../Controllers/CameraController.js";
import { authorizeRoles } from "../Middlerware/roleMiddleware.js";
import { protect } from "../Middlerware/authMiddleware.js";


const cameraRoutes = express.Router();

cameraRoutes.get("/", getCameras);
cameraRoutes.post("/", protect, authorizeRoles("vendor"), addCamera);

// ✅ update + delete
cameraRoutes.put("/:id", protect, authorizeRoles("vendor"), updateCamera);
cameraRoutes.delete("/:id", protect, authorizeRoles("vendor"), deleteCamera);

// vender 

cameraRoutes.get("/vendor", protect,getVendorCameras);

export default cameraRoutes;


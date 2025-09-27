


// import axios from "axios";

// // Axios instance
// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// // Attach JWT token automatically
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// // =======================
// // Auth APIs
// // =======================
// export const signupCustomer = (data) =>
//   API.post("/auth/register", { ...data, role: "customer" }).then((res) => {
//     localStorage.setItem("token", res.data.token);
//     localStorage.setItem("user", JSON.stringify(res.data.user));
//     return res.data;
//   });

// export const signupVendor = (data) =>
//   API.post("/auth/register", { ...data, role: "vendor" }).then((res) => {
//     localStorage.setItem("token", res.data.token);
//     localStorage.setItem("user", JSON.stringify(res.data.user));
//     return res.data;
//   });

// export const login = (data) =>
//   API.post("/auth/login", data).then((res) => {
//     localStorage.setItem("token", res.data.token);
//     localStorage.setItem("user", JSON.stringify(res.data.user));
//     return res.data;
//   });

// // =======================
// // Camera APIs
// // =======================
// export const getCameras = () => API.get("/cameras").then((res) => res.data);
// export const addCamera = (data) => API.post("/cameras", data).then((res) => res.data);
// export const updateCamera = (id, data) => API.put(`/cameras/${id}`, data).then((res) => res.data);
// export const deleteCamera = (id) => API.delete(`/cameras/${id}`).then((res) => res.data);

// // ✅ Vendor ke apne cameras
// export const getVendorCameras = () => API.get("/cameras/vendor").then((res) => res.data);

// // =======================
// // Booking APIs
// // =======================
// export const createBooking = (data) =>
//   API.post("/payment/verify", data).then((res) => res.data);

// export const getBookings = () => API.get("/bookings").then((res) => res.data);
// export const getCustomerBookings = () => API.get("/bookings/customer").then((res) => res.data); // ✅ ADDED
// export const getVendorBookings = () => API.get("/bookings/vendor").then((res) => res.data);

// export const cancelBooking = (id) =>
//   API.delete(`/bookings/${id}`).then((res) => res.data);

// export const getCameraBookings = (cameraId) =>
//   API.get(`/bookings/camera/${cameraId}`).then((res) => res.data);

// // =======================
// // Payment APIs
// // =======================
// export const createPaymentOrder = (amount) =>
//   API.post("/payment/order", { amount, currency: "INR" }).then((res) => res.data);

// export const verifyPayment = (paymentResponse) =>
//   API.post("/payment/verify", paymentResponse).then((res) => res.data);

// // Default export
// export default API;









// import axios from "axios";

// // Axios instance
// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// // Attach JWT token automatically
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// // =======================
// // Auth APIs
// // =======================
// export const signupCustomer = (data) =>
//   API.post("/auth/register", { ...data, role: "customer" }).then((res) => {
//     localStorage.setItem("token", res.data.token);
//     localStorage.setItem("user", JSON.stringify(res.data.user));
//     return res.data;
//   });

// export const signupVendor = (data) =>
//   API.post("/auth/register", { ...data, role: "vendor" }).then((res) => {
//     localStorage.setItem("token", res.data.token);
//     localStorage.setItem("user", JSON.stringify(res.data.user));
//     return res.data;
//   });

// export const login = (data) =>
//   API.post("/auth/login", data).then((res) => {
//     localStorage.setItem("token", res.data.token);
//     localStorage.setItem("user", JSON.stringify(res.data.user));
//     return res.data;
//   });

// // =======================
// // Camera APIs
// // =======================
// export const getCameras = () => API.get("/cameras").then((res) => res.data);
// export const addCamera = (data) => API.post("/cameras", data).then((res) => res.data);
// export const updateCamera = (id, data) => API.put(`/cameras/${id}`, data).then((res) => res.data);
// export const deleteCamera = (id) => API.delete(`/cameras/${id}`).then((res) => res.data);
// export const getVendorCameras = () => API.get("/cameras/vendor").then((res) => res.data);

// // =======================
// // Booking APIs
// // =======================
// export const createBooking = (data) =>
//   API.post("/payment/verify", data).then((res) => res.data);

// export const getBookings = () => API.get("/bookings").then((res) => res.data);
// export const getCustomerBookings = () => API.get("/bookings/customer").then((res) => res.data);
// export const getVendorBookings = () => API.get("/bookings/vendor").then((res) => res.data);

// export const cancelBooking = (id) =>
//   API.delete(`/bookings/${id}`).then((res) => res.data);

// export const getCameraBookings = (cameraId) =>
//   API.get(`/bookings/camera/${cameraId}`).then((res) => res.data);

// // Vendor booking actions
// // export const acceptBooking = (bookingId) =>
// //   API.put(`/bookings/accept/${bookingId}`).then((res) => res.data);

// export const acceptBooking = (id) =>
//   API.put(`/bookings/accept/${id}`).then((res) => res.data);

// // export const rejectBooking = (bookingId) =>
// //   API.put(`/bookings/reject/${bookingId}`).then((res) => res.data);

// export const rejectBooking = (id) =>
//   API.put(`/bookings/reject/${id}`).then((res) => res.data);

// // =======================
// // Payment APIs
// // =======================
// export const createPaymentOrder = (amount) =>
//   API.post("/payment/order", { amount, currency: "INR" }).then((res) => res.data);

// export const verifyPayment = (paymentResponse) =>
//   API.post("/payment/verify", paymentResponse).then((res) => res.data);

// // ✅ Agar getProfile chahiye to add karo:
// export const getProfile = () => API.get("/profile");

// // Agar profile update bhi chahiye
// export const updateProfile = (formData) =>
//   API.put("/profile", formData, { headers: { "Content-Type": "multipart/form-data" } });

// // Default export
// export default API;






import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// =======================
// Auth APIs
// =======================
export const signupCustomer = (data) =>
  API.post("/auth/register", { ...data, role: "customer" }).then((res) => {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data;
  });

export const signupVendor = (data) =>
  API.post("/auth/register", { ...data, role: "vendor" }).then((res) => {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data;
  });

export const login = (data) =>
  API.post("/auth/login", data).then((res) => {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data;
  });

// =======================
// Camera APIs
// =======================
export const getCameras = () => API.get("/cameras").then((res) => res.data);
export const addCamera = (data) => API.post("/cameras", data).then((res) => res.data);
export const updateCamera = (id, data) => API.put(`/cameras/${id}`, data).then((res) => res.data);
export const deleteCamera = (id) => API.delete(`/cameras/${id}`).then((res) => res.data);
export const getVendorCameras = () => API.get("/cameras/vendor").then((res) => res.data);

// =======================
// Booking APIs
// =======================
export const createBooking = (data) => API.post("/bookings", data).then((res) => res.data);
export const getBookings = () => API.get("/bookings").then((res) => res.data);
export const getCustomerBookings = () => API.get("/bookings/customer").then((res) => res.data);
export const getVendorBookings = () => API.get("/bookings/vendor").then((res) => res.data);
export const cancelBooking = (id) => API.delete(`/bookings/${id}`).then((res) => res.data);
export const acceptBooking = (id) => API.put(`/bookings/accept/${id}`).then((res) => res.data);
export const rejectBooking = (id) => API.put(`/bookings/reject/${id}`).then((res) => res.data);

// =======================
// Payment APIs
// =======================
export const createPaymentOrder = (amount) =>
  API.post("/payment/order", { amount, currency: "INR" }).then((res) => res.data);

export const verifyPayment = (paymentResponse) =>
  API.post("/payment/verify", paymentResponse).then((res) => res.data);

// =======================
// Profile APIs
// =======================
export const getProfile = () => API.get("/profile");
export const updateProfile = (formData) =>
  API.put("/profile", formData, { headers: { "Content-Type": "multipart/form-data" } });

// Default export
export default API;

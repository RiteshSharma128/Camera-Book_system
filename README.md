# 📷 Camera Booking & Rental System

A full-stack camera rental platform where **customers** can book cameras and equipment, and **vendors** can manage their inventory and bookings. Payments are handled after vendor approval. Live tracking and real-time notifications are included.  

---

## 🌟 Features

### Customer
- Browse and book cameras from nearby vendors.
- Select rental dates with dynamic pricing calculation.
- View booking status and history.
- Live tracking of camera delivery (optional for events).
- Update personal profile, including avatar.

### Vendor
- Add, update, or remove cameras from inventory.
- Receive real-time booking notifications.
- Accept or reject bookings before payment is allowed.
- View live customer locations on map.
- Manage vendor profile.

### General
- Secure authentication with JWT.
- File upload for profile pictures and camera images.
- Modern UI with responsive design using Tailwind CSS.
- Real-time updates using Socket.IO.
- Google Maps / Leaflet integration for live tracking.

---

## 🖥️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, React Router, Leaflet
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Realtime:** Socket.IO
- **Authentication:** JWT (JSON Web Tokens)
- **File Uploads:** Multer
- **Payment:** Razorpay (conditional, after vendor acceptance)
- **Hosting:** Can be deployed on Vercel (frontend) and Render/Heroku (backend)

---

## ⚡ Project Structure


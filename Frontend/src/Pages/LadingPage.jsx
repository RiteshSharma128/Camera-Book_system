





// import FeatureCard from "../Components/FeaturedCart";
// import Step from "../Components/Step";
// import { Camera, Calendar, User, ShieldCheck, DollarSign, Star } from "lucide-react";

// function Landing() {
//   return (
//     <div className="min-h-screen bg-black flex flex-col">
//       {/* Header */}
//       <header className="w-full bg-black shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50">
//         <h1 className="text-2xl font-bold text-yellow-400">📷 CameraBooking</h1>
//         <nav className="flex gap-6 text-lg">
//           <a href="#features" className="text-white hover:text-yellow-400 transition">Features</a>
//           <a href="#how" className="text-white hover:text-yellow-400 transition">How it Works</a>
//           <a href="/login" className="text-yellow-400 font-semibold hover:text-yellow-300 transition">Login</a>
//         </nav>
//       </header>

//       {/* Hero Section */}
//       <section className="flex-1 flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-20 gap-10 md:gap-0">
//         <div className="max-w-lg space-y-6">
//           <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
//             Book Cameras <span className="text-yellow-400">Effortlessly</span>
//           </h2>
//           <p className="text-gray-200 text-lg">
//             Rent professional cameras & equipment from vendors near you. Simple, fast, and hassle-free booking.
//           </p>
//           <div className="flex flex-wrap gap-4 mt-6">
//             <a
//               href="/signup-customer"
//               className="px-6 py-3 bg-yellow-400 text-black rounded-2xl shadow-lg hover:bg-yellow-500 transition font-semibold"
//             >
//               I’m a Customer
//             </a>
//             <a
//               href="/signup-vendor"
//               className="px-6 py-3 bg-yellow-600 text-white rounded-2xl shadow-lg hover:bg-yellow-700 transition font-semibold"
//             >
//               I’m a Vendor
//             </a>
//             <a
//               href="#features"
//               className="px-6 py-3 border-2 border-yellow-400 text-yellow-400 rounded-2xl shadow-lg hover:bg-yellow-50 hover:text-black transition font-semibold"
//             >
//               Learn More
//             </a>
//           </div>
//         </div>

//         <div className="flex justify-center">
//           <img
//             src="https://cdn-icons-png.flaticon.com/512/2920/2920329.png"
//             alt="Camera Booking"
//             className="w-80 md:w-96 animate-bounce"
//           />
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="bg-black py-16 px-10 md:px-20">
//         <h3 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 drop-shadow-md">
//           Why Choose <span className="text-yellow-400">CameraBooking?</span>
//         </h3>
//         <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10">
//           <FeatureCard
//             icon={<Camera className="w-10 h-10 text-yellow-400" />}
//             title="Wide Range"
//             desc="Choose from DSLR, Mirrorless, Lenses & more."
//             cardClass="bg-gray-900 text-white border border-yellow-400 hover:scale-105 transition"
//           />
//           <FeatureCard
//             icon={<Calendar className="w-10 h-10 text-yellow-400" />}
//             title="Flexible Booking"
//             desc="Book by hours, days, or weeks — your choice."
//             cardClass="bg-gray-900 text-white border border-yellow-400 hover:scale-105 transition"
//           />
//           <FeatureCard
//             icon={<User className="w-10 h-10 text-yellow-400" />}
//             title="Vendor Network"
//             desc="Connect with trusted vendors near your location."
//             cardClass="bg-gray-900 text-white border border-yellow-400 hover:scale-105 transition"
//           />
//           <FeatureCard
//             icon={<ShieldCheck className="w-10 h-10 text-yellow-400" />}
//             title="Secure Payments"
//             desc="Your transactions are safe and encrypted."
//             cardClass="bg-gray-900 text-white border border-yellow-400 hover:scale-105 transition"
//           />
//           <FeatureCard
//             icon={<DollarSign className="w-10 h-10 text-yellow-400" />}
//             title="Best Prices"
//             desc="Affordable rates for all camera gear."
//             cardClass="bg-gray-900 text-white border border-yellow-400 hover:scale-105 transition"
//           />
//           <FeatureCard
//             icon={<Star className="w-10 h-10 text-yellow-400" />}
//             title="Top Rated"
//             desc="Highly rated by customers and vendors."
//             cardClass="bg-gray-900 text-white border border-yellow-400 hover:scale-105 transition"
//           />
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section id="how" className="bg-gray-900 py-16 px-10 md:px-20">
//         <h3 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 drop-shadow-md">
//           How It Works
//         </h3>
//         <div className="max-w-3xl mx-auto space-y-6">
//           <Step number="1" text="Sign up as Customer or Vendor" />
//           <Step number="2" text="Vendors upload cameras, Customers browse & select" />
//           <Step number="3" text="Book your camera, confirm & enjoy shooting!" />
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-black py-6 text-center text-yellow-400 text-lg font-semibold">
//         © 2025 CameraBooking. All rights reserved.
//       </footer>
//     </div>
//   );
// }

// export default Landing;






import FeatureCard from "../Components/FeaturedCart";// check spelling: agar file ka naam "FeaturedCard.jsx" hai to import bhi wahi hona chahiye
import Step from "../Components/Step";
import {
  Camera,
  Calendar,
  User,
  ShieldCheck,
  DollarSign,
  Star,
} from "lucide-react";

function Landing() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="w-full bg-black shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-yellow-400">
          📷 CameraBooking
        </h1>
        <nav className="flex gap-6 text-lg">
          <a
            href="#features"
            className="text-white hover:text-yellow-400 transition"
          >
            Features
          </a>
          <a
            href="#how"
            className="text-white hover:text-yellow-400 transition"
          >
            How it Works
          </a>
          <a
            href="/login"
            className="text-yellow-400 font-semibold hover:text-yellow-300 transition"
          >
            Login
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-20 gap-10 md:gap-0">
        <div className="max-w-lg space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
            Book Cameras{" "}
            <span className="text-yellow-400">Effortlessly</span>
          </h2>
          <p className="text-gray-200 text-lg">
            Rent professional cameras & equipment from vendors near you.
            Simple, fast, and hassle-free booking.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <a
              href="/signup-customer"
              className="px-6 py-3 bg-yellow-400 text-black rounded-2xl shadow-lg hover:bg-yellow-500 transition font-semibold"
            >
              I’m a Customer
            </a>
            <a
              href="/signup-vendor"
              className="px-6 py-3 bg-yellow-600 text-white rounded-2xl shadow-lg hover:bg-yellow-700 transition font-semibold"
            >
              I’m a Vendor
            </a>
            <a
              href="#features"
              className="px-6 py-3 border-2 border-yellow-400 text-yellow-400 rounded-2xl shadow-lg hover:bg-yellow-50 hover:text-black transition font-semibold"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2920/2920329.png"
            alt="Camera Booking"
            className="w-80 md:w-96 animate-bounce"
          />
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="bg-black py-16 px-10 md:px-20"
      >
        <h3 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 drop-shadow-md">
          Why Choose <span className="text-yellow-400">CameraBooking?</span>
        </h3>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10">
          <FeatureCard
            icon={<Camera className="w-10 h-10 text-yellow-400" />}
            title="Wide Range"
            desc="Choose from DSLR, Mirrorless, Lenses & more."
            cardClass="bg-gray-900 text-white border border-yellow-400 hover:scale-105 transition"
          />
          <FeatureCard
            icon={<Calendar className="w-10 h-10 text-yellow-400" />}
            title="Flexible Booking"
            desc="Book by hours, days, or weeks — your choice."
            cardClass="bg-gray-900 text-white border border-yellow-400 hover:scale-105 transition"
          />
          <FeatureCard
            icon={<User className="w-10 h-10 text-yellow-400" />}
            title="Vendor Network"
            desc="Connect with trusted vendors near your location."
            cardClass="bg-gray-900 text-white border border-yellow-400 hover:scale-105 transition"
          />
          <FeatureCard
            icon={<ShieldCheck className="w-10 h-10 text-yellow-400" />}
            title="Secure Payments"
            desc="Your transactions are safe and encrypted."
            cardClass="bg-gray-900 text-white border border-yellow-400 hover:scale-105 transition"
          />
          <FeatureCard
            icon={<DollarSign className="w-10 h-10 text-yellow-400" />}
            title="Best Prices"
            desc="Affordable rates for all camera gear."
            cardClass="bg-gray-900 text-white border border-yellow-400 hover:scale-105 transition"
          />
          <FeatureCard
            icon={<Star className="w-10 h-10 text-yellow-400" />}
            title="Top Rated"
            desc="Highly rated by customers and vendors."
            cardClass="bg-gray-900 text-white border border-yellow-400 hover:scale-105 transition"
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how"
        className="bg-gray-900 py-16 px-10 md:px-20"
      >
        <h3 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 drop-shadow-md">
          How It Works
        </h3>
        <div className="max-w-3xl mx-auto space-y-6">
          <Step number="1" text="Sign up as Customer or Vendor" />
          <Step number="2" text="Vendors upload cameras, Customers browse & select" />
          <Step number="3" text="Book your camera, confirm & enjoy shooting!" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-6 text-center text-yellow-400 text-lg font-semibold">
        © 2025 CameraBooking. All rights reserved.
      </footer>
    </div>
  );
}

export default Landing;

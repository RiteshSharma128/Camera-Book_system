// import mongoose from "mongoose";


// const bookingSchema = new mongoose.Schema({
//   customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, //, required: true 
//   vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true  }, // ✅ add vendor , required: true 
//   camera: { type: mongoose.Schema.Types.ObjectId, ref: "Camera", required: true },
//   startDate: { type: Date, required: true },
//   endDate: { type: Date, required: true },
//   totalPrice: { type: Number, required: true },
//   paymentStatus: { type: String, default: "pending" },
// }, { timestamps: true });
// export default mongoose.model("Booking", bookingSchema);





// active code 
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, //, required: true
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User",required: true }, // ✅ add vendor , required: true
  camera: { type: mongoose.Schema.Types.ObjectId, ref: "Camera", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  paymentStatus: { type: String, default: "pending" },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" } // ✅ new
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);


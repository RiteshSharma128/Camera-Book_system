// import mongoose from "mongoose"

// const ConnectDb=async()=>{
//   try{
//    await mongoose.connect(
//     process.env.MONGODB_URI)

//     console.log("Db connected")
//   }catch(error){
//     console.log("db error")
//   }
// }

// export default ConnectDb;


import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1);
  }
};


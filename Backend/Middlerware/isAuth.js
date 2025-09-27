// import UserModel from "../Models/userModel.js";
// import jwt from "jsonwebtoken";
// const isAuth=async(req,res,next)=>{
//   try {
//     let {token}=req.cookies;
//     if(!token){
//       return res.status(401).json({message:"Unauthorized"});
//     }

//     let verifyToken=await jwt.verify(token,process.env.JWT_SECRET);
//     if(verifyToken){
//       req.userId=verifyToken.userId;

//       const user=await UserModel.findById(req.userId)

//       req.userRole=user.role
//       next();
//     }
//     }catch(error){
//       console.log(error);
//       return res.status(401).json({message:"token error"});
//     }
//   } 

// export default isAuth;


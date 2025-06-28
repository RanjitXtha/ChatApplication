import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';

export const protectedRoute = async(req,res,next)=>{
    try{
        const token = req.cookies.jwttoken;

        if(!token){
            return res.status(400).json({message:"Unauthorized Token"});
        } 
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);

        if(!decodedToken){
            return res.status(400).json({message:"Unauthorized Token"});
        }

        const user = await User.findById(decodedToken.userId).select("-password");

        if(!user){
            return res.status(400).json({message:"User not found"});
        }

        req.user = user;
        next();
    }catch(err){
        return res.status(500).json({message:"Internal server error occured during token verification"});
    }

}
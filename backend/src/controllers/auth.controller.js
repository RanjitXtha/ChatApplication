import { generateJWTToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';

export const Login = async(req,res)=>{
   try{
        const {email , password} = req.body;
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({message: 'User does not exist' });
        }
    const isPasswordCorrect = await bcrypt.compare(password , user.password);

    if(!isPasswordCorrect){
        return res.status(400).json({message:'Wrong Password'})
    }


    generateJWTToken(user._id,res);
    return res.status(201).json({
            userId:user._id,
            username:user.username,
            profilePic:user.profilePic,
            email:user.email,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({message:{error}});
    }
}

export const Signup= async(req,res)=>{
    console.log("signup")
    try{
        const {email,username,password} = req.body;
        
        const profilePic = req.file ? req.file.path : null;

        const userExists = await User.findOne({email});

        if(userExists){
            return res.status(400).json({message:'User already Exists'})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt);

        const newUser = new User({
            email,username,password: hashedPassword,profilePic
        })

        const user = await newUser.save();
        generateJWTToken(user._id,res);
        return res.status(201).json({
            userId:user._id,
            username:user.username,
            profilePic:user.profilePic,
            email:user.email,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({message:{error}})
    }
}

export const LogOut= async(req,res)=>{
    res.clearCookie('jwttoken');
    return res.status(200).json({message:'Logged Out'})
    
}

export const GetUser = async(req,res)=>{
    const user = req.user;
    
    return res.status(200).json({
        userId:user._id,
        username:user.username,
        profilePic:user.profilePic,
        email:user.email,
    })

}


export const UpdateProfile = async(req,res)=>{
    const {username,password} = req.body;
    const userId = req.user._id;
    const profilePic =   req.file ? req.file.path : null;
        const updateData = {};

        try{

    if (username) updateData.username = username;

     if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

     if (req.file) {
      updateData.profilePic = profilePic;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      select: '-password', 
    });

       res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Update failed:', err);
    res.status(500).json({ message: 'Failed to update user' });
  }

}
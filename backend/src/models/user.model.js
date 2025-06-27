import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true,
    },
    username:{
        type:String,
        required:true,
        minlength:5
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    profilePic:{
        type:String,
        default:"",
    },
    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ]
    

},{timestamps:true})

const User = mongoose.model("User",userSchema);

export default User;
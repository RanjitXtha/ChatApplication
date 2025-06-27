import mongoose from 'mongoose';


export const DBConnection = async()=>{
    try{
        await mongoose.connect(process.env.DB_URL)
        console.log("Connected to db")
    }catch(err){
        console.log(err)
    }
}
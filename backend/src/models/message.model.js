import mongoose from 'mongoose';


const messageSchema  = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    content:{
        type:String
    },
    image:{
        type:String
    },
    isRead: { type: Boolean, default: false }, 



},{timestamps:true})

const Message = mongoose.model('message',messageSchema);
export default Message;
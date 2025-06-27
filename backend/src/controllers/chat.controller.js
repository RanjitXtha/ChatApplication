import Message from "../models/message.model.js";
import User from "../models/user.model.js";


export const searchUser = async(req,res)=>{
    
    const search = req.query.search;
    console.log(search)
    const currentUserId = req.user._id;


      if (!search) {
      return res.status(400).json({ message: 'Search query missing' });
    }

    try{
    const user = await User.findById(currentUserId).select('friends');

    if(!user)res.status(400).json({message:'Error occured during searching'})

    const users = await User.find({
      $or: [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ],
      _id: { $ne: currentUserId, $nin: user.friends }, 
    }).select('username email profilePic');

    if(!users) res.status(400).json({message:'User not found'});

    res.status(201).json({users})
}catch(err){
        res.status(500).json({message:'Internal Server Error'})
    }
}


export const getMessages = async(req,res)=>{
     try{

    const id = req.params.id;
    const currentUserId = req.user._id;
    console.log("id"+id);
    console.log("currentuser"+currentUserId);
    if(!id || !currentUserId){
        return res.status(400).json({message:"User Id's not found"})
    }

   
        const messages = await Message.find({
            $or:[
                {senderId:currentUserId,recieverId:id},
                {senderId:id,recieverId:currentUserId}
            ]
        }).sort({createdAt:1});
    
        return res.status(201).json({messages})
    }catch(err){
        return res.status(500).json({message:err})
    }

}

export const sendMessages = async(req,res)=>{
 

try{
       const {content,image}= req.body;
    const id = req.params.id;
    const senderId = req.user._id;

    console.log(content);
    console.log("id"+id);
    console.log("sender"+senderId)

     let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      recieverId:id,
      content,
      image: imageUrl,
    });

    console.log(newMessage);

    await newMessage.save();
    console.log("sucessful")
    }catch(err){
        return res.status(500).json({message:err})
    }
}
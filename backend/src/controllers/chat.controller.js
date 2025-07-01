import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getFriends = async(req,res)=>{
    const id = req.user._id.toString();

  try{
 const user = await User.findById(
      id
    ).select("friends").populate('friends','username profilePic')
    const friends = user?.friends || [];

    return res.status(200).json({friends})
  }catch(err){
    return res.status(500).json({message:err})
  }
   
}


export const addFriends = async(req,res)=>{
  const userId = req.user._id; 
  const { friendId } = req.body;

  if (userId.toString() === friendId) {
    return res.status(400).json({ message: "You can't add yourself" });
  }

  const user = await User.findById(userId);
  const friend = await User.findById(friendId);

  if (!friend) return res.status(404).json({ message: 'User not found' });

  if (user.friends.includes(friendId)) {
    return res.status(400).json({ message: 'Already friends' });
  }

  user.friends.push(friendId);
  await user.save();

  res.json({ message: 'Friend added successfully' });
}



export const searchUser = async(req,res)=>{
    const search = req.query.search;
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
       const {content}= req.body;
    const id = req.params.id;
    const senderId = req.user._id;

    const image= req.file ? req.file.path : null;

    const newMessage = new Message({
      senderId,
      recieverId:id,
      content,
      image
    });

    await newMessage.save();
    return res.status(200).json({newMessage});
    }catch(err){
        return res.status(500).json({message:err})
    }
}
import Group from "../models/group.model.js";
import mongoose from "mongoose";
export const CreateGroup = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const groupData = {
            name: req.body.name,
            creatorId: req.body.creatorId,
            members: [ new mongoose.Types.ObjectId(req.body.creatorId)]
        }
        const newGroup = await Group.create(groupData);
        return res.status(200).json({ message: 'Created Sucessfully', data: newGroup });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Failed creating group', error: error });

    }
}

export const GetGroups = async (req, res) => {

    try {

        const userId = new mongoose.Types.ObjectId(req.params.userId); 
        
        console.log(userId)
        const groups = await Group.find(
            { members: userId}
        );

        console.log("groups",groups)
        if(!groups){
            return res.status(400).json({ message: 'Failed getting groups'});
        }

        return res.status(200).json({ data: groups })



    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Failed getting groups', error: err })
    }

}


export const JoinGroup = async(req,res)=>{
    const groupId = new mongoose.Types.ObjectId(req.params.groupId);
    const userId = new mongoose.Types.ObjectId(req.params.userId);
    try{
        const group = await Group.findById(groupId);

        if(!group){
        return res.status(404).json({ message: "Group not found" });

        }
        if(group.members.includes(userId)){
            return res.status(400).json({ message: "User arleady a member" });
        }
        group.members.push(userId);

        group.save();

        return res.status(200).json({ message: 'Added to group sucessfully' })

        
    }catch(err){
        console.log(err)
    }
}
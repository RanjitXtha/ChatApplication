import React from 'react'
import axiosInstance from '../utils/axios'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const CreateGroup = () => {
    // const id = crypto.randomUUID();
    const currentUser = useSelector((state) => state.user.currentUser);
    const [groupId, setGroupId] = useState("");

    const [name, setName] = useState("");
    const handleGroupCreate = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            console.log("empty name is not allowed");
            return;
        }
        const response = await axiosInstance.post('/group-chat/create', {
            name,
            creatorId: currentUser.userId,
        })
        console.log(response);
    }

    const handleGroupJoin = async (e) => {
        e.preventDefault();
        if (!groupId.trim()) {
            console.log("Empty group ID");
            return;
        }
        try {
            const response = await axiosInstance.patch(`/group-chat/join/${groupId}/${currentUser.userId}`);
            console.log(response.data);

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            CreateGroup
            <form onSubmit={handleGroupCreate}>
                <input placeholder='enter name' type="text" onChange={(e) => setName(e.target.value)} />
                <button type="submit">Submit </button>
            </form>

            Join Group
            <form onSubmit={handleGroupJoin}>
                <input type="text" placeholder="Enter code" onChange={(e) => setGroupId(e.target.value)} />
                <button type="submit">Join group</button>
            </form>
        </div>
    )
}

export default CreateGroup
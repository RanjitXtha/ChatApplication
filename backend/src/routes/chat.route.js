import express from 'express';
import { protectedRoute } from '../middleware/protectedRoute.js';
import { addFriends, getFriends, getMessages, searchUser, sendMessages } from '../controllers/chat.controller.js';


const router = express.Router();

router.post("/add-friend",protectedRoute,addFriends);
router.get("/friends",protectedRoute,getFriends);
router.get("/users",protectedRoute,searchUser);
router.get("/message/:id",protectedRoute,getMessages);
router.post("/message/:id",protectedRoute,sendMessages);
export default router;
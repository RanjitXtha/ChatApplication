import express from 'express';
import { protectedRoute } from '../middleware/protectedRoute.js';
import { addFriends, getAllUsers, getFriends, getMessages, searchUser, sendMessages } from '../controllers/chat.controller.js';
import {upload} from '../middleware/upload.middleware.js'


const router = express.Router();

router.post("/add-friend",protectedRoute,addFriends);
router.get("/friends",protectedRoute,getFriends);
router.get("/users",protectedRoute,searchUser);
router.get("/message/:id",protectedRoute,getMessages);
router.post("/message/:id",protectedRoute,upload.single('image'),sendMessages);
router.get('/getAllUsers/:id',getAllUsers);

export default router;
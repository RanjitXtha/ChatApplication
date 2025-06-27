import express from 'express';
import { protectedRoute } from '../middleware/protectedRoute.js';
import { getMessages, searchUser, sendMessages } from '../controllers/chat.controller.js';


const router = express.Router();


router.get("/users",protectedRoute,searchUser);
router.get("/message/:id",protectedRoute,getMessages);
router.post("/message/:id",protectedRoute,sendMessages);
export default router;
import express from 'express';
import { GetUser, Login,LogOut,Signup,UpdateProfile } from '../controllers/auth.controller.js';
import { protectedRoute } from '../middleware/protectedRoute.js';
import {upload} from '../middleware/upload.middleware.js'
const router = express.Router();

router.post('/login',Login);

router.post('/signup',upload.single('profilePic'),Signup);

router.post('/logout',LogOut);

router.get('/getUser',protectedRoute,GetUser);

router.put('/update',protectedRoute,upload.single('profilePic'),UpdateProfile);

export default router;

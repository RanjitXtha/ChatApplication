import express from 'express';
import { GetUser, Login,LogOut,Signup } from '../controllers/auth.controller.js';
import { protectedRoute } from '../middleware/protectedRoute.js';

const router = express.Router();

router.post('/login',Login);

router.post('/signup',Signup);

router.post('/logout',LogOut);

router.get('/getUser',protectedRoute,GetUser);

export default router;

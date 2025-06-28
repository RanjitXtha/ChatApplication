import express from 'express';
import dotenv from 'dotenv'
import { DBConnection } from './lib/database.js';
import authRouter from './routes/auth.route.js';
import chatRouter from './routes/chat.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
dotenv.config();
import {app,server} from './lib/socket.js'

const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use('/api/auth',authRouter);
app.use('/api/chat',chatRouter);

server.listen(PORT,()=>{
    DBConnection();
});
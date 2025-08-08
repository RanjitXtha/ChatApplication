import express from 'express';
import dotenv from 'dotenv'
import { DBConnection } from './lib/database.js';
import authRouter from './routes/auth.route.js';
import chatRouter from './routes/chat.route.js';
import groupRouter from './routes/group.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
dotenv.config();
import {app,server} from './lib/socket.js'

const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5172",
    credentials: true,
  })
);

app.use('/api/auth',authRouter);
app.use('/api/chat',chatRouter);
app.use('/api/group-chat',groupRouter);

server.listen(PORT,()=>{
    DBConnection();
});
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import userRouter from './routes/usserRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;
const mongoDBUrl = process.env.MONGO_URL;

//Parsing
app.use(express.json())
app.use(cookieParser());


//Cors
const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

//Middleware
app.use('/api/users',userRouter);

//MongoDB Connetion
const connectDB = async () => {
    try {
        await mongoose.connect(mongoDBUrl);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error in MongoDB connetion:",error);
    }
}

//listen to a port
app.listen(port,() => {
    connectDB();
    console.log(`Server running on the port ${port}`);
})
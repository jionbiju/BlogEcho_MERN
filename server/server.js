import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;
const mongoDBUrl = process.env.MONGO_URL;

//Parsing
app.use(express.json())

//Cors
app.use(cors());
const corsOption = {
    origin:'*',
    credential:true
}

app.use(cors(corsOption));


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
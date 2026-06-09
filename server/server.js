import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import userRouter from './routes/usserRoutes.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoDBUrl = process.env.MONGO_URL;

// ES module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS
const corsOptions = {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', userRouter);
app.use('/api/blog', postRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(mongoDBUrl);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error in MongoDB connection:", error);
        process.exit(1);
    }
};

// Start server
app.listen(port, async () => {
    await connectDB();
    console.log(`Server running on port ${port}`);
});

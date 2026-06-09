import express from 'express';
import multer from 'multer';
import path from 'path';
import {
    createUser,
    loginUser,
    logoutUser,
    getMe,
    updateProfile
} from '../controller/userController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

// Multer config for profile picture uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `avatar-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } // 2MB for avatars
});

// Public routes
router.post('/register', createUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, upload.single('profilePic'), updateProfile);

export default router;

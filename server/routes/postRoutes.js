import express from "express";
import multer from "multer";
import path from "path";
import {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    toggleLike,
    getPostsByUser
} from "../controller/postController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

// Multer config — save images to /uploads with original extension
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `post-${uniqueSuffix}${path.extname(file.originalname)}`);
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
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// Public routes
router.get('/posts', getAllPosts);
router.get('/posts/:id', getPostById);
router.get('/user/:userId', getPostsByUser);

// Protected routes
router.post('/createPost', protect, upload.single('image'), createPost);
router.put('/:id', protect, upload.single('image'), updatePost);
router.delete('/:id', protect, deletePost);
router.put('/:id/like', protect, toggleLike);

export default router;

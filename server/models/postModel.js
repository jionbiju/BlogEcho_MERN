import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, default: '' },
    content: { type: String, required: true },
    category: { type: String, default: 'General' },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
        required: true
    },
    publishDate: { type: Date, default: Date.now },
    readTime: { type: String, default: '1 min read' },
    image: { type: String, default: '' },
    tags: [String],
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'userModel' }]
}, { timestamps: true });

const postModel = mongoose.model('postModel', postSchema);

export default postModel;

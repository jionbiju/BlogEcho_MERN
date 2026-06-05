import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    excerpt: String,
    content: String,
    category: String,
    author: {
        name: String,
        avatar: String,
        role: String
    },
    publishDate: { type: Date, default: Date.now },
    readTime: String,
    image: String,
    tags: [String],
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 }
})

const postModel = mongoose.model('postModel',postSchema);

export default postModel;
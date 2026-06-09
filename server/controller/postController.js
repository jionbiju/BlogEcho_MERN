import postModel from "../models/postModel.js";
import path from 'path';


const generateSlug = (title) => {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
};


const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const mins = Math.ceil(wordCount / wordsPerMinute);
    return `${mins} min read`;
};

// GET /api/blog/posts  — all posts with pagination
export const getAllPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9;
        const category = req.query.category;
        const search = req.query.search;

        const query = {};
        if (category && category !== 'All') query.category = category;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { excerpt: { $regex: search, $options: 'i' } },
                { tags: { $in: [new RegExp(search, 'i')] } }
            ];
        }

        const total = await postModel.countDocuments(query);
        const posts = await postModel
            .find(query)
            .populate('author', 'username profilePic bio')
            .sort({ publishDate: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        return res.status(200).json({
            posts,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        console.log("Error fetching posts:", error);
        res.status(500).json({ error: error.message });
    }
};

// GET /api/blog/posts/:id
export const getPostById = async (req, res) => {
    try {
        const post = await postModel
            .findById(req.params.id)
            .populate('author', 'username profilePic bio');

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        
        post.views += 1;
        await post.save();

        return res.status(200).json(post);
    } catch (error) {
        console.log("Error fetching post:", error);
        res.status(500).json({ error: error.message });
    }
};

// POST /api/blog/createPost   create a new post 
export const createPost = async (req, res) => {
    try {
        const { title, excerpt, content, category, tags, readTime } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

       
        let imageUrl = '';
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }

        let tagsArray = [];
        if (tags) {
            tagsArray = typeof tags === 'string'
                ? tags.split(',').map(t => t.trim()).filter(Boolean)
                : tags;
        }

        let slug = generateSlug(title);
        const existing = await postModel.findOne({ slug });
        if (existing) {
            slug = `${slug}-${Date.now()}`;
        }

        const newPost = new postModel({
            title,
            slug,
            excerpt: excerpt || '',
            content,
            category: category || 'General',
            author: req.user._id,
            readTime: readTime || calculateReadTime(content),
            image: imageUrl,
            tags: tagsArray,
        });

        const savedPost = await newPost.save();
        const populated = await savedPost.populate('author', 'username profilePic');

        return res.status(201).json({ success: true, post: populated });
    } catch (error) {
        console.log("Error creating post:", error);
        res.status(500).json({ error: error.message });
    }
};

// PUT /api/blog/:id  — update a post 
export const updatePost = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to edit this post' });
        }

        const { title, excerpt, content, category, tags } = req.body;

        if (title) post.title = title;
        if (excerpt !== undefined) post.excerpt = excerpt;
        if (content) {
            post.content = content;
            post.readTime = calculateReadTime(content);
        }
        if (category) post.category = category;
        if (tags) {
            post.tags = typeof tags === 'string'
                ? tags.split(',').map(t => t.trim()).filter(Boolean)
                : tags;
        }
        if (req.file) {
            post.image = `/uploads/${req.file.filename}`;
        }

        const updated = await post.save();
        const populated = await updated.populate('author', 'username profilePic');

        return res.status(200).json({ success: true, post: populated });
    } catch (error) {
        console.log("Error updating post:", error);
        res.status(500).json({ error: error.message });
    }
};

// DELETE /api/blog/:id  
export const deletePost = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this post' });
        }

        await postModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({ success: true, message: 'Post deleted successfully' });
    } catch (error) {
        console.log("Error deleting post:", error);
        res.status(500).json({ error: error.message });
    }
};

// PUT /api/blog/:id/like  
export const toggleLike = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const userId = req.user._id.toString();
        const alreadyLiked = post.likedBy.map(id => id.toString()).includes(userId);

        if (alreadyLiked) {
            post.likedBy = post.likedBy.filter(id => id.toString() !== userId);
            post.likes = Math.max(0, post.likes - 1);
        } else {
            post.likedBy.push(req.user._id);
            post.likes += 1;
        }

        await post.save();
        return res.status(200).json({ likes: post.likes, liked: !alreadyLiked });
    } catch (error) {
        console.log("Error toggling like:", error);
        res.status(500).json({ error: error.message });
    }
};

// GET /api/blog/user/:userId 
export const getPostsByUser = async (req, res) => {
    try {
        const posts = await postModel
            .find({ author: req.params.userId })
            .populate('author', 'username profilePic')
            .sort({ publishDate: -1 });

        return res.status(200).json(posts);
    } catch (error) {
        console.log("Error fetching user posts:", error);
        res.status(500).json({ error: error.message });
    }
};

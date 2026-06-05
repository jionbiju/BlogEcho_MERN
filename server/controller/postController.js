import postModel from "../models/postModel.js";

//Create new post
export const createPost = async (req,res) => {
    try {
        const newPost = new postModel(req.body);
        const savedPost = await newPost.save();
        return res.status(200).json(savedPost);
    } catch (error) {
        console.log("Error in adding new blog:",error);
        res.status(500).json(error);
    }
}
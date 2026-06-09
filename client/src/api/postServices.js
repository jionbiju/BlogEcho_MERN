import axios from 'axios';
import { API_BASE_URL } from './config';

const axiosInstance = axios.create({
    baseURL: `${API_BASE_URL}/api/blog`,
    withCredentials: true
});

// Fetch all posts with optional filters
export const getAllPosts = async ({ page = 1, limit = 9, category = '', search = '' } = {}) => {
    try {
        const params = { page, limit };
        if (category && category !== 'All') params.category = category;
        if (search) params.search = search;

        const response = await axiosInstance.get('/posts', { params });
        return response.data;
    } catch (error) {
        console.log("Error fetching posts:", error);
        throw error;
    }
};

// Fetch a single post by ID
export const getPostById = async (id) => {
    try {
        const response = await axiosInstance.get(`/posts/${id}`);
        return response.data;
    } catch (error) {
        console.log("Error fetching post:", error);
        throw error;
    }
};

// Create a new post 
export const createPost = async (formData) => {
    try {
        const response = await axiosInstance.post('/createPost', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.log("Error creating post:", error);
        throw error;
    }
};

// Update a post
export const updatePost = async (id, formData) => {
    try {
        const response = await axiosInstance.put(`/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.log("Error updating post:", error);
        throw error;
    }
};

// Delete a post
export const deletePost = async (id) => {
    try {
        const response = await axiosInstance.delete(`/${id}`);
        return response.data;
    } catch (error) {
        console.log("Error deleting post:", error);
        throw error;
    }
};

// Toggle like on a post
export const toggleLike = async (id) => {
    try {
        const response = await axiosInstance.put(`/${id}/like`);
        return response.data;
    } catch (error) {
        console.log("Error toggling like:", error);
        throw error;
    }
};

// Get all posts by a specific user
export const getPostsByUser = async (userId) => {
    try {
        const response = await axiosInstance.get(`/user/${userId}`);
        return response.data;
    } catch (error) {
        console.log("Error fetching user posts:", error);
        throw error;
    }
};

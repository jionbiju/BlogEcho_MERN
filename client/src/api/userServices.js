import axios from 'axios';
import { API_BASE_URL } from './config';

const axiosInstance = axios.create({
    baseURL: `${API_BASE_URL}/api/users`,
    withCredentials: true
});

export const loginUser = async (credentials) => {
    try {
        const response = await axiosInstance.post('/login', credentials);
        return response.data;
    } catch (error) {
        console.log("Error in login:", error);
        throw error;
    }
};

export const registerUser = async (credentials) => {
    try {
        const response = await axiosInstance.post('/register', credentials);
        return response.data;
    } catch (error) {
        console.log("Error in signup:", error);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await axiosInstance.post('/logout');
        return response.data;
    } catch (error) {
        console.log("Error in logout:", error);
        throw error;
    }
};

// Check auth status — called on app startup to persist login across refresh
export const getMe = async () => {
    try {
        const response = await axiosInstance.get('/me');
        return response.data;
    } catch (error) {
        // 401 is expected when not logged in — don't log as error
        return null;
    }
};

// Update user profile
export const updateProfile = async (formData) => {
    try {
        const response = await axiosInstance.put('/profile', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        console.log("Error updating profile:", error);
        throw error;
    }
};

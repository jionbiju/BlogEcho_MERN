import axios from 'axios';

const axiosInstance = axios.create({
     baseURL:'http://localhost:5000/api/users',
     withCredentials:true
})

export const loginUser = async (credentials) => {
    try {
        const response = await axiosInstance.post('/login',credentials);
        return response.data;
    } catch (error) {
        console.log("Error in login:",error);
        throw error;
    }
}

export const registerUser = async (credentials) => {
    try {
        const response = await axiosInstance.post('/register',credentials);
        return response.data;
    } catch (error) {
        console.log("Error in signup:",error);
        throw error;
    }
}

export const logout = async () => {
    try {
        const response = await axiosInstance.post('/logout');
        return response.data;
    } catch (error) {
        console.log("Error in logout:",error);
    }
}
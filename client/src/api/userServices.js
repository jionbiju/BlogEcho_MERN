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
    }
}
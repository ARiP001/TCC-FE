import axios from 'axios';
import { BASE_URL } from '../utils';

// Create axios instance with base URL
const axiosInstance = axios.create({
    baseURL: BASE_URL
});

// Function to refresh token
const refreshToken = async () => {
    try {
        console.log("refresh token ini bosss");
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await axios.get(`${BASE_URL}/token`, {
            refreshToken: refreshToken
        });

        const { accessToken, newRefreshToken } = response.data;
        localStorage.setItem('token', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        
        return accessToken;
    } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/';
        throw error;
    }
};

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        console.log("axios instance ini");
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        
        const originalRequest = error.config;

        // If the error is 401 and we haven't tried to refresh the token yet
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Try to refresh the token
                const newToken = await refreshToken();
                
                // Update the authorization header
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                console.log("refresh token berhasil");
                // Retry the original request
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // If refresh token fails, redirect to login
                console.log("refresh token gagal");
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                window.location.href = '/';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance; 
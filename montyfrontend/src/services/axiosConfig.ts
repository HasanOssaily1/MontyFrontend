import axios from 'axios';
import AuthService from './AuthService';
import { useNavigate } from 'react-router-dom';

// Define the base URL and other configuration settings
const axiosInstance = axios.create({
    baseURL: 'https://localhost:55000/api/',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    config => {
        // Include auth token in headers if available
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    response => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        return response;
    },
    error => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        console.error('Error:', error.response?.status, error.message);
        // Handle specific error statuses (e.g., token expiration)
        if (error.response?.status === 401) {
            alert("token expired");
            try {
                AuthService.refreshtokens();
            } catch (error) {
                const navigate = useNavigate();
                navigate('/login', { replace: true });
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

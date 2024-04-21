import axiosInstance from './axiosConfig';

interface LoginCredentials {
    email: string;
    password: string;
}

interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

class AuthService {

    public async login(credentials: LoginCredentials): Promise<AuthResponse | null> {
        try {
            const response = await axiosInstance.post<AuthResponse>('auth/login', credentials);
            if (response.data) {
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                return response.data;
            }
            return null;
        } catch (error: any) {
            console.error('Authentication error:', error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || 'Failed to login');
        }
    }

    public async logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.reload();
    }

    public async refreshtokens(): Promise<AuthResponse | null> {
        try {

            const response = await axiosInstance.post<AuthResponse>('auth/refresh', {
                accessToken: localStorage.getItem('accessToken'),
                refreshToken: localStorage.getItem('refreshToken'),
            });
            if (response.data) {
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                return response.data;
            }
            return null;
        } catch (error: any) {
            console.error('Authentication error:', error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || 'refresh token failed');
        }
    }
}

export default new AuthService();






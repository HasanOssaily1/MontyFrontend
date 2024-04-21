import axiosInstance from './axiosConfig';

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    modificationdate: Date | null;
    creationdate: Date | null;
}



class UsersService {

    public async getAllUsers(): Promise<User[]> {
        try {
            const response = await axiosInstance.get<User[]>('Users');
            return response.data;
        } catch (error: any) {

            throw new Error(error.response?.data?.message || 'Failed to get all users');
        }
    }
    public async create(user: User): Promise<User> {
        try {
            const response = await axiosInstance.post<User>('users', user);
            return response.data;

        } catch (error: any) {
            console.error('create user error:', error.response?.data?.message || error.message);
            throw new Error(error || 'Failed to create user');
        }
    }
    public async edit(id: number, user: User): Promise<User> {
        try {
            const response = await axiosInstance.put<User>('users/'+id, user);
            return response.data;

        } catch (error: any) {
            console.error('create user error:', error.response?.data?.message || error.message);
            throw new Error(error || 'Failed to edit user');
        }
    }
    public async delete(id: number): Promise<boolean> {
        try {
            const response = await axiosInstance.delete('users/'+ id);
            return response.data;

        } catch (error: any) {
            console.error('create user error:', error.response?.data?.message || error.message);
            throw new Error(error || 'Failed to delete user');
        }
    }
}

export default new UsersService();






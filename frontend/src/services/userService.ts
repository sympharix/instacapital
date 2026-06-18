import api from './api';

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
}

export const userService = {
  // Fetch all users
  getUsers: async (): Promise<User[]> => {
    const response = await api.get('/users/management/');
    return response.data;
  },

  // Create a new internal user
  createUser: async (userData: any): Promise<User> => {
    const response = await api.post('/users/management/', userData);
    return response.data;
  },

  // Update an existing user's role
  updateUserRole: async (userId: number, role: string): Promise<User> => {
    const response = await api.patch(`/users/management/${userId}/`, { role });
    return response.data;
  }
};

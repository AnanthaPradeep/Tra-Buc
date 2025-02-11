// services/authService.ts
import axios from 'axios';

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

const API_URL = 'http://192.168.18.43:2510/auth'; // Use localhost if running locally

// loginUser function (services/authService.ts)
export const loginUser = async (userData: { email: string, password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { success: false, message: error.response.data.message || 'Something went wrong' };
    }
    return { success: false, message: 'Something went wrong' };
  }
};




// Update signUpUser to accept SignUpData type
export const signUpUser = async (userData: SignUpData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { success: false, message: error.response.data.message || 'Something went wrong' };
    }
    return { success: false, message: 'Something went wrong' };
  }
};

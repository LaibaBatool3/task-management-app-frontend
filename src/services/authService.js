import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/auth';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    if (response.data.data) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      localStorage.setItem('user_id', response.data.data.user.id);
    }
    return response.data.data;
  } catch (error) {
    if (error.response) {      
      throw new Error(error.response.data?.message || 'Registration failed');
    } else if (error.request) {
      throw new Error('Cannot connect to server. Make sure backend is running on http://localhost:5000');
    } else {
      throw new Error(error.message || 'Registration failed. Please try again.');
    }
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    if (response.data.data) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      localStorage.setItem('user_id', response.data.data.user.id);
    }
    return response.data.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data?.message || 'Invalid email or password');
    } else if (error.request) {
      throw new Error('Cannot connect to server. Make sure backend is running on http://localhost:5000');
    } else {
      throw new Error(error.message || 'Login failed. Please try again.');
    }
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user_id');
  localStorage.removeItem('user');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getUserId = () => {
  return localStorage.getItem('user_id');
};

export const getStoredUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};


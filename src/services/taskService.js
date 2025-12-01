import axios from 'axios';
import { getUserId } from './authService';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/tasks';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllTasks = async () => {
  try {
    const user_id = getUserId();
    if (!user_id) {
      throw new Error('User not logged in');
    }
    const response = await api.get(`/?user_id=${user_id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch tasks');
  }
};

export const getTaskById = async (id) => {
  try {
    const user_id = getUserId();
    if (!user_id) {
      throw new Error('User not logged in');
    }
    const response = await api.get(`/${id}?user_id=${user_id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch task');
  }
};

export const createTask = async (taskData) => {
  try {
    const user_id = getUserId();
    if (!user_id) {
      throw new Error('User not logged in');
    }
    const response = await api.post('/', { ...taskData, user_id });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create task');
  }
};
export const updateTask = async (id, taskData) => {
  try {
    const user_id = getUserId();
    if (!user_id) {
      throw new Error('User not logged in');
    }
    const response = await api.put(`/${id}`, { ...taskData, user_id });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update task');
  }
};

export const deleteTask = async (id) => {
  try {
    const user_id = getUserId();
    if (!user_id) {
      throw new Error('User not logged in');
    }
    await api.delete(`/${id}?user_id=${user_id}`);
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete task');
  }
};


import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const getTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks`);
  return response.data;
};

export const createTask = async (task: { title: string; description: string }) => {
  await axios.post(`${API_URL}/tasks`, task);
};

export const updateTask = async (id: string, task: { title: string; description: string }) => {
  await axios.put(`${API_URL}/tasks/${id}`, task);
};

export const deleteTask = async (id: string) => {
  await axios.delete(`${API_URL}/tasks/${id}`);
};

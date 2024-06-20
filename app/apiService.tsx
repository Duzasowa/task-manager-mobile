import axios from "axios";
import { Task } from "./types";

const API_URL = "http://localhost:5000/tasks";

export const createTask = async (taskData: Omit<Task, "id">): Promise<Task> => {
  const response = await axios.post<Task>(API_URL, taskData);
  return response.data;
};

export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>(API_URL);
  return response.data;
};

export const getTaskById = async (id: string): Promise<Task> => {
  const response = await axios.get<Task>(`${API_URL}/${id}`);
  return response.data;
};

export const updateTask = async (
  id: string,
  taskData: Partial<Omit<Task, "id">>
): Promise<Task> => {
  const response = await axios.put<Task>(`${API_URL}/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

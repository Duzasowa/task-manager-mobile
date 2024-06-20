import axios from "axios";
import { Task } from "./types";

const API_URL = "http://localhost:5000/tasks";

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error);
    return Promise.reject(error);
  }
);

export const createTask = async (taskData: Omit<Task, "id">): Promise<Task> => {
  try {
    const response = await apiClient.post<Task>("/", taskData);
    return response.data;
  } catch (error) {
    console.error("Failed to create task:", error);
    throw error;
  }
};

export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await apiClient.get<Task[]>("/");
    return response.data;
  } catch (error) {
    console.error("Failed to get tasks:", error);
    throw error;
  }
};

export const getTaskById = async (id: string): Promise<Task> => {
  try {
    const response = await apiClient.get<Task>(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to get task by ID:", error);
    throw error;
  }
};

export const updateTask = async (
  id: string,
  taskData: Partial<Omit<Task, "id">>
): Promise<Task> => {
  try {
    const response = await apiClient.put<Task>(`/${id}`, taskData);
    return response.data;
  } catch (error) {
    console.error("Failed to update task:", error);
    throw error;
  }
};

export const deleteTask = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/${id}`);
  } catch (error) {
    console.error("Failed to delete task:", error);
    throw error;
  }
};

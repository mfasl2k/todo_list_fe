import api from "./api";
import { Task, CreateTaskDTO, UpdateTaskDTO } from "../types/task.types";

export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await api.get<Task[]>("/api/tasks/");
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks");
  }
};

export const getTaskById = async (taskId: number): Promise<Task> => {
  try {
    const response = await api.get<Task>(`/api/tasks/${taskId}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching task ${taskId}:`, error);
    throw new Error("Failed to fetch task");
  }
};

export const createTask = async (taskData: CreateTaskDTO): Promise<Task> => {
  try {
    const response = await api.post<Task>("/api/tasks/", taskData);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Failed to create task");
  }
};

export const updateTask = async (
  taskId: number,
  taskData: UpdateTaskDTO
): Promise<Task> => {
  try {
    const response = await api.patch<Task>(`/api/tasks/${taskId}/`, taskData);
    return response.data;
  } catch (error) {
    console.error(`Error updating task ${taskId}:`, error);
    throw new Error("Failed to update task");
  }
};

// Delete a task
export const deleteTask = async (taskId: number): Promise<void> => {
  try {
    await api.delete(`/api/tasks/${taskId}/`);
  } catch (error) {
    console.error(`Error deleting task ${taskId}:`, error);
    throw new Error("Failed to delete task");
  }
};

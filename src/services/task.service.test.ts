import { describe, it, expect, beforeEach, vi } from "vitest";
import api from "./api";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "./task.service";
import {
  Task,
  CreateTaskDTO,
  UpdateTaskDTO,
  TaskPriority,
  TaskStatus,
} from "../types/task.types";

// Mock the API module
vi.mock("./api", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

// Sample task data for testing
const mockTasks: Task[] = [
  {
    id: 1,
    title: "Task 1",
    description: "Description 1",
    priority: TaskPriority.MEDIUM,
    status: TaskStatus.PENDING,
    created_at: "2025-04-01T10:00:00Z",
    updated_at: "2025-04-01T10:00:00Z",
    user: 1,
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description 2",
    priority: TaskPriority.HIGH,
    status: TaskStatus.IN_PROGRESS,
    created_at: "2025-04-02T10:00:00Z",
    updated_at: "2025-04-02T10:00:00Z",
    user: 1,
  },
];

const mockTask: Task = mockTasks[0];

const mockCreateTaskDTO: CreateTaskDTO = {
  title: "New Task",
  description: "New Description",
  priority: TaskPriority.LOW,
  status: TaskStatus.PENDING,
};

const mockUpdateTaskDTO: UpdateTaskDTO = {
  title: "Updated Task",
  priority: TaskPriority.HIGH,
  status: TaskStatus.COMPLETED,
};

describe("Task Service", () => {
  // Reset mocks before each test
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("getTasks", () => {
    it("should fetch all tasks successfully", async () => {
      // Arrange
      vi.mocked(api.get).mockResolvedValueOnce({ data: mockTasks });

      // Act
      const result = await getTasks();

      // Assert
      expect(api.get).toHaveBeenCalledWith("/api/tasks/");
      expect(result).toEqual(mockTasks);
    });

    it("should throw an error when the API call fails", async () => {
      // Arrange
      const errorMessage = "Network Error";
      vi.mocked(api.get).mockRejectedValueOnce(new Error(errorMessage));

      // Act & Assert
      await expect(getTasks()).rejects.toThrow("Failed to fetch tasks");
      expect(api.get).toHaveBeenCalledWith("/api/tasks/");
    });
  });

  describe("getTaskById", () => {
    it("should fetch a task by ID successfully", async () => {
      // Arrange
      vi.mocked(api.get).mockResolvedValueOnce({ data: mockTask });
      const taskId = 1;

      // Act
      const result = await getTaskById(taskId);

      // Assert
      expect(api.get).toHaveBeenCalledWith(`/api/tasks/${taskId}/`);
      expect(result).toEqual(mockTask);
    });

    it("should throw an error when the API call fails", async () => {
      // Arrange
      const errorMessage = "Network Error";
      vi.mocked(api.get).mockRejectedValueOnce(new Error(errorMessage));
      const taskId = 999;

      // Act & Assert
      await expect(getTaskById(taskId)).rejects.toThrow("Failed to fetch task");
      expect(api.get).toHaveBeenCalledWith(`/api/tasks/${taskId}/`);
    });
  });

  describe("createTask", () => {
    it("should create a task successfully", async () => {
      // Arrange
      const createdTask: Task = {
        ...mockCreateTaskDTO,
        id: 3,
        created_at: "2025-04-03T10:00:00Z",
        updated_at: "2025-04-03T10:00:00Z",
        user: 1,
      };
      vi.mocked(api.post).mockResolvedValueOnce({ data: createdTask });

      // Act
      const result = await createTask(mockCreateTaskDTO);

      // Assert
      expect(api.post).toHaveBeenCalledWith("/api/tasks/", mockCreateTaskDTO);
      expect(result).toEqual(createdTask);
    });

    it("should throw an error when the API call fails", async () => {
      // Arrange
      const errorMessage = "Bad Request";
      vi.mocked(api.post).mockRejectedValueOnce(new Error(errorMessage));

      // Act & Assert
      await expect(createTask(mockCreateTaskDTO)).rejects.toThrow(
        "Failed to create task"
      );
      expect(api.post).toHaveBeenCalledWith("/api/tasks/", mockCreateTaskDTO);
    });
  });

  describe("updateTask", () => {
    it("should update a task successfully", async () => {
      // Arrange
      const taskId = 1;
      const updatedTask: Task = {
        ...mockTask,
        title: mockUpdateTaskDTO.title || mockTask.title,
        priority: mockUpdateTaskDTO.priority || mockTask.priority,
        status: mockUpdateTaskDTO.status || mockTask.status,
        updated_at: "2025-04-03T15:00:00Z",
      };
      vi.mocked(api.patch).mockResolvedValueOnce({ data: updatedTask });

      // Act
      const result = await updateTask(taskId, mockUpdateTaskDTO);

      // Assert
      expect(api.patch).toHaveBeenCalledWith(
        `/api/tasks/${taskId}/`,
        mockUpdateTaskDTO
      );
      expect(result).toEqual(updatedTask);
    });

    it("should throw an error when the API call fails", async () => {
      // Arrange
      const taskId = 999;
      const errorMessage = "Not Found";
      vi.mocked(api.patch).mockRejectedValueOnce(new Error(errorMessage));

      // Act & Assert
      await expect(updateTask(taskId, mockUpdateTaskDTO)).rejects.toThrow(
        "Failed to update task"
      );
      expect(api.patch).toHaveBeenCalledWith(
        `/api/tasks/${taskId}/`,
        mockUpdateTaskDTO
      );
    });
  });

  describe("deleteTask", () => {
    it("should delete a task successfully", async () => {
      // Arrange
      const taskId = 1;
      vi.mocked(api.delete).mockResolvedValueOnce({});

      // Act
      await deleteTask(taskId);

      // Assert
      expect(api.delete).toHaveBeenCalledWith(`/api/tasks/${taskId}/`);
    });

    it("should throw an error when the API call fails", async () => {
      // Arrange
      const taskId = 999;
      const errorMessage = "Not Found";
      vi.mocked(api.delete).mockRejectedValueOnce(new Error(errorMessage));

      // Act & Assert
      await expect(deleteTask(taskId)).rejects.toThrow("Failed to delete task");
      expect(api.delete).toHaveBeenCalledWith(`/api/tasks/${taskId}/`);
    });
  });
});

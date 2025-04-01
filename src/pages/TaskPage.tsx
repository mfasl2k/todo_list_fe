import React, { useEffect, useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import TaskList from "../components/tasks/TaskList";
import {
  Task,
  CreateTaskDTO,
  UpdateTaskDTO,
  TaskStatus,
} from "../types/task.types";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/task.service";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";
import Navbar from "../components/layouts/NavBar";

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const tasksData = await getTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to load tasks. Please try again later.");
      toast.error("Failed to load tasks");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (taskData: CreateTaskDTO) => {
    try {
      setError(null);
      const newTask = await createTask(taskData);
      setTasks([...tasks, newTask]);
      toast.success("Task created successfully");
    } catch (error) {
      console.error("Error creating task:", error);
      setError("Failed to create task. Please try again.");
      toast.error("Failed to create task");
      throw error;
    }
  };

  const handleUpdateTask = async (taskId: number, taskData: UpdateTaskDTO) => {
    try {
      setError(null);
      const updatedTask = await updateTask(taskId, taskData);
      setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
      toast.success("Task updated successfully");
    } catch (error) {
      console.error(`Error updating task ${taskId}:`, error);
      setError("Failed to update task. Please try again.");
      toast.error("Failed to update task");
      throw error;
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      setError(null);
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error(`Error deleting task ${taskId}:`, error);
      setError("Failed to delete task. Please try again.");
      toast.error("Failed to delete task");
      throw error;
    }
  };

  const handleStatusChange = async (taskId: number, status: TaskStatus) => {
    await handleUpdateTask(taskId, { status });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome message */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome, {user?.username || "User"}
          </h1>
          <p className="text-gray-600">Manage your tasks and stay organized.</p>
        </div>

        {/* Error alert */}
        {error && (
          <div
            className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <div className="flex items-center">
              <FiAlertCircle className="h-5 w-5 mr-2" />
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Task list */}
        <TaskList
          tasks={tasks}
          isLoading={isLoading}
          onCreateTask={handleCreateTask}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
};

export default TasksPage;

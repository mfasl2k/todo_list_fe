import React, { useState } from "react";
import { FiSearch, FiPlus } from "react-icons/fi";

import TaskForm from "./TaskForm";
import {
  Task,
  TaskPriority,
  TaskStatus,
  CreateTaskDTO,
  UpdateTaskDTO,
} from "../../types/task.types";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onCreateTask: (task: CreateTaskDTO) => Promise<void>;
  onUpdateTask: (taskId: number, task: UpdateTaskDTO) => Promise<void>;
  onDeleteTask: (taskId: number) => Promise<void>;
  onStatusChange?: (taskId: number, status: TaskStatus) => Promise<void>;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  isLoading,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
  onStatusChange,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setTaskToEdit(null);
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (values: CreateTaskDTO) => {
    if (taskToEdit) {
      await onUpdateTask(taskToEdit.id, values);
    } else {
      await onCreateTask(values);
    }
  };

  const handleStatusUpdate = async (taskId: number, status: TaskStatus) => {
    if (onStatusChange) {
      await onStatusChange(taskId, status);
    } else {
      await onUpdateTask(taskId, { status });
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriority =
      priorityFilter === "ALL" || task.priority === priorityFilter;

    const matchesStatus =
      statusFilter === "ALL" ||
      task.status === statusFilter ||
      (!task.status && statusFilter === "NONE");

    return matchesSearch && matchesPriority && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <button
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          onClick={handleOpenDialog}
        >
          <FiPlus className="mr-2" />
          Create Task
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search tasks..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="ALL">All Priorities</option>
            <option value={TaskPriority.LOW}>Low</option>
            <option value={TaskPriority.MEDIUM}>Medium</option>
            <option value={TaskPriority.HIGH}>High</option>
          </select>

          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Statuses</option>
            <option value="NONE">No Status</option>
            <option value={TaskStatus.PENDING}>Pending</option>
            <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
            <option value={TaskStatus.COMPLETED}>Completed</option>
          </select>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 space-y-4">
          <p className="text-gray-500">No tasks found</p>
          <button
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            onClick={handleOpenDialog}
          >
            <FiPlus className="mr-2" />
            Create your first task
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEditTask}
              onDelete={onDeleteTask}
              onStatusChange={handleStatusUpdate}
            />
          ))}
        </div>
      )}

      <TaskForm
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        initialData={taskToEdit || undefined}
      />
    </div>
  );
};

export default TaskList;

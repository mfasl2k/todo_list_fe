import React, { useState, useRef } from "react";
import { Task, TaskPriority, TaskStatus } from "../../types/task.types";
import {
  FiEdit,
  FiTrash2,
  FiCheck,
  FiClock,
  FiChevronDown,
} from "react-icons/fi";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onStatusChange?: (taskId: number, status: TaskStatus) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the menu to close it
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const renderPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.LOW:
        return (
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
            Low
          </span>
        );
      case TaskPriority.MEDIUM:
        return (
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">
            Medium
          </span>
        );
      case TaskPriority.HIGH:
        return (
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-xs font-medium">
            High
          </span>
        );
      default:
        return null;
    }
  };

  const renderStatusBadge = (status?: TaskStatus) => {
    if (!status) return null;

    switch (status) {
      case TaskStatus.PENDING:
        return (
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-xs font-medium">
            Pending
          </span>
        );
      case TaskStatus.IN_PROGRESS:
        return (
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-xs font-medium">
            In Progress
          </span>
        );
      case TaskStatus.COMPLETED:
        return (
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-medium">
            Completed
          </span>
        );
      default:
        return null;
    }
  };

  const formattedDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-2 line-clamp-1">
            {task.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {task.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {renderPriorityBadge(task.priority)}
            {renderStatusBadge(task.status)}
          </div>

          <p className="text-xs text-gray-500 mt-3">
            Created: {formattedDate(task.created_at)}
          </p>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            className="p-1 rounded-full hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Task actions"
          >
            <FiChevronDown className="h-5 w-5 text-gray-500" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <div className="py-1">
                <button
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => {
                    onEdit(task);
                    setMenuOpen(false);
                  }}
                >
                  <FiEdit className="mr-2 h-4 w-4" /> Edit
                </button>
                <button
                  className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                  onClick={() => {
                    onDelete(task.id);
                    setMenuOpen(false);
                  }}
                >
                  <FiTrash2 className="mr-2 h-4 w-4" /> Delete
                </button>

                {onStatusChange && task.status !== TaskStatus.IN_PROGRESS && (
                  <button
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => {
                      onStatusChange(task.id, TaskStatus.IN_PROGRESS);
                      setMenuOpen(false);
                    }}
                  >
                    <FiClock className="mr-2 h-4 w-4" /> Mark as In Progress
                  </button>
                )}

                {onStatusChange && task.status !== TaskStatus.COMPLETED && (
                  <button
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => {
                      onStatusChange(task.id, TaskStatus.COMPLETED);
                      setMenuOpen(false);
                    }}
                  >
                    <FiCheck className="mr-2 h-4 w-4" /> Mark as Completed
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

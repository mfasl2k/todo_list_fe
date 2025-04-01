import React from "react";
import { useFormik } from "formik";
import { z } from "zod";
import {
  Task,
  TaskPriority,
  TaskStatus,
  CreateTaskDTO,
} from "../../types/task.types";

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: CreateTaskDTO) => Promise<void>;
  initialData?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  if (!isOpen) return null;

  const isEditMode = !!initialData;

  const taskSchema = z.object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(100, "Title must be at most 100 characters"),
    description: z
      .string()
      .min(1, "Description is required")
      .max(500, "Description must be at most 500 characters"),
    priority: z.nativeEnum(TaskPriority, {
      errorMap: () => ({ message: "Invalid priority" }),
    }),
    status: z
      .nativeEnum(TaskStatus, {
        errorMap: () => ({ message: "Invalid status" }),
      })
      .optional(),
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formik = useFormik({
    initialValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      priority: initialData?.priority || TaskPriority.MEDIUM,
      status: initialData?.status || undefined,
    },
    validate: (values) => {
      try {
        taskSchema.parse(values);
        return {};
      } catch (error) {
        if (error instanceof z.ZodError) {
          return error.errors.reduce((acc, err) => {
            if (err.path) {
              const path = err.path[0] as string;
              acc[path] = err.message;
            }
            return acc;
          }, {} as Record<string, string>);
        }
        return {};
      }
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await onSubmit(values);
        resetForm();
        onClose();
      } catch (error) {
        console.error("Form submission error:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-4 mx-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">
              {isEditMode ? "Edit Task" : "Create New Task"}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="mb-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter task title"
                {...formik.getFieldProps("title")}
              />
              {formik.touched.title && formik.errors.title && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.title}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter task description"
                {...formik.getFieldProps("description")}
              />
              {formik.touched.description && formik.errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.description}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Priority <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                {...formik.getFieldProps("priority")}
              >
                <option value={TaskPriority.LOW}>Low</option>
                <option value={TaskPriority.MEDIUM}>Medium</option>
                <option value={TaskPriority.HIGH}>High</option>
              </select>
              {formik.touched.priority && formik.errors.priority && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.priority}
                </p>
              )}
            </div>

            {isEditMode && (
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  {...formik.getFieldProps("status")}
                >
                  <option value={TaskStatus.PENDING}>Pending</option>
                  <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
                  <option value={TaskStatus.COMPLETED}>Completed</option>
                </select>
                {formik.touched.status && formik.errors.status && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.status}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`
                px-4 py-2 bg-blue-500 text-white rounded-md 
                hover:bg-blue-600 transition
                ${formik.isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
              `}
              disabled={formik.isSubmitting}
            >
              {isEditMode ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;

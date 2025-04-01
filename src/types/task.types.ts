export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: TaskPriority;
  status?: TaskStatus;
  created_at: string;
  updated_at: string;
  user?: number;
}

export interface CreateTaskDTO {
  title: string;
  description: string;
  priority: TaskPriority;
  status?: TaskStatus;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
}

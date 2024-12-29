import { TaskModel } from "@/models/TaskModel";

export type TaskContextType ={
  tasks: TaskModel[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (task: Omit<TaskModel, "id">) => Promise<void>;
  updateTask: (id: string, task: Partial<TaskModel>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}
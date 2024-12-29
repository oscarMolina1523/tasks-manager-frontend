import { TaskModel } from "@/models/TaskModel";

const API_URL = "https://task-manager-backend-production-23f2.up.railway.app/api";

export const TaskService = {
  async getAllTasks(): Promise<TaskModel[]> {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener las tareas: ${response.statusText}`);
    }

    return response.json();
  },

  async getTaskById(id: string): Promise<TaskModel> {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "GET",
      mode: 'cors',
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener la tarea: ${response.statusText}`);
    }

    return response.json();
  },

  async createTask(task: Omit<TaskModel, "_id">): Promise<TaskModel> {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error(`Error al crear la tarea: ${response.statusText}`);
    }

    return response.json();
  },

  async updateTask(id: string, task: Partial<TaskModel>): Promise<TaskModel> {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar la tarea: ${response.statusText}`);
    }

    return response.json();
  },

  async deleteTask(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar la tarea: ${response.statusText}`);
    }
  }
}
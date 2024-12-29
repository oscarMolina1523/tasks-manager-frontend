import { TaskModel } from "@/models/TaskModel";
import { TaskService } from "@/services/TaskService";
import { createContext, useContext, useEffect, useState } from "react";
import { TaskContextType } from "./TypesContext";

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Proveedor del contexto
export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<TaskModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = async () => {
        setLoading(true);
        setError(null);
        try {
            const tasksData = await TaskService.getAllTasks();
            setTasks(tasksData);
        } catch {
            setError("Error al cargar las tareas");
        } finally {
            setLoading(false);
        }
    };

    const createTask = async (task: Omit<TaskModel, "_id">) => {
        try {
            await TaskService.createTask(task);
            await fetchTasks(); 
        } catch {
            setError("Error al crear la tarea");
        }
    };

    const updateTask = async (id: string, task: Partial<TaskModel>) => {
        try {
            await TaskService.updateTask(id, task);
            await fetchTasks(); 
        } catch {
            setError("Error al actualizar la tarea");
        }
    };

    const deleteTask = async (id: string) => {
        try {
            await TaskService.deleteTask(id);
            await fetchTasks();
        } catch {
            setError("Error al eliminar la tarea");
        }
    };

    useEffect(() => {
        fetchTasks(); 
    }, []);

    return (
        <TaskContext.Provider value={{ tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error("useTaskContext must be used within a TaskProvider");
    }
    return context;
};
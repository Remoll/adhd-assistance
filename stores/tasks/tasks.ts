import { Task, TaskInitials } from "@/components/tasks/types";
import { create } from "zustand";
import axios from "axios";

interface TaskStore {
  tasks: Task[];
  fetchTasks: () => void;
  addTask: (task: TaskInitials) => void;
  toggleTaskCompletion: (taskId: string) => void;
  editTask: (taskId: string, newTaskData: TaskInitials) => void;
  removeTask: (taskId: string) => void;
}

const TASK_URL = "/api/tasks";

const useTasksStore = create<TaskStore>((set) => ({
  tasks: [],
  fetchTasks: async () => {
    try {
      const { data } = await axios.get(TASK_URL);
      set({ tasks: data });
    } catch (error) {
      console.error("Błąd pobierania zadań:", error);
    }
  },
  addTask: async (task) => {
    try {
      const { data } = await axios.post(TASK_URL, task);

      set((state) => ({ tasks: [...state.tasks, data] }));
    } catch (error) {
      console.error("Błąd dodawania zadania:", error);
    }
  },
  toggleTaskCompletion: async (taskId: string) => {
    try {
      const { data } = await axios.get(`${TASK_URL}/${taskId}`);

      const newTaskData = { ...data, completed: !data.completed };

      await axios.put(`${TASK_URL}/${taskId}`, newTaskData);

      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId ? { ...task, ...newTaskData } : task
        ),
      }));
    } catch (error) {
      console.error("Błąd pobierania zadania:", error);
    }
  },
  editTask: async (taskId, newTaskData) => {
    try {
      await axios.put(`${TASK_URL}/${taskId}`, newTaskData);
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId ? { ...task, ...newTaskData } : task
        ),
      }));
    } catch (error) {
      console.error("Błąd edycji zadania:", error);
    }
  },
  removeTask: async (taskId: string) => {
    try {
      await axios.delete(`${TASK_URL}/${taskId}`);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== taskId),
      }));
    } catch (error) {
      console.error("Błąd usuwania zadania:", error);
    }
  },
}));

export { useTasksStore };

import { Task, TaskInitials } from "@/components/tasks/types";
import { create } from "zustand";
import {
  handleAddTasks,
  handleEditTask,
  handleFetchTasks,
  handleRemoveTask,
  handleToggleTaskCompletion,
} from "./utils";

interface TaskStore {
  tasks: Task[];
  fetchTasks: () => void;
  addTask: (task: TaskInitials) => void;
  toggleTaskCompletion: (taskId: string) => void;
  editTask: (taskId: string, taskNewData: TaskInitials) => void;
  removeTask: (taskId: string) => void;
}

const useTasksStore = create<TaskStore>((set) => ({
  tasks: [],

  fetchTasks: async () => {
    const tasks = await handleFetchTasks();
    set({ tasks });
  },

  addTask: async (task) => {
    const addedTask = await handleAddTasks(task);
    set((state) => ({ tasks: [...state.tasks, addedTask] }));
  },

  toggleTaskCompletion: async (taskId: string) => {
    const taskNewData = await handleToggleTaskCompletion(taskId);
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...taskNewData } : task
      ),
    }));
  },

  editTask: async (taskId, taskNewData) => {
    await handleEditTask(taskId, taskNewData);
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...taskNewData } : task
      ),
    }));
  },

  removeTask: async (taskId: string) => {
    await handleRemoveTask(taskId);
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    }));
  },
}));

export { useTasksStore };

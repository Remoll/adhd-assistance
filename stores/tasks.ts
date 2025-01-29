import { Task } from "@/components/tasks/types";
import { create } from "zustand";

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  toggleTaskCompletion: (taskId: string) => void;
  removeTask: (taskId: string) => void;
}

const useTasksStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  toggleTaskCompletion: (taskId: string) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    })),
  removeTask: (taskId: string) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
}));

export { useTasksStore };

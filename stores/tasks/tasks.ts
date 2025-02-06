import { Task, TaskInitials } from "@/components/tasks/types";
import { create } from "zustand";
import axiosRequestHandler from "@/services/axiosRequestHandler/axiosRequestHandler";
import { AxiosMethod } from "@/services/types";

interface TaskStore {
  tasks: Task[];
  fetchTasks: () => void;
  addTask: (task: TaskInitials) => void;
  toggleTaskCompletion: (taskId: string) => void;
  editTask: (taskId: string, taskNewData: TaskInitials) => void;
  removeTask: (taskId: string) => void;
}

const TASK_URL = "/api/tasks";

const useTasksStore = create<TaskStore>((set) => ({
  tasks: [],

  fetchTasks: async () => {
    const { data, error } = await axiosRequestHandler<Task[]>(
      AxiosMethod.get,
      TASK_URL
    );

    if (error) {
      throw new Error(error);
    }

    set({ tasks: data ?? [] });
  },

  addTask: async (task) => {
    const { data, error } = await axiosRequestHandler<Task[], TaskInitials>(
      AxiosMethod.post,
      TASK_URL,
      task
    );

    if (error) {
      throw new Error(error);
    }

    const addedTask = data?.[0];

    if (!addedTask) {
      throw new Error("Can't find added task in server response");
    }

    set((state) => ({ tasks: [...state.tasks, addedTask] }));
  },

  toggleTaskCompletion: async (taskId: string) => {
    const { data: getData, error: getError } = await axiosRequestHandler<Task>(
      AxiosMethod.get,
      `${TASK_URL}/${taskId}`
    );

    if (getError) {
      throw new Error(getError);
    }

    if (!getData) {
      throw new Error("Can't find task in server");
    }

    const taskNewData = { ...getData, completed: !getData.completed };

    const { error: putError } = await axiosRequestHandler<Task>(
      AxiosMethod.put,
      `${TASK_URL}/${taskId}`,
      taskNewData
    );

    if (putError) {
      throw new Error(putError);
    }

    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...taskNewData } : task
      ),
    }));
  },

  editTask: async (taskId, taskNewData) => {
    const { error } = await axiosRequestHandler<TaskInitials>(
      AxiosMethod.put,
      `${TASK_URL}/${taskId}`,
      taskNewData
    );

    if (error) {
      throw new Error(error);
    }

    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...taskNewData } : task
      ),
    }));
  },

  removeTask: async (taskId: string) => {
    const { data: getData, error: getError } = await axiosRequestHandler<Task>(
      AxiosMethod.get,
      `${TASK_URL}/${taskId}`
    );

    if (getError) {
      throw new Error(getError);
    }

    if (!getData) {
      throw new Error("Can't find task in server");
    }

    const { error: deleteError } = await axiosRequestHandler<TaskInitials>(
      AxiosMethod.delete,
      `${TASK_URL}/${taskId}`
    );

    if (deleteError) {
      throw new Error(deleteError);
    }

    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    }));
  },
}));

export { useTasksStore };

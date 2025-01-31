import { Task } from "@/components/tasks/types";
import { supabase } from "@/utils/supabaseClient";
import { create } from "zustand";

interface TaskStore {
  tasks: Task[];
  fetchTasks: () => void;
  addTask: (task: Task) => void;
  toggleTaskCompletion: (taskId: string) => void;
  removeTask: (taskId: string) => void;
}

const useTasksStore = create<TaskStore>((set) => ({
  tasks: [],
  fetchTasks: async () => {
    const { data, error } = await supabase.from("tasks").select("*");
    if (error) {
      console.error("Błąd pobierania zadań:", error);
    } else {
      set({ tasks: data });
    }
  },
  addTask: async (task) => {
    const newTask = {
      due_date: task.dueDate,
      priority: task.priority,
      title: task.title,
    };

    const { data, error } = await supabase
      .from("tasks")
      .insert([newTask])
      .select();
    if (error) {
      console.error("Błąd dodawania zadania:", error);
    } else {
      set((state) => ({ tasks: [...state.tasks, ...data] }));
    }
  },
  toggleTaskCompletion: async (taskId: string) => {
    const { data, error } = await supabase
      .from("tasks")
      .select("completed")
      .eq("id", taskId)
      .single();

    if (error) {
      console.error("Błąd pobierania zadania:", error);
      return;
    }

    const updatedTask = { completed: !data.completed };

    const { error: updateError } = await supabase
      .from("tasks")
      .update(updatedTask)
      .eq("id", taskId);

    if (updateError) {
      console.error("Błąd aktualizacji zadania:", updateError);
    } else {
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId
            ? { ...task, completed: updatedTask.completed }
            : task
        ),
      }));
    }
  },
  removeTask: async (taskId: string) => {
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", taskId);

      if (error) {
        throw new Error("Błąd usuwania zadania");
      } else {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        }));
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
}));

export { useTasksStore };

import { Task, TaskInitials } from "@/components/tasks/types";
import { supabase } from "@/utils/supabaseClient";

const TABLE = "tasks";

const fetchTasks = async (): Promise<Task[] | null> => {
  const { data, error } = await supabase.from(TABLE).select("*");
  if (error) {
    console.error("Błąd pobierania zadań:", error.message);
    return null;
  }
  return data;
};

const fetchTaskById = async (taskId: string): Promise<Task | null> => {
  try {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", taskId)
      .single();

    if (error) {
      console.error(`Błąd pobierania zadania o ID ${taskId}:`, error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Błąd getTaskById:", error);
    return null;
  }
};

const addTask = async (task: TaskInitials): Promise<Task | null> => {
  const { data, error } = await supabase.from(TABLE).insert([task]).select();
  if (error) {
    console.error("Błąd dodawania zadania:", error.message);
    return null;
  }
  return data ? data[0] : null;
};

const editTask = async (
  taskId: string,
  updatedData: TaskInitials
): Promise<boolean> => {
  const { error } = await supabase
    .from(TABLE)
    .update(updatedData)
    .eq("id", taskId);
  if (error) {
    console.error("Błąd edycji zadania:", error.message);
    return false;
  }
  return true;
};

const removeTask = async (taskId: string): Promise<boolean> => {
  const { error } = await supabase.from(TABLE).delete().eq("id", taskId);
  if (error) {
    console.error("Błąd usuwania zadania:", error.message);
    return false;
  }
  return true;
};

export { fetchTasks, fetchTaskById, addTask, editTask, removeTask };

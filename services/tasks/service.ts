import { Task, TaskInitials } from "@/components/tasks/types";
import supabase from "@/utils/supabase/supabaseClient";
import responseHandler from "../responseHandler";
import { Result } from "../types";

const TABLE = "tasks";

const fetchTasks = async (): Promise<Result<Task[]>> => {
  const response = await supabase.from(TABLE).select("*");
  return responseHandler<Task[]>(response);
};

const fetchTaskById = async (taskId: string): Promise<Result<Task | null>> => {
  const response = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", taskId)
    .single();
  return responseHandler<Task>(response);
};

const addTask = async (task: TaskInitials): Promise<Result<Task | null>> => {
  const response = await supabase.from(TABLE).insert([task]).select();
  return responseHandler<Task>(response);
};

const editTask = async (
  taskId: string,
  updatedData: TaskInitials
): Promise<Result<Task | null>> => {
  const response = await supabase
    .from(TABLE)
    .update(updatedData)
    .eq("id", taskId);
  return responseHandler<null>(response);
};

const removeTask = async (taskId: string): Promise<Result<Task | null>> => {
  const response = await supabase.from(TABLE).delete().eq("id", taskId);
  return responseHandler<Task | null>(response);
};

export { fetchTasks, fetchTaskById, addTask, editTask, removeTask };

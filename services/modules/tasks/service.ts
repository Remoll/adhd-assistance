import { Task, TaskInitials } from "@/components/tasks/types";
import supabase from "@/utils/supabase/supabaseClient";
import { Result } from "../../types";
import dbResponseHandler from "@/services/dbResponseHandler/dbResponseHandler";

const TABLE = "tasks";

const getTasksFromDb = async (): Promise<Result<Task[]>> => {
  const response = await supabase.from(TABLE).select("*");
  return dbResponseHandler<Task[]>(response);
};

const getTaskFromDbById = async (
  taskId: string
): Promise<Result<Task | null>> => {
  const response = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", taskId)
    .single();
  return dbResponseHandler<Task>(response);
};

const addTaskToDb = async (
  task: TaskInitials
): Promise<Result<Task | null>> => {
  const response = await supabase.from(TABLE).insert([task]).select();
  return dbResponseHandler<Task>(response);
};

const editTaskInDb = async (
  taskId: string,
  updatedData: TaskInitials
): Promise<Result<Task | null>> => {
  const response = await supabase
    .from(TABLE)
    .update(updatedData)
    .eq("id", taskId);
  return dbResponseHandler<null>(response);
};

const removeTaskFromDb = async (
  taskId: string
): Promise<Result<Task | null>> => {
  const response = await supabase.from(TABLE).delete().eq("id", taskId);
  return dbResponseHandler<Task | null>(response);
};

export {
  getTasksFromDb,
  getTaskFromDbById,
  addTaskToDb,
  editTaskInDb,
  removeTaskFromDb,
};

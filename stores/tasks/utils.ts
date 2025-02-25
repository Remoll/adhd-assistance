import { Task, TaskInitials } from "@/components/tasks/types";
import axiosRequestHandler from "@/services/axiosRequestHandler/axiosRequestHandler";
import { AxiosMethod } from "@/services/types";

const TASK_URL = "/api/tasks";

const handleTasksRequest = async <T, U = T>(
  method: AxiosMethod,
  id?: string,
  payload?: U | T
): Promise<T | null> => {
  const url = id ? `${TASK_URL}/${id}` : TASK_URL;
  const data = await axiosRequestHandler<T, U>(method, url, payload);
  return data;
};

const handleFetchTaskById = async (taskId: string): Promise<Task> => {
  const task = await handleTasksRequest<Task>(AxiosMethod.get, taskId);
  if (!task) {
    throw new Error("Can't find task in server");
  }
  return task;
};

const handleFetchTasks = async (): Promise<Task[]> => {
  const responseData = await handleTasksRequest<Task[]>(AxiosMethod.get);
  if (!responseData) {
    throw new Error("Can't find tasks");
  }
  return responseData;
};

const handleAddTasks = async (task: TaskInitials): Promise<Task> => {
  const responseData = await handleTasksRequest<Task[], TaskInitials>(
    AxiosMethod.post,
    undefined,
    task
  );
  const addedTask = responseData?.[0];
  if (!addedTask) {
    throw new Error("Can't find added task in server response");
  }
  return addedTask;
};

const handleToggleTaskCompletion = async (taskId: string) => {
  const searchedTask = await handleFetchTaskById(taskId);
  const taskNewData = { ...searchedTask, completed: !searchedTask.completed };
  await handleTasksRequest<null, TaskInitials>(
    AxiosMethod.put,
    taskId,
    taskNewData
  );
  return taskNewData;
};

const handleEditTask = async (taskId: string, taskNewData: TaskInitials) => {
  await handleFetchTaskById(taskId);
  await handleTasksRequest<null, TaskInitials>(
    AxiosMethod.put,
    taskId,
    taskNewData
  );
};

const handleRemoveTask = async (taskId: string) => {
  await handleFetchTaskById(taskId);
  await handleTasksRequest(AxiosMethod.delete, taskId);
};

export {
  handleTasksRequest,
  handleFetchTaskById,
  handleFetchTasks,
  handleAddTasks,
  handleToggleTaskCompletion,
  handleEditTask,
  handleRemoveTask,
};

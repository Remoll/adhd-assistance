import { useTasksStore } from "@/stores/tasks/tasks";
import { useEffect } from "react";
import TasksPriorityBox from "./TasksPriorityBox";
import { TaskPriority } from "../types";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

const TasksMatrix = () => {
  const { fetchTasks } = useTasksStore();
  const { toast } = useToast();

  useEffect(() => {
    const handleFetchTasks = async () => {
      try {
        await fetchTasks();
      } catch (error) {
        toast({
          title: "Error",
          description: (error as AxiosError).message,
        });
      }
    };

    handleFetchTasks();
  }, [fetchTasks, toast]);

  return (
    <div className="grid grid-cols-2 gap-1">
      <TasksPriorityBox tasksPriority={TaskPriority.urgentImportand} />
      <TasksPriorityBox tasksPriority={TaskPriority.notUrgentImportant} />
      <TasksPriorityBox tasksPriority={TaskPriority.urgentNotImportant} />
      <TasksPriorityBox tasksPriority={TaskPriority.notUrgentNotImportant} />
    </div>
  );
};

export default TasksMatrix;

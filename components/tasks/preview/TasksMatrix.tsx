import { useTasksStore } from "@/stores/tasks/tasks";
import { useEffect } from "react";
import TasksPriorityBox from "./TasksPriorityBox";
import { TaskPriority } from "../types";

const TasksMatrix = () => {
  const { fetchTasks } = useTasksStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

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

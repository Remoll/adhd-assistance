import React from "react";
import { TaskPriority } from "../types";
import { getPriorityColor, getPriorityLabel } from "../utils";
import PriorityBox from "./PriorityBox";
import { useTasksStore } from "@/stores/tasks/store";

interface TasksPriorityBoxProps {
  tasksPriority: TaskPriority;
}

const TasksPriorityBox: React.FC<TasksPriorityBoxProps> = ({
  tasksPriority,
}) => {
  const { tasks } = useTasksStore();

  const label = getPriorityLabel(tasksPriority);
  const color = getPriorityColor(tasksPriority);
  const filtredTasks = tasks.filter((task) => task.priority === tasksPriority);

  return <PriorityBox label={label} color={color} tasks={filtredTasks} />;
};

export default TasksPriorityBox;

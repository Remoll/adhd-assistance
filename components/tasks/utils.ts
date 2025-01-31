import { MatrixColor, PriorityOptions, TaskPriority } from "./types";

const priorityOptions: PriorityOptions[] = [
  {
    value: TaskPriority.urgentImportand,
    label: "Urgent Important",
  },
  {
    value: TaskPriority.notUrgentImportant,
    label: "not Urgent Important",
  },
  {
    value: TaskPriority.urgentNotImportant,
    label: "Urgent not Important",
  },
  {
    value: TaskPriority.notUrgentNotImportant,
    label: "not Urgent not Important",
  },
];

const getPriorityLabel = (key: TaskPriority) => {
  const option = priorityOptions.find((option) => option.value === key);

  if (!option) {
    console.error("priority option not found");
    return "unknown priority";
  }

  return option.label;
};

const getPriorityColor = (key: TaskPriority) => {
  const colors: Record<TaskPriority, MatrixColor> = {
    [TaskPriority.urgentImportand]: MatrixColor.green,
    [TaskPriority.notUrgentImportant]: MatrixColor.yellow,
    [TaskPriority.urgentNotImportant]: MatrixColor.blue,
    [TaskPriority.notUrgentNotImportant]: MatrixColor.red,
  };

  return colors[key];
};

export { priorityOptions, getPriorityLabel, getPriorityColor };

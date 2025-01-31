enum TaskPriority {
  urgentImportand = "urgent-important",
  notUrgentImportant = "not-urgent-important",
  urgentNotImportant = "urgent-not-important",
  notUrgentNotImportant = "not-urgent-not-important",
}

interface TaskForm {
  title: string;
  priority: TaskPriority;
  due_date: string;
}

interface Task extends TaskForm {
  id: string;
  completed: boolean;
}

interface PriorityOptions {
  value: TaskPriority;
  label: string;
}

enum MatrixColor {
  red = "red",
  yellow = "yellow",
  blue = "blue",
  green = "green",
}

export {
  type TaskForm,
  type Task,
  type PriorityOptions,
  TaskPriority,
  MatrixColor,
};

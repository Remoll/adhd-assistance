enum TaskPriority {
  urgentImportand = "urgent-important",
  notUrgentImportant = "not-urgent-important",
  urgentNotImportant = "urgent-not-important",
  notUrgentNotImportant = "not-urgent-not-important",
}

interface Task {
  id: string;
  title: string;
  priority: TaskPriority;
  dueDate: string;
  steps: string[];
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

export { type Task, type PriorityOptions, TaskPriority, MatrixColor };

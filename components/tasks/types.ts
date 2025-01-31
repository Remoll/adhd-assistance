enum TaskPriority {
  urgentImportand = "urgent-important",
  notUrgentImportant = "not-urgent-important",
  urgentNotImportant = "urgent-not-important",
  notUrgentNotImportant = "not-urgent-not-important",
}

interface TaskInitials {
  title: string;
  priority: TaskPriority;
  due_date: Date;
}

interface Task extends TaskInitials {
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
  type TaskInitials,
  type Task,
  type PriorityOptions,
  TaskPriority,
  MatrixColor,
};

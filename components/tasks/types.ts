enum TaskPriority {
  urgentImportand = "urgent-important",
  notUrgentImportant = "important-not-urgent",
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

export { type Task, type PriorityOptions, TaskPriority };

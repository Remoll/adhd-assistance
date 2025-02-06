import { afterEach, describe, expect, it, vi } from "vitest";
import { useTasksStore } from "./store";
import { Task, TaskInitials, TaskPriority } from "@/components/tasks/types";

const errorMessage = "Error message";

const editedTaskId = "2";

const editedTask = {
  title: "Title2",
  id: editedTaskId,
  priority: TaskPriority.urgentImportand,
  due_date: new Date(),
  completed: true,
};

const tasksData: Task[] = [
  {
    title: "Title1",
    id: "1",
    priority: TaskPriority.urgentImportand,
    due_date: new Date(),
    completed: true,
  },
  editedTask,
];

const taskNewValues: TaskInitials = {
  title: "Task3",
  due_date: new Date(),
  priority: TaskPriority.notUrgentNotImportant,
};

const returnedNewTask: Task = {
  ...taskNewValues,
  completed: false,
  id: "3",
};

const mocks = vi.hoisted(() => ({
  handleTasksRequest: vi.fn(),
  handleFetchTaskById: vi.fn(),
  handleFetchTasks: vi.fn(),
  handleAddTasks: vi.fn(),
  handleToggleTaskCompletion: vi.fn(),
  handleEditTask: vi.fn(),
  handleRemoveTask: vi.fn(),
}));

vi.mock("./utils", () => ({
  handleTasksRequest: mocks.handleTasksRequest,
  handleFetchTaskById: mocks.handleFetchTaskById,
  handleFetchTasks: mocks.handleFetchTasks,
  handleAddTasks: mocks.handleAddTasks,
  handleToggleTaskCompletion: mocks.handleToggleTaskCompletion,
  handleEditTask: mocks.handleEditTask,
  handleRemoveTask: mocks.handleRemoveTask,
}));

describe("task store", () => {
  afterEach(() => {
    vi.clearAllMocks();
    useTasksStore.setState({ tasks: [] });
  });

  describe("fetchTasks", () => {
    it("rewrite tasks with fetched data on success", async () => {
      mocks.handleFetchTasks.mockResolvedValue(tasksData);

      await useTasksStore.getState().fetchTasks();

      const tasks = useTasksStore.getState().tasks;

      expect(tasks).toStrictEqual(tasksData);
    });

    it("don't rewrite tasks and throw error if error occurred", async () => {
      mocks.handleFetchTasks.mockRejectedValue(new Error(errorMessage));

      useTasksStore.setState({ tasks: tasksData });

      await expect(useTasksStore.getState().fetchTasks()).rejects.toThrow(
        errorMessage
      );

      const tasks = useTasksStore.getState().tasks;

      expect(tasks).toStrictEqual(tasksData);
    });
  });

  describe("addTask", () => {
    it("add new task to tasks table if success", async () => {
      useTasksStore.setState({ tasks: tasksData });

      mocks.handleAddTasks.mockResolvedValue({ ...returnedNewTask });

      await useTasksStore.getState().addTask(taskNewValues);

      const tasks = useTasksStore.getState().tasks;

      expect(tasks).toStrictEqual([...tasksData, returnedNewTask]);
    });

    it("don't rewrite tasks and throw error if error occurred", async () => {
      mocks.handleAddTasks.mockRejectedValue(new Error(errorMessage));

      useTasksStore.setState({ tasks: tasksData });

      await expect(
        useTasksStore.getState().addTask(taskNewValues)
      ).rejects.toThrow(errorMessage);

      const tasks = useTasksStore.getState().tasks;

      expect(tasks).toStrictEqual(tasksData);
    });
  });

  describe("toggleTaskCompletion", () => {
    it("toggle task completion on success", async () => {
      const taskWithToggledCompletion: Task = {
        ...editedTask,
        completed: !editedTask.completed,
      };

      mocks.handleToggleTaskCompletion.mockResolvedValue(
        taskWithToggledCompletion
      );

      useTasksStore.setState({ tasks: tasksData });

      await useTasksStore.getState().toggleTaskCompletion(editedTaskId);

      const tasks = useTasksStore.getState().tasks;

      const tasksDataWithToggledCompletionTask: Task[] = tasksData.map((task) =>
        task.id === editedTaskId ? taskWithToggledCompletion : task
      );

      expect(tasks).toStrictEqual(tasksDataWithToggledCompletionTask);
    });

    it("don't rewrite tasks and throw error if error occurred", async () => {
      mocks.handleToggleTaskCompletion.mockRejectedValue(
        new Error(errorMessage)
      );

      useTasksStore.setState({ tasks: tasksData });

      await expect(
        useTasksStore.getState().toggleTaskCompletion("1")
      ).rejects.toThrow(errorMessage);

      const tasks = useTasksStore.getState().tasks;

      expect(tasks).toStrictEqual(tasksData);
    });
  });

  describe("editTask", () => {
    it("rewrite task data on success", async () => {
      const taskWithEditedValues: Task = {
        ...editedTask,
        ...taskNewValues,
      };

      mocks.handleEditTask.mockResolvedValue(undefined);

      useTasksStore.setState({ tasks: tasksData });

      await useTasksStore.getState().editTask(editedTaskId, taskNewValues);

      const tasks = useTasksStore.getState().tasks;

      const tasksDataWithEditedTask = tasksData.map((task) =>
        task.id === editedTaskId ? taskWithEditedValues : task
      );

      expect(tasks).toStrictEqual(tasksDataWithEditedTask);
    });

    it("don't rewrite tasks and throw error if error occurred", async () => {
      mocks.handleEditTask.mockRejectedValue(new Error(errorMessage));

      useTasksStore.setState({ tasks: tasksData });

      await expect(
        useTasksStore.getState().editTask("1", taskNewValues)
      ).rejects.toThrow(errorMessage);

      const tasks = useTasksStore.getState().tasks;

      expect(tasks).toStrictEqual(tasksData);
    });
  });

  describe("removeTask", () => {
    it("remove task from tasks table on success", async () => {
      mocks.handleRemoveTask.mockResolvedValue(undefined);

      useTasksStore.setState({ tasks: tasksData });

      await useTasksStore.getState().removeTask(editedTaskId);

      const tasks = useTasksStore.getState().tasks;

      const tasksDataWithRemovedTask = tasksData.filter(
        (task) => task.id !== editedTaskId
      );

      expect(tasks).toStrictEqual(tasksDataWithRemovedTask);
    });

    it("don't rewrite tasks and throw error if error occurred", async () => {
      mocks.handleRemoveTask.mockRejectedValue(new Error(errorMessage));

      useTasksStore.setState({ tasks: tasksData });

      await expect(useTasksStore.getState().removeTask("1")).rejects.toThrow(
        errorMessage
      );

      const tasks = useTasksStore.getState().tasks;

      expect(tasks).toStrictEqual(tasksData);
    });
  });
});

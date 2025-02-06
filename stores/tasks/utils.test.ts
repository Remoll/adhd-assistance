import { afterEach, describe, expect, it, vi } from "vitest";
import {
  handleTasksRequest,
  handleFetchTaskById,
  handleFetchTasks,
  handleAddTasks,
  handleToggleTaskCompletion,
  handleEditTask,
  handleRemoveTask,
} from "./utils";
import { AxiosMethod } from "@/services/types";
import axios from "axios";
import { Task, TaskInitials, TaskPriority } from "@/components/tasks/types";

const errorMessage = "Error message";

const mocks = vi.hoisted(() => ({
  axios: {
    get: vi.fn().mockResolvedValue({ data: {} }),
    post: vi.fn().mockResolvedValue({ data: {} }),
    put: vi.fn().mockResolvedValue({ data: {} }),
    delete: vi.fn().mockResolvedValue({ data: {} }),
    patch: vi.fn().mockResolvedValue({ data: {} }),
  },
}));

vi.mock("axios", () => ({
  default: mocks.axios,
}));

describe("tasks store utils", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("handleTasksRequest", () => {
    it("calls fetch with proper url based on id and proper payload", async () => {
      const payload: TaskInitials = {
        title: "Task1",
        priority: TaskPriority.urgentImportand,
        due_date: new Date(),
      };
      await handleTasksRequest(AxiosMethod.get, "1", payload);
      expect(axios.get).toBeCalledWith("/api/tasks/1", payload);
    });

    it("return data on fetch success", async () => {
      interface DataType {
        title: string;
        id: number;
      }
      const data: DataType = { title: "Title1", id: 1 };
      mocks.axios.get.mockResolvedValue({ data });
      const result = await handleTasksRequest<DataType>(AxiosMethod.get, "");
      expect(result).toEqual(data);
    });

    it("throw error on fetch fail", async () => {
      mocks.axios.get.mockRejectedValue(new Error(errorMessage));
      await expect(handleTasksRequest(AxiosMethod.get, "")).rejects.toThrow(
        errorMessage
      );
    });
  });

  describe("handleFetchTaskById", () => {
    it("return task on fetch success", async () => {
      const task: Task = {
        title: "Title1",
        id: "1",
        priority: TaskPriority.urgentImportand,
        due_date: new Date(),
        completed: true,
      };
      mocks.axios.get.mockResolvedValue({ data: { ...task } });
      const result = await handleFetchTaskById("1");
      expect(result).toStrictEqual({ ...task });
    });

    it("throw error on fetch success if data is null", async () => {
      mocks.axios.get.mockResolvedValue({ data: null });
      await expect(handleFetchTaskById("1")).rejects.toThrow(
        "Can't find task in server"
      );
    });

    it("throw error on fetch fail", async () => {
      mocks.axios.get.mockRejectedValue(new Error(errorMessage));
      await expect(handleFetchTaskById("1")).rejects.toThrow(errorMessage);
    });
  });

  describe("handleFetchTasks", () => {
    it("return tasks on fetch success", async () => {
      const tasks: Task[] = [
        {
          title: "Title1",
          id: "1",
          priority: TaskPriority.urgentImportand,
          due_date: new Date(),
          completed: true,
        },
        {
          title: "Title2",
          id: "2",
          priority: TaskPriority.urgentImportand,
          due_date: new Date(),
          completed: true,
        },
      ];
      mocks.axios.get.mockResolvedValue({ data: { ...tasks } });
      const result = await handleFetchTasks();
      expect(result).toStrictEqual({ ...tasks });
    });

    it("throw error on fetch success if data is null", async () => {
      mocks.axios.get.mockResolvedValue({ data: null });
      await expect(handleFetchTasks()).rejects.toThrow("Can't find tasks");
    });

    it("throw error on fetch fail", async () => {
      mocks.axios.get.mockRejectedValue(new Error(errorMessage));
      await expect(handleFetchTasks()).rejects.toThrow(errorMessage);
    });
  });

  describe("handleAddTasks", () => {
    const taskInitials: TaskInitials = {
      title: "Title1",
      priority: TaskPriority.urgentImportand,
      due_date: new Date(),
    };

    const task: Task = {
      title: "Title1",
      id: "1",
      priority: TaskPriority.urgentImportand,
      due_date: new Date(),
      completed: true,
    };

    it("return added task on success", async () => {
      mocks.axios.post.mockResolvedValue({ data: [task] });
      const result = await handleAddTasks(taskInitials);
      expect(result).toStrictEqual({ ...task });
    });

    it("throw error on fetch success if data is null", async () => {
      mocks.axios.post.mockResolvedValue({ data: null });
      await expect(handleAddTasks(taskInitials)).rejects.toThrow(
        "Can't find added task in server response"
      );
    });

    it("throw error on fetch success if data array is empty", async () => {
      mocks.axios.post.mockResolvedValue({ data: [] });
      await expect(handleAddTasks(taskInitials)).rejects.toThrow(
        "Can't find added task in server response"
      );
    });

    it("throw error on fetch fail", async () => {
      mocks.axios.post.mockRejectedValue(new Error(errorMessage));
      await expect(handleAddTasks(taskInitials)).rejects.toThrow(errorMessage);
    });
  });

  describe("handleToggleTaskCompletion", () => {
    const task: Task = {
      title: "Title1",
      id: "1",
      priority: TaskPriority.urgentImportand,
      due_date: new Date(),
      completed: true,
    };

    it("return task data with reversed completion on edit success", async () => {
      mocks.axios.get.mockResolvedValue({ data: { ...task } });
      const result = await handleToggleTaskCompletion("1");
      expect(result).toStrictEqual({ ...task, completed: false });
    });

    it("throw error if can't find task", async () => {
      mocks.axios.get.mockResolvedValue({ data: null });
      await expect(handleToggleTaskCompletion("1")).rejects.toThrow(
        "Can't find task in server"
      );
    });

    it("throw error on task find call error", async () => {
      mocks.axios.get.mockRejectedValue(new Error(errorMessage));
      await expect(handleToggleTaskCompletion("1")).rejects.toThrow(
        errorMessage
      );
    });

    it("throw error on task edit call error", async () => {
      mocks.axios.get.mockRejectedValue(new Error(errorMessage));
      await expect(handleToggleTaskCompletion("1")).rejects.toThrow(
        errorMessage
      );
    });
  });

  describe("handleEditTask", () => {
    const taskNewData: TaskInitials = {
      title: "Title1",
      priority: TaskPriority.urgentImportand,
      due_date: new Date(),
    };

    it("throw error if can't find task", async () => {
      mocks.axios.get.mockResolvedValue({ data: null });
      await expect(handleEditTask("1", taskNewData)).rejects.toThrow(
        "Can't find task in server"
      );
    });

    it("throw error on task find call error", async () => {
      mocks.axios.get.mockRejectedValue(new Error(errorMessage));
      await expect(handleEditTask("1", taskNewData)).rejects.toThrow(
        errorMessage
      );
    });

    it("throw error on task edit call error", async () => {
      mocks.axios.get.mockRejectedValue(new Error(errorMessage));
      await expect(handleEditTask("1", taskNewData)).rejects.toThrow(
        errorMessage
      );
    });
  });

  describe("handleRemoveTask", () => {
    it("throw error if can't find task", async () => {
      mocks.axios.get.mockResolvedValue({ data: null });
      await expect(handleRemoveTask("1")).rejects.toThrow(
        "Can't find task in server"
      );
    });

    it("throw error on task find call error", async () => {
      mocks.axios.get.mockRejectedValue(new Error(errorMessage));
      await expect(handleRemoveTask("1")).rejects.toThrow(errorMessage);
    });

    it("throw error on task delete call error", async () => {
      mocks.axios.delete.mockRejectedValue(new Error(errorMessage));
      await expect(handleRemoveTask("1")).rejects.toThrow(errorMessage);
    });
  });
});

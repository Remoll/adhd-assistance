import supabase from "@/utils/supabase/supabaseClient";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  addTask,
  editTask,
  fetchTaskById,
  fetchTasks,
  removeTask,
} from "./service";
import { Task, TaskInitials, TaskPriority } from "@/components/tasks/types";

const tableName = "tasks";

const errorMessage = "Error message";

const newTaskInitials: TaskInitials = {
  title: "Task1",
  priority: TaskPriority.urgentImportand,
  due_date: new Date(),
};

const newTask: Task = {
  ...newTaskInitials,
  id: "1",
  completed: false,
};

const mocks = vi.hoisted(() => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn(),
    insert: vi.fn(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
  },
}));

vi.mock("@/utils/supabase/supabaseClient", () => ({
  default: mocks.supabase,
}));

describe("tasks services", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("fetchTasks", () => {
    it("return task list when fetching success", async () => {
      mocks.supabase.select.mockResolvedValue({
        data: [newTask],
        error: null,
      });

      const tasks = await fetchTasks();

      expect(tasks).toStrictEqual({
        data: [newTask],
        error: null,
      });
      expect(supabase.from).toHaveBeenCalledWith(tableName);
      expect(supabase.from(tableName).select).toHaveBeenCalledWith("*");
    });

    it("return an error when fetching fails", async () => {
      mocks.supabase.select.mockResolvedValue({
        data: null,
        error: { message: "Database error" },
      });

      const tasks = await fetchTasks();

      expect(tasks).toStrictEqual({
        data: null,
        error: "Database error",
      });
    });

    it("check that all methods have been called with proper attributes", async () => {
      await fetchTasks();

      expect(supabase.from).toHaveBeenCalledWith(tableName);
      expect(supabase.from(tableName).select).toHaveBeenCalledWith("*");
    });
  });

  describe("fetchTaskById", () => {
    it("return task by id if fetching success", async () => {
      mocks.supabase.select.mockReturnThis();
      mocks.supabase.single.mockResolvedValue({
        data: newTask,
        error: null,
      });

      const task = await fetchTaskById("1");

      expect(task).toStrictEqual({
        data: newTask,
        error: null,
      });
    });

    it("return error if fetching fail", async () => {
      mocks.supabase.select.mockReturnThis();
      mocks.supabase.single.mockResolvedValue({
        data: null,
        error: { message: errorMessage },
      });

      const task = await fetchTaskById("1");

      expect(task).toStrictEqual({
        data: null,
        error: errorMessage,
      });
    });

    it("check that all methods have been called with proper attributes", async () => {
      mocks.supabase.select.mockReturnThis();

      await fetchTaskById("1");

      expect(supabase.from).toHaveBeenCalledWith(tableName);
      expect(supabase.from(tableName).select).toHaveBeenCalledWith("*");
      expect(supabase.from(tableName).select("*").eq).toHaveBeenCalledWith(
        "id",
        "1"
      );
    });
  });

  describe("addTask", () => {
    it("return data of adding task as object in table on success", async () => {
      mocks.supabase.insert.mockReturnThis();
      mocks.supabase.select.mockResolvedValue({
        data: [newTask],
        error: null,
      });

      const resolve = await addTask(newTaskInitials);

      expect(resolve).toStrictEqual({
        data: [newTask],
        error: null,
      });
      expect(supabase.from).toHaveBeenCalledWith(tableName);
      expect(supabase.from(tableName).insert).toHaveBeenCalledWith([
        newTaskInitials,
      ]);
      expect(
        supabase.from(tableName).insert([newTaskInitials]).select
      ).toHaveBeenCalledWith();
    });

    it("return error message on fail and data as null", async () => {
      mocks.supabase.insert.mockReturnThis();
      mocks.supabase.select.mockResolvedValue({
        data: null,
        error: { message: errorMessage },
      });

      const resolve = await addTask(newTaskInitials);

      expect(resolve).toStrictEqual({
        data: null,
        error: errorMessage,
      });
    });

    it("check that all methods have been called with proper attributes", async () => {
      mocks.supabase.insert.mockReturnThis();

      await addTask(newTaskInitials);

      expect(supabase.from).toHaveBeenCalledWith(tableName);
      expect(supabase.from(tableName).insert).toHaveBeenCalledWith([
        newTaskInitials,
      ]);
      expect(
        supabase.from(tableName).insert([newTaskInitials]).select
      ).toHaveBeenCalledWith();
    });
  });

  describe("editTask", () => {
    it("return data and error as null on success", async () => {
      mocks.supabase.eq.mockResolvedValue({
        data: null,
        error: null,
      });

      const resolve = await editTask("1", newTaskInitials);

      expect(resolve).toEqual({
        data: null,
        error: null,
      });
    });

    it("return error message and data as null on fail", async () => {
      mocks.supabase.eq.mockResolvedValue({
        data: null,
        error: { message: errorMessage },
      });

      const resolve = await editTask("1", newTaskInitials);

      expect(resolve).toEqual({
        data: null,
        error: errorMessage,
      });
    });

    it("check that all methods have been called with proper attributes", async () => {
      await editTask("1", newTaskInitials);

      expect(supabase.from).toHaveBeenCalledWith(tableName);
      expect(supabase.from(tableName).update).toHaveBeenCalledWith(
        newTaskInitials
      );
      expect(
        supabase.from(tableName).update(newTaskInitials).eq
      ).toHaveBeenCalledWith("id", "1");
    });
  });

  describe("removeTask", () => {
    it("return data and error as null on success", async () => {
      mocks.supabase.eq.mockResolvedValue({
        data: null,
        error: null,
      });

      const resolve = await removeTask("1");

      expect(resolve).toEqual({
        data: null,
        error: null,
      });
    });

    it("return error message and data as null on fail", async () => {
      mocks.supabase.eq.mockResolvedValue({
        data: null,
        error: { message: errorMessage },
      });

      const resolve = await removeTask("1");

      expect(resolve).toEqual({
        data: null,
        error: errorMessage,
      });
    });

    it("check that all methods have been called with proper attributes", async () => {
      await removeTask("1");

      expect(supabase.from).toHaveBeenCalledWith(tableName);
      expect(supabase.from(tableName).delete).toHaveBeenCalledWith();
      expect(supabase.from(tableName).delete().eq).toHaveBeenCalledWith(
        "id",
        "1"
      );
    });
  });
});

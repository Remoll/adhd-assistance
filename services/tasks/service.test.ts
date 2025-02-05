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
      expect(supabase.from).toHaveBeenCalledWith(tableName);
      expect(supabase.from(tableName).select).toHaveBeenCalledWith("*");
      expect(supabase.from(tableName).select("*").eq).toHaveBeenCalledWith(
        "id",
        "1"
      );
    });

    it("return error if fetching fail", async () => {
      mocks.supabase.select.mockReturnThis();
      mocks.supabase.single.mockResolvedValue({
        data: null,
        error: { message: "Error message" },
      });

      const task = await fetchTaskById("1");

      expect(task).toStrictEqual({
        data: null,
        error: "Error message",
      });
    });
  });

  describe("addTask", () => {
    it("add provided task data", async () => {
      mocks.supabase.insert.mockReturnThis();
      mocks.supabase.select.mockResolvedValue({
        data: [newTaskInitials],
        error: null,
      });

      const resolve = await addTask(newTaskInitials);

      expect(resolve).toStrictEqual({
        data: [newTaskInitials],
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
  });

  describe("editTask", () => {
    it("edit task by provided data", async () => {
      mocks.supabase.eq.mockResolvedValue({
        data: [newTaskInitials],
        error: null,
      });

      const resolve = await editTask("1", newTaskInitials);

      expect(resolve).toEqual({
        data: [newTaskInitials],
        error: null,
      });
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
    it("remove task by provided id", async () => {
      mocks.supabase.eq.mockResolvedValue({
        data: [newTaskInitials],
        error: null,
      });

      const resolve = await removeTask("1");

      expect(resolve).toEqual({
        data: [newTaskInitials],
        error: null,
      });
      expect(supabase.from).toHaveBeenCalledWith(tableName);
      expect(supabase.from(tableName).delete).toHaveBeenCalledWith();
      expect(supabase.from(tableName).delete().eq).toHaveBeenCalledWith(
        "id",
        "1"
      );
    });
  });
});

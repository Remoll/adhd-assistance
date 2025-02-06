import { describe, it, expect, vi, afterEach } from "vitest";
import axios from "axios";
import axiosRequestHandler from "./axiosRequestHandler";
import { AxiosMethod } from "../types";

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

describe("axiosRequestHandler", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("called proper method", () => {
    it("called get", async () => {
      await axiosRequestHandler(AxiosMethod.get, "");
      expect(axios.get).toBeCalled();
    });
    it("called post", async () => {
      await axiosRequestHandler(AxiosMethod.post, "");
      expect(axios.post).toBeCalled();
    });
    it("called put", async () => {
      await axiosRequestHandler(AxiosMethod.put, "");
      expect(axios.put).toBeCalled();
    });
    it("called delete", async () => {
      await axiosRequestHandler(AxiosMethod.delete, "");
      expect(axios.delete).toBeCalled();
    });
    it("called patch", async () => {
      await axiosRequestHandler(AxiosMethod.patch, "");
      expect(axios.patch).toBeCalled();
    });
  });

  it("return data on success", async () => {
    interface DataType {
      title: string;
      id: number;
    }
    const data: DataType = { title: "Title1", id: 1 };
    mocks.axios.get.mockResolvedValue({ data });
    const result = await axiosRequestHandler<DataType>(AxiosMethod.get, "");
    expect(result).toEqual(data);
  });

  it("throw error on fail", async () => {
    const errorMessage = "Error message";
    mocks.axios.get.mockRejectedValue(new Error(errorMessage));
    await expect(axiosRequestHandler(AxiosMethod.get, "")).rejects.toThrow(
      errorMessage
    );
  });
});

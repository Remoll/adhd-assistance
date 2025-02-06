import { describe, it, expect, vi, afterEach } from "vitest";
import axios from "axios";
import axiosRequestHandler from "./axiosRequestHandler";
import { AxiosMethod } from "../types";

const mocks = vi.hoisted(() => ({
  axios: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    patch: vi.fn(),
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

  it("return data and error as null on success", async () => {
    const data = { title: "Title1", id: 1 };

    mocks.axios.get.mockResolvedValue({ data });

    const result = await axiosRequestHandler(AxiosMethod.get, "");

    expect(result.data).toEqual(data);
    expect(result.error).toBeNull();
  });

  it("return data as null and error message on fail", async () => {
    const errorMessage = "Error message";

    mocks.axios.get.mockRejectedValue(new Error(errorMessage));

    const result = await axiosRequestHandler(AxiosMethod.get, "");

    expect(result.data).toBeNull();
    expect(result.error).toEqual(errorMessage);
  });
});

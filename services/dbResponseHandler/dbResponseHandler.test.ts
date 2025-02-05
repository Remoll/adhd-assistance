import { describe, expect, it } from "vitest";
import dbResponseHandler from "./dbResponseHandler";
import { ResponseError, ResponseSuccess } from "../types";

interface ExampleData {
  title: string;
  id: string;
}

const unhandledResponse = "Unhandled response";

describe("dbResponseHandler", () => {
  it("return data and error as null on success", () => {
    const responseSuccess: ResponseSuccess<ExampleData> = {
      data: { title: "Title1", id: "1" },
      error: null,
    };

    const result = dbResponseHandler<ExampleData>(responseSuccess);

    expect(result).toStrictEqual({
      data: { title: "Title1", id: "1" },
      error: null,
    });
  });

  it("return data as null and error message on fail", () => {
    const responseSuccess: ResponseError = {
      data: null,
      error: { message: "Error message" },
    };

    const result = dbResponseHandler(responseSuccess);

    expect(result).toStrictEqual({ data: null, error: "Error message" });
  });

  it("return data as null and unhandled response error if response is null", () => {
    const result = dbResponseHandler(null);

    expect(result).toStrictEqual({ data: null, error: unhandledResponse });
  });

  it("return data as null and unhandled response error if response is null", () => {
    const result = dbResponseHandler(null);

    expect(result).toStrictEqual({ data: null, error: unhandledResponse });
  });
});

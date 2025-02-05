import { describe, expect, it } from "vitest";
import responseHandler from "./responseHandler";
import { ResponseError, ResponseSuccess } from "./types";

interface ExampleData {
  title: string;
  id: string;
}

describe("responseHandler", () => {
  it("return data and error as null on success", () => {
    const responseSuccess: ResponseSuccess<ExampleData> = {
      data: { title: "Title1", id: "1" },
      error: null,
    };

    const result = responseHandler<ExampleData>(responseSuccess);

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

    const result = responseHandler(responseSuccess);

    expect(result).toStrictEqual({ data: null, error: "Error message" });
  });
});

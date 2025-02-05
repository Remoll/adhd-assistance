import { describe, it, expect, vi } from "vitest";
import dbToApiAdapter from "./dbToApiAdapter";
import { NextApiResponse } from "next";

const resMock = {
  status: vi.fn().mockReturnThis(),
  json: vi.fn().mockReturnThis(),
  end: vi.fn().mockReturnThis(),
} as unknown as NextApiResponse;

describe("dbToApiAdapter", () => {
  it("return status 200 and data from database result data attribute if error is null", () => {
    const data = { title: "Title1", id: 1 };
    const dbResult = { data, error: null };

    dbToApiAdapter(dbResult, resMock);

    expect(resMock.status).toHaveBeenCalledWith(200);
    expect(resMock.json).toHaveBeenCalledWith(data);
  });

  it("return status 500 and ends request if there is an error", () => {
    const dbResult = { data: null, error: "Error message" };

    dbToApiAdapter(dbResult, resMock);

    expect(resMock.status).toHaveBeenCalledWith(500);
    expect(resMock.end).toHaveBeenCalled();
  });
});

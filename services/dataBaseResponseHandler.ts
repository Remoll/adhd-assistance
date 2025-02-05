import { ResponseError, ResponseSuccess, Result } from "./types";

const dataBaseResponseHandler = <T>(
  response: ResponseSuccess<T | T[]> | ResponseError | null | undefined
): Result<T> => {
  if (!response) {
    return { data: null, error: "Unhandled response" };
  }

  const { data, error } = response;

  if (error) {
    const errorMessage = error.message;
    return { data: null, error: errorMessage };
  }

  return { data, error: null };
};

export default dataBaseResponseHandler;

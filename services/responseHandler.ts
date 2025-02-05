import { ResponseError, ResponseSuccess, Result } from "./types";

const responseHandler = <T>(
  response: ResponseSuccess<T | T[]> | ResponseError
): Result<T> => {
  const { data, error } = response;

  if (error) {
    const errorMessage = error.message;
    console.error("Response error: ", errorMessage);
    return { data: null, error: errorMessage };
  }

  return { data, error: null };
};

export default responseHandler;

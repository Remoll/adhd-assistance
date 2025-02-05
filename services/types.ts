interface Result<T> {
  data: T | T[] | null;
  error: string | null;
}

interface ResponseSuccess<T> {
  error: null;
  data: T;
}

interface ResponseError {
  error: {
    message: string;
  };
  data: null;
}

export type { Result, ResponseSuccess, ResponseError };

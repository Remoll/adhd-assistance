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

enum Method {
  post = "POST",
  get = "GET",
  put = "PUT",
  delete = "DELETE",
}

export { type Result, type ResponseSuccess, type ResponseError, Method };

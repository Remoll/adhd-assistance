// TODO: think of TanStack Query
import { AxiosMethod } from "../types";
import axios, { AxiosError } from "axios";

const axiosRequestHandler = async <T, U = T>(
  method: AxiosMethod,
  url: string,
  payload?: U | T
): Promise<{ data: T | null; error: string | null }> => {
  try {
    const { data } = await axios[method]<T>(url, payload);
    return { data, error: null };
  } catch (error) {
    const axiosError = error as AxiosError;
    return { data: null, error: axiosError.message };
  }
};

export default axiosRequestHandler;

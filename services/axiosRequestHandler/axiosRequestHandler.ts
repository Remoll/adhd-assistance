// TODO: think of TanStack Query
import { AxiosMethod } from "../types";
import axios from "axios";

const axiosRequestHandler = async <T, U = T>(
  method: AxiosMethod,
  url: string,
  payload?: U | T
): Promise<T | null> => {
  const { data } = await axios[method]<T>(url, payload);
  return data;
};

export default axiosRequestHandler;

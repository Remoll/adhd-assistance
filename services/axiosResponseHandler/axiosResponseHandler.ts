import { AxiosMethod } from "../types";
import axios from "axios";

const axiosResponseHandler = async <T, U = T>(
  method: AxiosMethod,
  url: string,
  payload?: U | T
): Promise<{ data: T | null; error: string | null }> => {
  try {
    const { data } = await axios[method]<T>(url, payload);
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export default axiosResponseHandler;

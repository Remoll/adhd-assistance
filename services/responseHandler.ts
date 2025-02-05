import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { Result } from "./types";

const responseHandler = <T>(
  response: PostgrestSingleResponse<T | T[]>
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

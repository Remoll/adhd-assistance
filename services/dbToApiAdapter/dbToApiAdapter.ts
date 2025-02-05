import type { NextApiResponse } from "next";
import { Result } from "../types";

const dbToApiAdapter = <T>(result: Result<T>, res: NextApiResponse) => {
  const { data, error } = result;

  if (error !== null) {
    return res.status(500).end();
  }
  return res.status(200).json(data);
};

export default dbToApiAdapter;

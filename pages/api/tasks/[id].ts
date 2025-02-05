import dbToApiAdapter from "@/services/dbToApiAdapter/dbToApiAdapter";
import {
  fetchTaskById,
  editTask,
  removeTask,
} from "@/services/modules/tasks/service";
import { Method } from "@/services/types";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid task id" });
  }

  const { method } = req;

  switch (method) {
    case Method.get: {
      const result = await fetchTaskById(id);
      return dbToApiAdapter(result, res);
    }

    case Method.put: {
      const result = await editTask(id, req.body);
      return dbToApiAdapter(result, res);
    }

    case Method.delete: {
      const result = await removeTask(id);
      return dbToApiAdapter(result, res);
    }

    default:
      return res.status(405).json({ error: "Method unhandled" });
  }
};

export default handler;

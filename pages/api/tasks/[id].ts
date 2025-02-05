import dbToApiAdapter from "@/services/dbToApiAdapter/dbToApiAdapter";
import {
  getTaskFromDbById,
  editTaskInDb,
  removeTaskFromDb,
} from "@/services/modules/tasks/service";
import { DbMethod } from "@/services/types";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid task id" });
  }

  const { method } = req;

  switch (method) {
    case DbMethod.get: {
      const result = await getTaskFromDbById(id);
      return dbToApiAdapter(result, res);
    }

    case DbMethod.put: {
      const result = await editTaskInDb(id, req.body);
      return dbToApiAdapter(result, res);
    }

    case DbMethod.delete: {
      const result = await removeTaskFromDb(id);
      return dbToApiAdapter(result, res);
    }

    default:
      return res.status(405).json({ error: "Method unhandled" });
  }
};

export default handler;

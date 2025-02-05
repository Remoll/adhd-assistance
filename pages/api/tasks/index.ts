import type { NextApiRequest, NextApiResponse } from "next";
import { getTasksFromDb, addTaskToDb } from "@/services/modules/tasks/service";
import dbToApiAdapter from "@/services/dbToApiAdapter/dbToApiAdapter";
import { DbMethod } from "@/services/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case DbMethod.post: {
      const task = req.body;
      const result = await addTaskToDb(task);
      return dbToApiAdapter(result, res);
    }

    case DbMethod.get: {
      const result = await getTasksFromDb();
      return dbToApiAdapter(result, res);
    }

    default:
      return res.status(405).json({ error: "Method unhandled" });
  }
};

export default handler;

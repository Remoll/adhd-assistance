import type { NextApiRequest, NextApiResponse } from "next";
import { fetchTasks, addTask } from "@/services/modules/tasks/service";
import dbToApiAdapter from "@/services/dbToApiAdapter/dbToApiAdapter";
import { Method } from "@/services/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case Method.post: {
      const task = req.body;
      const result = await addTask(task);
      return dbToApiAdapter(result, res);
    }

    case Method.get: {
      const result = await fetchTasks();
      return dbToApiAdapter(result, res);
    }

    default:
      return res.status(405).json({ error: "Method unhandled" });
  }
};

export default handler;

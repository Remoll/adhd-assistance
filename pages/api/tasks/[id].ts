import { fetchTaskById, editTask, removeTask } from "@/services/tasks/service";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid task id" });
  }

  const { method } = req;

  switch (method) {
    case "GET": {
      const { data, error } = await fetchTaskById(id);
      if (error) {
        return res.status(404).json({ error });
      }
      return res.status(200).json(data);
    }

    case "PUT": {
      const { data, error } = await editTask(id, req.body);
      if (error) return res.status(500).json({ error });
      return res.status(200).json(data);
    }

    case "DELETE": {
      const { data, error } = await removeTask(id);
      if (error) {
        return res.status(404).json({ error });
      }
      return res.status(200).json(data);
    }

    default:
      return res.status(405).json({ error: "Method unhandled" });
  }
};

export default handler;

import type { NextApiRequest, NextApiResponse } from "next";
import { fetchTasks, addTask } from "@/services/tasks/service";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "POST": {
      const task = req.body;
      const { data, error } = await addTask(task);
      if (error) return res.status(500).json({ error });
      return res.status(200).json(data);
    }

    case "GET": {
      const { data, error } = await fetchTasks();
      if (error) return res.status(500).json({ error });
      return res.status(200).json(data);
    }

    default:
      return res.status(405).json({ error: "Method unhandled" });
  }
};

export default handler;

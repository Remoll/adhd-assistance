import type { NextApiRequest, NextApiResponse } from "next";
import { fetchTasks, addTask } from "@/services/tasks/service";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  try {
    switch (method) {
      case "POST": {
        const task = req.body;
        const newTask = await addTask(task);
        if (!newTask)
          return res.status(500).json({ error: "Błąd dodawania zadania" });
        return res.status(201).json(newTask);
      }

      case "GET": {
        const tasks = await fetchTasks();
        if (!tasks)
          return res.status(500).json({ error: "Błąd pobierania zadań" });
        return res.status(200).json(tasks);
      }

      default:
        return res.status(405).json({ error: "Metoda nieobsługiwana" });
    }
  } catch (error) {
    console.error("Błąd API:", error);
    return res.status(500).json({ error: "Wewnętrzny błąd serwera" });
  }
};

export default handler;

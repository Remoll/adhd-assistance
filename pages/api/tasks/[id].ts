import { fetchTaskById, editTask, removeTask } from "@/services/tasks/service";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Nieprawidłowe ID zadania" });
  }

  const { method } = req;

  switch (method) {
    case "GET": {
      const task = await fetchTaskById(id);

      if (!task) {
        return res.status(404).json({ error: "Zadanie nie znalezione" });
      }

      return res.status(200).json(task);
    }

    case "PUT": {
      const success = await editTask(id, req.body);
      if (!success)
        return res.status(500).json({ error: "Błąd edycji zadania" });
      return res.status(200).json({ message: "Zadanie zaktualizowane" });
    }

    case "DELETE": {
      const success = await removeTask(id);
      if (!success)
        return res.status(500).json({ error: "Błąd usuwania zadania" });
      return res.status(200).json({ message: "Zadanie usunięte" });
    }

    default:
      return res.status(405).json({ error: "Metoda nieobsługiwana" });
  }
};

export default handler;

import type { NextApiRequest, NextApiResponse } from "next";
import {
  fetchTasks,
  addTask,
  editTask,
  removeTask,
} from "@/services/tasks/service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  try {
    switch (method) {
      case "GET": {
        const tasks = await fetchTasks();
        if (!tasks)
          return res.status(500).json({ error: "Błąd pobierania zadań" });
        return res.status(200).json(tasks);
      }
      case "POST": {
        const task = req.body;
        const newTask = await addTask(task);
        if (!newTask)
          return res.status(500).json({ error: "Błąd dodawania zadania" });
        return res.status(201).json(newTask);
      }
      case "PUT": {
        const { id, ...updatedData } = req.body;
        const success = await editTask(id, updatedData);
        if (!success)
          return res.status(500).json({ error: "Błąd edycji zadania" });
        return res.status(200).json({ message: "Zadanie zaktualizowane" });
      }
      case "DELETE": {
        const { id } = req.body;
        const success = await removeTask(id);
        if (!success)
          return res.status(500).json({ error: "Błąd usuwania zadania" });
        return res.status(200).json({ message: "Zadanie usunięte" });
      }
      default:
        return res.status(405).json({ error: "Metoda nieobsługiwana" });
    }
  } catch (error) {
    console.error("Błąd API:", error);
    return res.status(500).json({ error: "Wewnętrzny błąd serwera" });
  }
}

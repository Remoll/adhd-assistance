import { fetchTaskById } from "@/services/tasks/service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Nieprawidłowe ID zadania" });
  }

  const task = await fetchTaskById(id);

  if (!task) {
    return res.status(404).json({ error: "Zadanie nie znalezione" });
  }

  return res.status(200).json(task);
}

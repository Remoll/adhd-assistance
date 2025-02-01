import { login } from "@/services/user/service";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  const data = await login(email, password);

  if (!data) return res.status(500).json({ error: "Błąd logowania" });
  return res.status(200).json(data);
};

export default handler;

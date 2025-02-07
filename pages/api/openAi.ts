import openai from "@/utils/openAi/openAiClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userPrompt, systemPrompt } = req.body;
    if (!userPrompt) {
      return res.status(400).json({ error: "User prompt is required" });
    }

    const completion = await openai.chat.completions.create({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.5,
      max_tokens: 256,
    });

    const responseText = completion.choices[0].message.content;

    return res.status(200).json({ response: responseText });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return res.status(500).json({ error: error || "Internal server error" });
  }
}

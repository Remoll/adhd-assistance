import { OpenAI } from "openai";

if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_BASE_URL) {
  throw new Error("Missing env variables for openAi");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

export default openai;

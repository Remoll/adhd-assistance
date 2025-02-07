import axiosRequestHandler from "@/services/axiosRequestHandler/axiosRequestHandler";
import { AxiosMethod } from "@/services/types";

const openAiUrl = "/api/openAi";

interface OpenAiRequestPayload {
  userPrompt: string;
  systemPrompt: string;
}

const openAiRequesHandler = async (payload: OpenAiRequestPayload) => {
  const data = await axiosRequestHandler(AxiosMethod.post, openAiUrl, payload);
  return data;
};

export default openAiRequesHandler;

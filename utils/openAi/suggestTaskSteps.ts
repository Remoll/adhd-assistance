import openAiRequesHandler from "./openAiRequesHandler";

const suggestTaskSteps = async (taskTitle: string) => {
  const systemPrompt =
    "The user will provide a task to be completed. Break it down into the smallest possible number of short steps. Generate the response in the form of a JSON array, where each step is the next element of the array.";

  const data = await openAiRequesHandler({
    systemPrompt,
    userPrompt: taskTitle,
  });

  console.log("data: ", data);
  console.log("data.response: ", data.response);
  console.log("JSON.parse: ", JSON.parse(data.response));

  return data;
};

export default suggestTaskSteps;

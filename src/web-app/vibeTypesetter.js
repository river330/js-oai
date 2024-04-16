import { gptPrompt } from "../shared/openai.js";

export async function vibeTypeset(context) {
  const prompt = context.request.body().value.prompt;

  const result = await gptPrompt(prompt, { max_tokens: 1024 });

  context.response.body = JSON.stringify(result);
  context.response.type = "json";
}

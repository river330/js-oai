import { gptPrompt } from "../shared/openai.js";

export async function vibeTypeset(context) {
  const body = await context.request.body().value;
  const prompt = body.prompt;
  if (!prompt) {
    context.response.status = 400;
    context.response.body = {
      error: "Invalid value for 'content': expected a string, got null",
    };
    return;
  }

  const result = await gptPrompt(prompt, { max_tokens: 1024 });

  console.log("Generated response from GPT:", result);

  context.response.body = JSON.stringify(result);
  context.response.type = "json";
}

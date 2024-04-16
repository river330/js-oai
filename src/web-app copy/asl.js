import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";

import { createExitSignal, staticServer } from "../shared/server.ts";
import { loadEnv } from "../shared/util.ts";
import OpenAI from "npm:openai@4";
// import { gptPrompt, makeImage } from "../shared/openai.js";
// import { getOpenAIKey } from "../shared/openai.js";

import { Chalk } from "npm:chalk@5";

const env = loadEnv();
const chalk = new Chalk({ level: 1 });

// change working dirctory to the current file's directory
Deno.chdir(new URL(".", import.meta.url).pathname);
// log the current working directory with friendly message
console.log(`Current working directory: ${Deno.cwd()}`);

const app = new Application();
const router = new Router();

const system_prompt =
  `You are an AI trained to recognize American Sign Language (ASL). Given an image of a single ASL sign, describe the letter or word it represents. Return your response in JSON format including the recognized letter or word.`;

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });
export async function analyzeImageData(context) {
  try {
    const body = await context.request.body().value;
    const frame = body.frame; // Changed from frames to frame, assuming one frame per request

    const result = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{
        role: "system",
        content: system_prompt,
      }, {
        role: "user",
        content: frame, // Assuming the frame is sent correctly
      }],
    });

    const letter = result.choices[0].text.trim();
    context.response.body = { success: true, letter }; // Return each letter individually
  } catch (error) {
    console.error(error);
    context.response.body = { success: false, error: error.message };
  }
}

// API routes
router.post("/upload_frame", analyzeImageData);

app.use(router.routes());
app.use(router.allowedMethods());
app.use(staticServer);

console.log(
  "\nListening on " + chalk.blueBright.underline("http://localhost:8000"),
);

await app.listen({ port: 8000, signal: createExitSignal() });

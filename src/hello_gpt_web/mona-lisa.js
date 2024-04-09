import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";

import { createExitSignal, staticServer } from "../shared/server.ts";
import { gptPrompt, makeImage } from "../shared/openai.js";

import { Chalk } from "npm:chalk@5";
const chalk = new Chalk({ level: 1 });

// change working dirctory to the current file's directory
Deno.chdir(new URL(".", import.meta.url).pathname);
// log the current working directory with friendly message
console.log(`Current working directory: ${Deno.cwd()}`);

const app = new Application();
const router = new Router();

// API routes
router.get("/api/gpt", async (ctx) => {
  console.log("Received request for /api/gpt");
  const prompt = ctx.request.url.searchParams.get("prompt");
  console.log(prompt);
  const result = await gptPrompt(prompt, { max_tokens: 1024 });
  ctx.response.body = result;
});

// add the DALL•E route
router.get("/api/dalle", async (ctx) => {
  console.log("Received request for /api/dalle");
  const prompt = ctx.request.url.searchParams.get("prompt");
  console.log("Image Prompt:", prompt);
  const result = await makeImage(prompt);
  ctx.response.body = result;
});

app.use(router.routes());
app.use(router.allowedMethods());
app.use(staticServer);

console.log(
  "\nListening on " + chalk.blueBright.underline("http://localhost:8000"),
);

await app.listen({ port: 8000, signal: createExitSignal() });

/**
 * light-bulb_joke
 * Asks the user for what they do for work and then prints out a light bulb joke about the people in that said work profession
 */

import { ask, say } from "../shared/cli.js";
import { gptPrompt } from "../shared/openai.js";

main();

async function main() {
  say("Hello Friend!");

  const topic = await ask("What do you do for work?");

  say("");

  const prompt =
    `This is what I do for work: ${topic}. Create a light-bulb joke about the people in my work profession.`;

  const joke = await gptPrompt(prompt, { temperature: 0.7 });
  say(`"""\n${joke}\n"""`);
}

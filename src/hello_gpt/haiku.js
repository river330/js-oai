/**
 * This program prompts the user to enter ther favorite animal and the season they were born.
 * and then uses GPT-4 language model to generate a haiku about that animal during that season.
 */

import { gptPrompt } from "../shared/openai.js";
import { ask, say } from "../shared/cli.js";

main();

async function main() {
  say("Hello, GPT!");

  const animal = await ask("What is your favorite animal?");
  const season = await ask("What season were you born?");

  say("");

  const prompt =
    `My favorite animal is ${animal} and I was born in ${season} season. Create a haiku about that animal during that season.`;

  const limerick = await gptPrompt(prompt, { temperature: 0.7 });
  say(`"""\n${limerick}\n"""`);
}

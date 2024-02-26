/**
 * This is a basic example of sending a prompt to GPT and showing the results.
 */

import { ask, say } from "../shared/cli.js";
import { makeImage } from "../shared/openai.js";
import { gptPrompt } from "../shared/openai.js";

main();

async function main() {
  say("Let's make a playlist!");
  say("");

  const vibe = ask("What vibe are you looking for?");
  const length = ask(
    "Roughly how long of a playlist would you like (in minutes)",
  );

  const songs = ask("Do you have songs you know you want in it?");

  const songPrompt = `
    You are an assisstant helping in curating a Spotify playlist for the user.
    The user is looking for a playlist which has a running time of ${length}.

    When choosing which songs to put in the playlist recommend songs that fit this vibe: ${vibe}.

    Please include any song provided by the user within the playlist and you can use that as an additional guide for choosing other songs:
    ${songs}.
    Format these songs in the same way as the others.

    Be brief in your response, and only provide the list of songs.

    For example:
    For a 'Girly Pop' playlist that is 20 minutes, I recommend:
    1. Song Title by Song Artist (Length)
    2. Song Title by Song Artist (Length)
    3. Song Title by Song Artist (Length)
  `;
  const result = await gptPrompt(songPrompt, {
    temperature: 0.5,
    max_tokens: 300,
  });

  say(`\n${result}`);
  say("");
  const titlePrompt = `
    Based on the result provided for the playlisy: ${result},

    Provide 3 playlist name options for the user.

    Have the title be short and brief, and quirky and funny, maybe use a pun?

    Respond in the following format —
    Here are three potential titles for your new playlist:
    1.
    2.
    3.
    ...
  `;
  const titleOptions = await gptPrompt(titlePrompt, {
    temperature: 0.7,
  });

  const coverPrompt = `
    Based on the result provided for the playlisy: ${result}, 
    and the title options: ${titleOptions}

    Generate a prompt to give to DALL-E to create a cover for the playlist. 

    Respond in the following format —
    Here is a prompt to give to DALL-E to create abstract covers for your new playlist: 
    'prompt'

    Do not include title within the DALL-E cover prompt, make it subtle.
  `;
  const cover = await gptPrompt(coverPrompt, {
    temperature: 0.7,
  });

  const generatedCover = await makeImage(cover, {});

  say(`\n${titleOptions}`);
  say(`\n${generatedCover}`);
  say("");
}

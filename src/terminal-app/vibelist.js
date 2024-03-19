/**
 * A Spotify Playlist maker curated based on VIBES
 */

import { ask, say } from "../shared/cli.js";
import { makeImage } from "../shared/openai.js";
import { gptPrompt } from "../shared/openai.js";

import chalk from "npm:chalk@5";
import boxen from "npm:boxen@7.1.1";
import figlet from "npm:figlet";

main();

async function main() {
  //figlet header
  say(
    chalk.hex(`#1DB954`).bold(figlet.textSync("VIBELIST", {})),
  );
  say(chalk.underline("\nLet's make a playlist!"));
  say("");

  //figuring out the vibe the user wants for their playlist
  const vibe = ask(chalk.hex(`#1DB954`).bold("What vibe are you looking for?"));
  //sets a goal on the run time will be for the playlist
  const length = ask(
    chalk.hex(`#1DB954`).bold(
      "Roughly how long of a playlist would you like (in minutes)",
    ),
  );

  //allows users to input their own songs into the playlist, helps with curation
  const songs = ask(
    chalk.hex(`#1DB954`).bold("Do you have songs you know you want in it?"),
  );

  //prompt to generate playlist songs
  const songPrompt = `
    You are an assisstant helping in curating a Spotify playlist for the user.
    The user is looking for a playlist which has a running time of ${length}.

    When choosing which songs to put in the playlist recommend songs that fit this vibe: ${vibe}.

    Please include any song provided by the user within the playlist and you can use that as an additional guide for choosing other songs:
    ${songs}.
    Format these songs in the same way as the others.

    Be brief in your response, and only provide the list of songs.

    For example (Follow strictly):
    "1. Song Title by Song Artist (Length)
    2. Song Title by Song Artist (Length)
    3. Song Title by Song Artist (Length)

    Total playlist time:"

    DO NOT ADD A NOTE SECTION IF PLAYLIST TIME ISN'T EXACT,
  `;

  //gets playlist song results
  const result = await gptPrompt(songPrompt, {
    temperature: 0.5,
    max_tokens: 500,
  });

  //spits out playlist songs
  say("");
  say(boxen(
    chalk.underline(
      `For a ` + chalk.hex(`#1DB954`).bold(vibe) + ` playlist that is ` +
        chalk.hex(`#1DB954`).bold(length) +
        ` minutes:\n`,
    ) + result,
    {
      padding: 1,
      margin: 0.5,
      borderStyle: "round",
      // width: 100,
      title: chalk.hex(`#1DB954`).bold("Your Playlist"),
    },
  ));
  say("");

  //prompt to generate title options for the new playlist
  const titlePrompt = `
    Based on the result provided for the playlisy: ${result},

    Provide 3 playlist name options for the user.

    Have the title be short and brief, and quirky and funny, maybe use a pun?

    Respond in the following format —
    1.
    2.
    3.
  `;

  //gets playlist titles
  const titleOptions = await gptPrompt(titlePrompt, {
    temperature: 0.7,
  });

  //prompt to create a cover prompt for the new playlist via DALL-E
  const coverPrompt = `
    Based on the result provided for the playlisy: ${result}, 
    and the title options: ${titleOptions}

    Generate a prompt to give to DALL-E to create a cover for the playlist. 

    Respond in the following format —
    Here is a prompt to give to DALL-E to create abstract covers for your new playlist: 
    'prompt'

    Do not include title within the DALL-E cover prompt, make it subtle.
  `;

  //gets cover prompt
  const cover = await gptPrompt(coverPrompt, {
    temperature: 0.7,
  });

  //gets generated cover
  const generatedCover = await makeImage(cover, {});

  //spits out title and cover
  say("");
  say(boxen(titleOptions, {
    padding: 1,
    margin: 0.5,
    borderStyle: "round",
    // width: 100,
    title: chalk.hex(`#1DB954`).bold("Potential Playlist Titles"),
  }));
  say(boxen(generatedCover, {
    padding: 1,
    margin: 0.5,
    borderStyle: "round",
    width: 80,
    title: chalk.hex(`#1DB954`).bold("Your Cover"),
  }));
  say("");
}

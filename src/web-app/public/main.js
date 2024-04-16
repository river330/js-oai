console.log("Hello, main.js");

const submit = document.getElementById("submit");
const vibeInput = document.getElementById("vibeInput"); // Corrected ID

async function onSubmit() {
  console.log("submitting");
  const vibe = vibeInput.value;
  const prompt =
    `You are a designer trying to provide a type hierarchy based on the following vibes: ${vibe}. You will be providing option for a headline, subhead, and body, identifying the typeface, letterspacing, typecase for each one. In addition you will provide a font-size ratio for the three.
      \nWhen returning your response, make sure to structure it in JSON format and to include the following parameters.
      {
        headline: {
            font-size: 'this should be in reference to the body.font-size, so something like 1.5rem', 
            typeface: 'helvetica',
            letterspacing: '0.5px',
            typecase: 'uppercase'
        },
        subhead: {
            font-size: 'this should be in reference to the body.font-size, so something like 1.25rem', 
            typeface: 'helvetica',
            letterspacing: '0.5px',
            typecase: 'lowercase'
        },
        body: {
            font-size: '16px',
            typeface: 'helvetica',
            letterspacing: '0.5px',
            typecase: 'sentence'
        }
      }`;

  const response = await fetch(`/upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: prompt }),
  })
    .then((response) => response.json());
  console.log(response);
}
submit.addEventListener("click", onSubmit);

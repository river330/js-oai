console.log("Hello, main.js");

const originalInput = document.getElementById("original");
const movementInput = document.getElementById("movement");
const revisionDiv = document.getElementById("revision");
const submitButton = document.getElementById("submit");
const genImage = document.getElementById("genImage");
const loadingSpan = document.getElementById("loading");

async function onSubmit() {
  console.log("submitting");
  const movement = movementInput.value;
  const version1 = originalInput.value;
  const prompt =
    `Revise the following text to be prep for a DALL-E prompt. The following text is meant to describe a painting. Please be true to the provided text with minimal edits and changes to the copy. At the end of the text add that it was painted from the ${movement} art movement. return only the revised text: ${version1};
    \n\n 
    Here is an example...
    If the provided text is "She’s a white woman who is portrayed on actually a very small piece of canvas in very earthy toned paint, sitting on a chair with her arms folded. She’s got tight coils but falls down her shoulder. She looks a little bald and has very pearly white skin. She seems to be wearing some sort of silky grey-themed night gown."
    and the art movement is "Surrealism", then the provided text should align similar to
    "Paint a picture of a a white woman who is portrayed on actually a very small piece of canvas in very earthy toned paint, sitting on a chair with her arms folded. She’s got tight coils but falls down her shoulder. She looks a little bald and has very pearly white skin. She seems to be wearing some sort of silky grey-themed night gown. The portrait exudes a surreal quality, aligning with the surrealism art movement."
    `;
  loadingSpan.innerHTML = "loading...";
  revisionDiv.innerHTML = "";
  genImage.src = "";

  const version2 = await fetch(`/api/gpt?prompt=${encodeURIComponent(prompt)}`)
    .then((response) => response.text());

  revisionDiv.innerHTML = version2;

  const imageData = await fetch(
    `/api/dalle?prompt=${encodeURIComponent(version2)}`,
  )
    .then((response) => response.text())
    .then((url) => {
      genImage.src = url;
      loadingSpan.innerHTML = "";
    });
}

submitButton.addEventListener("click", onSubmit);

originalInput.value =
  `Describe the Mona Lisa as in-depth as you'd like without using the words 'Mona Lisa' or 'DaVinci'`;

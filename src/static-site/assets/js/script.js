console.log("working");

let eyesImg = document.getElementById("eyes-img");
let noseImg = document.getElementById("nose-img");
let mouthImg = document.getElementById("mouth-img");

function randomFaces() {
  console.log("randomized");
  const randomNumber1 = Math.floor(Math.random() * 7) + 1;
  const randomNumber2 = Math.floor(Math.random() * 7) + 1;
  const randomNumber3 = Math.floor(Math.random() * 7) + 1;

  const newEyes = `assets/images/eyes/eyes_0${randomNumber1}.jpg`;
  const newNose = `assets/images/nose/nose_0${randomNumber2}.jpg`;
  const newMouth = `assets/images/mouth/mouth_0${randomNumber3}.jpg`;

  eyesImg.src = newEyes;
  noseImg.src = newNose;
  mouthImg.src = newMouth;
}

let randomizer = document.querySelector(".random-button");
randomizer.addEventListener("click", randomFaces);

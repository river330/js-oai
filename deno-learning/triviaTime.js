/**
 * triviaTime.js
 * 
 * Play a short game of trivia and tells you how many you get correct
 */
console.log("Let's play some trivia!");

function checkAnswers(one, two, three){
  let totalCorrect = 0;
  if (one.toUpperCase() == "B"){
    totalCorrect++
  } 
  if (two.toUpperCase() == "C"){
    totalCorrect++
  }
  if (three.toUpperCase() == "B"){
    totalCorrect++
  }
  return totalCorrect
}

function startTrivia(){
  const answerOne = prompt("How many planets are there in the Solar System?\nA) 10\nB) 8\nC) 7\n");
  const answerTwo = prompt("What's the biggest planet?\nA) Neptune\nB) Saturn\nC) Jupiter\n");
  const answerThree = prompt("Roughly in miles, how far is Earth from the Sun\nA) 110 million\nB) 93 million\nC) 86 million\n");
  
  return "You got " + checkAnswers(answerOne, answerTwo, answerThree) + " out of 3 correct!";
}

console.log(startTrivia());

  /**
   * Output:
   *
   * You got 2 out of 3 correct!
   */
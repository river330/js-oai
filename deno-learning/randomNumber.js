/**
 * randomNumber.js
 * 
 * Tries to guess a number from 0 to 6
 */

console.log("Think of a number in your head from 0-6")



function randomNumber(number) {
  return Math.floor(Math.random() * (number + 1));
}

setTimeout(() => {  
  console.log("Is your number " + randomNumber(6) + "?"); 
}, 2000);


  /**
   * Output:
   *
   * Is your number 3?
   */
/**
 * sum.js
 * 
 * Asks you for two numbers and then gives you the total
 */
function addNumbers(one, two) {
  const numberOne = parseInt(one);
  const numberTwo = parseInt(two)
  return numberOne + numberTwo
}

function hello() {
    const numberOne  = prompt("Give me a number");
    const numberTwo = prompt("Give me another number");

    return addNumbers(numberOne, numberTwo);

  }
  
  console.log(hello());

  /**
   * Output:
   *
   * 102
   */
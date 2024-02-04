/**
 * tempVibes.js
 * 
 * Asks how out it is in F and tells you if it is cold, warm, or hot!
 */
function tempVibes(temp) {
  if (temp >= 90){
    return "hot"
  } else if (temp < 90 && temp >= 50){
    return "warm"
  } else {
    return "cold"
  }
}

function hello() {
    const temp = prompt("What's the temp in F?");
  
    return "It is " + tempVibes(temp);

}
  
  console.log(hello());

  /**
   * Output:
   *
   * It is hot
   */
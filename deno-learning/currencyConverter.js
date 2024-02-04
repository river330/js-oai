/**
 * currencyConverter.js
 * 
 * Converts your USD to Swiss Francs
 */
function currencyConvert(number) {
  let USD = Number(number)
  return USD*0.87
}

function hello() {
    const amount = prompt("How much money in USD do you have?");
  
    return "You have " + currencyConvert(amount).toFixed(2) + " Swiss Francs";

}
  
  console.log(hello());

  /**
   * Output:
   *
   * You have 8.7 Swiss Francs
   */
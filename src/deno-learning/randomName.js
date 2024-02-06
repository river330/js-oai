/**
 * randomName.js
 * 
 * Will return with either your First or Last name
 */
function randomName(first, last) {
  const names = [first, last]

  return names[Math.floor(Math.random() * names.length)];
}

function hello() {
    const firstName = prompt("What's your first name?");
    const lastName = prompt("What's your last name?");
    return randomName(firstName, lastName);

}
  
  console.log(hello());

  /**
   * Output:
   *
   * Rivera
   */
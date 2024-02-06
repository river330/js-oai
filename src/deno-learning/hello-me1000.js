/**
 * hello-me1000.js
 * 
 * returns with Hello [name] x1000
 */

const name  = prompt("What's your name?");

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function hello() {
    if (name != null) {
      return "Hello " + capitalize(name);
    }
  }
  
for (let i = 0;  i < 1000; i++){
  console.log(hello());
}

  /**
   * Output:
   *
   * Hello Rand
   * Hello Rand
   * Hello Rand
   * ..
   */
/**
 * hello-me.js
 */
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function hello() {
    const name  = prompt("What's your name?");

    if (name != null) {
      return "Hello " + capitalize(name);
    }

  }
  
  console.log(hello("world"));

  /**
   * Output:
   *
   * Hello Rand
   */
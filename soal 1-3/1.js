function pascal() {
    let input = document.getElementById("input").value;
  
    let result = "";
    function faktorial(n) {
      let a = 1;
      let i = 1;
  
      while (i <= n) {
        a *= i;
        i++;
      }
      return a;
    }
  
    for (let i = 0; i < input; i++) {
      for (let j = input; j >= i; j--) {
        result += " ";
      }
  
      for (let j = 0; j <= i; j++) {
        result += faktorial(i) / (faktorial(j) * faktorial(i - j)) + " ";
      }
      result += "<br>";
    }
    document.getElementById("output").innerHTML = result;
    
  }
  
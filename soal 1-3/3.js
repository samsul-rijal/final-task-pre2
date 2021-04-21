function removesDuplicate() {
    let input = document.getElementById("input1").value;
    let result = "";
  
    function duplicateArray(num) {
      let array = [];
      let object = {};
  
      for (i = 0; i < num.length; i++) {
        object[num[i]] = 0;
      }
      for (i in object) {
        array.push(i);
      }
      return array;
    }

    result = duplicateArray(input);
    document.getElementById("output").innerHTML = `Output : ${result}`;
  }
  
//Based on code from https://www.w3schools.com/howto/howto_js_autocomplete.asp

export function autocomplete(inputElement, autocompleteOptions) {
  /*the autocomplete function takes two arguments,
      the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  inputElement.addEventListener("blur", function (e) {
    setTimeout(() => {
      closeAllLists();
      if (!autocompleteOptions.includes(inputElement.value)) {
        inputElement.value = "";
      }
    }, 200);
  });

  inputElement.addEventListener("input", showPopUp);
  inputElement.addEventListener("focus", showPopUp);
  /*execute a function presses a key on the keyboard:*/
  inputElement.addEventListener("keydown", function (e) {
    const optionsContainer = document.getElementById(
      this.id + "autocomplete-list"
    );

    if (optionsContainer) {
      const optionElements = optionsContainer.getElementsByTagName("article");

      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(optionElements);
      } else if (e.keyCode == 38) {
        //up
        /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(optionElements);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (optionElements) {
            optionElements[currentFocus].click();
          }
        }
      }
    }
  });
  function addActive(autocompleteOptionElements) {
    if (!autocompleteOptionElements) return false;

    removeActive(autocompleteOptionElements);

    if (currentFocus >= autocompleteOptionElements.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = autocompleteOptionElements.length - 1;
    autocompleteOptionElements[currentFocus].classList.add(
      "autocomplete-active"
    );
  }
  function removeActive(autocompleteOptionElements) {
    for (var i = 0; i < autocompleteOptionElements.length; i++) {
      autocompleteOptionElements[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(element) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (element != x[i] && element != inputElement) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  function showPopUp() {
    const val = this.value;

    closeAllLists();
    currentFocus = -1;

    const optionsContainer = document.createElement("article");
    optionsContainer.setAttribute("id", this.id + "autocomplete-list");
    optionsContainer.setAttribute("class", "autocomplete-items");

    this.parentNode.appendChild(optionsContainer);

    autocompleteOptions.forEach((option) => {
      if (
        val === "" ||
        !val ||
        option.toUpperCase().includes(val.toUpperCase())
      ) {
        const matchingOption = document.createElement("article");

        matchingOption.innerHTML = option;

        matchingOption.innerHTML += `<input type='hidden' value="${option}">`;

        matchingOption.addEventListener("click", function () {
          inputElement.value =
            matchingOption.getElementsByTagName("input")[0].value;
          closeAllLists();
        });
        optionsContainer.appendChild(matchingOption);
      }
    });
  }
}

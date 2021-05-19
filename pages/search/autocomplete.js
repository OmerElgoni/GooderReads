export function autocomplete(inputElement, autocompleteOptions) {
  /*the autocomplete function takes two arguments,
      the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  inputElement.addEventListener("blur", function (e) {
    if (!autocompleteOptions.includes(inputElement.value)) {
      inputElement.value = "";
    }
  });

  inputElement.addEventListener("input", showPopUp);
  inputElement.addEventListener("click", showPopUp);
  /*execute a function presses a key on the keyboard:*/
  inputElement.addEventListener("keydown", function (e) {
    const optionsContainer = document.getElementById(
      this.id + "autocomplete-list"
    );

    if (optionsContainer) {
      const optionElements = optionsContainer.getElementsByTagName("div");

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
    /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (element != x[i] && element != inputElement) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  function showPopUp() {
    const val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    const optionsContainer = document.createElement("DIV");
    optionsContainer.setAttribute("id", this.id + "autocomplete-list");
    optionsContainer.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(optionsContainer);
    /*for each item in the array...*/
    autocompleteOptions.forEach((option) => {
      if (option.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        const matchingOption = document.createElement("DIV");

        matchingOption.innerHTML =
          "<strong>" + option.substr(0, val.length) + "</strong>";
        matchingOption.innerHTML += option.substr(val.length);

        matchingOption.innerHTML +=
          "<input type='hidden' value='" + option + "'>";

        matchingOption.addEventListener("click", function () {
          inputElement.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();
        });
        optionsContainer.appendChild(matchingOption);
      }
    });
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

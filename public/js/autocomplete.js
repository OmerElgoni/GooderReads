//Based on code from https://www.w3schools.com/howto/howto_js_autocomplete.asp

export function autocomplete(inputElement, autocompleteOptions) {
  /*the autocomplete function takes two arguments,
      the text field element and an array of possible autocompleted values:*/
      let currentFocus;
  inputElement.addEventListener("blur", function (e) {
    setTimeout(() => {
      closeAllLists();
      if (!autocompleteOptions.includes(inputElement.value)) {
        inputElement.value = "";
      }
    }, 150);
  });

  inputElement.addEventListener("input", showPopUp);
  inputElement.addEventListener("focus", showPopUp);
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
        //If enter then simulate click item
        if (currentFocus > -1) {
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
    autocompleteOptionElements[currentFocus].scrollIntoView();
  }
  function removeActive(autocompleteOptionElements) {
    for (let i = 0; i < autocompleteOptionElements.length; i++) {
      autocompleteOptionElements[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(element) {
    let x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
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
      if (!val || option.toUpperCase().includes(val.toUpperCase())) {
        const matchingOption = document.createElement("article");
        let text = option;
        if (val) {
          let toReplace = [];

          const upperCaseOption = option.toUpperCase();
          const uppercaseInput = val.toUpperCase();

          let startIndex = 0;
          while (startIndex !== -1) {
            startIndex = upperCaseOption.indexOf(
              uppercaseInput.toUpperCase(),
              startIndex
            );

            if (startIndex !== -1) {
              toReplace.push(option.slice(startIndex, startIndex + val.length));
            } else {
              break;
            }
            startIndex += 1;
          }

          new Set(toReplace).forEach((repl) => {
            text = text.replaceAll(repl, `<strong>${repl}</strong>`);
          });
        }
        matchingOption.innerHTML = text;

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

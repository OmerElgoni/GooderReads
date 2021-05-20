import { autocomplete } from "./autocomplete.js";

var searchResults;
var filteredResults;

function card(book_id, title, author, image, publisher, publish_date) {
  const element = document.createElement("section");
  element.className = "card";
  element.innerHTML = `<img src="${image}" alt="Book cover image." width=100 height=100 />
  <article class="card-details">
    <h3>${title}</h3>
    <p>
    By: ${author}, ${publisher}
    </p>
    <p>
    Released: ${new Date(publish_date).toDateString()}
    </p>
  </article>
`;
  element.addEventListener("click", () => {
    window.location.href = `/book-details/?id=${book_id}`;
  });
  return element;
}
function getUniqueGenres(books) {
  return Array.from(
    new Set(
      books.reduce((store, element) => {
        return store.concat(element.genres.map((genre) => genre.genre));
      }, [])
    )
  );
}

function getUniqueAuthors(books) {
  return Array.from(
    new Set(
      books.reduce((store, element) => {
        return store.concat(
          element.authors.map((author) =>
            [author.first_name, author.last_name].join(" ")
          )
        );
      }, [])
    )
  );
}

function getUniquePublishers(books) {
  return Array.from(
    new Set(
      books.map((element) => {
        return element.publisher;
      })
    )
  );
}

function applyFilters() {
  const genreFilterValue = document.querySelector("#genreInput").value;
  const authorFilterValue = document.querySelector("#authorInput").value;
  const publisherFilterValue = document.querySelector("#publisherInput").value;

  filteredResults = searchResults.filter((element) => {
    if (genreFilterValue !== "") {
      if (
        !element.genres.map((genre) => genre.genre).includes(genreFilterValue)
      ) {
        return false;
      }
    }

    if (authorFilterValue !== "") {
      if (
        !element.authors
          .map((author) => [author.first_name, author.last_name].join(" "))
          .includes(authorFilterValue)
      ) {
        return false;
      }
    }
    if (publisherFilterValue !== "") {
      if (element.publisher !== publisherFilterValue) {
        return false;
      }
    }

    return true;
  });
  populateSearchResults(
    document.getElementById("search-result-content"),
    filteredResults
  );
}

function populateSearchResults(parent, results) {
  parent.innerHTML = ``;
  results.forEach((element) => {
    parent.appendChild(
      card(
        element.book_id,
        element.title,
        [element.authors[0].first_name, element.authors[0].last_name].join(" "),
        element.cover_art,
        element.publisher,
        element.release_date
      )
    );
  });
}
// function getUniqueAuthors
async function querySearchAPI() {
  const submitButton = document.getElementById("applyFiltersButton");
  submitButton.addEventListener("click", applyFilters);
  submitButton.disabled = true;

  const parent = document.getElementById("search-result-content");
  const APIEndpoint = "https://grad-gooder-reads-database.herokuapp.com/api/";
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const searchQuery = urlParams.get("q");
  if (searchQuery !== null) {
    parent.innerHTML = `Loading...`;

    const queryResult = await (
      await fetch(`${APIEndpoint}books/search?query=${searchQuery}`)
    ).json();

    searchResults = queryResult;
    populateSearchResults(parent, searchResults);

    //Add autocomplete functionality to each of these input fields
    autocomplete(
      document.getElementById("genreInput"),
      getUniqueGenres(searchResults)
    );
    autocomplete(
      document.getElementById("authorInput"),
      getUniqueAuthors(searchResults)
    );
    autocomplete(
      document.getElementById("publisherInput"),
      getUniquePublishers(searchResults)
    );
    submitButton.disabled = false;
  }
}

window.onload = querySearchAPI();

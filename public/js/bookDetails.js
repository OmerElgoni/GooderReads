function setTitle(title) {
  const element = document.getElementById("bookTitle");
  element.textContent = title;
}

function setAuthor(author) {
  const element = document.getElementById("bookAuthor");
  element.textContent = `by ${author}`;
}

async function setDetails() {
  const APIEndpoint = "https://grad-gooder-reads-database.herokuapp.com/api/";
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const bookId = urlParams.get("id");
  console.log("bookId", bookId);

  const queryResult = await (
    await fetch(`${APIEndpoint}books/${bookId}`)
  ).json();
  console.log("queryResult", queryResult)
  setTitle(queryResult.title);
  setAuthor(queryResult.author)
}


window.onload = setDetails();
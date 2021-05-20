function setTitle(title) {
  const element = document.getElementById("bookTitle");
  element.textContent = title;
}

function setCoverImage(coverImageUrl, title) {
  const element = document.getElementById("coverImage");
  element.src = coverImageUrl
    ? coverImageUrl
    : `https://via.placeholder.com/200x250.?text=${title}jpg`;
}

function setRatings(positiveRatings, negativeRatings) {
  document.getElementById("positiveReviews").textContent =
    positiveRatings;
  document.getElementById("negativeReviews").textContent =
    negativeRatings;
}
function setAuthors(authors) {
  const element = document.getElementById("bookAuthor");
  let authorText = `by ${authors[0].first_name} ${authors[0].last_name}`;
  for (let index = 1; index < authors.length; index++) {
    const nextAuthor = `${authors[i].first_name} ${authors[i].last_name}`;
    authorText = authorText + " and " + nextAuthor;
  }
  element.textContent = authorText;
}

function setDescription(description) {
  const element = document.getElementById("bookDescription");
  element.textContent = description;
}

async function setDetails() {
  const APIEndpoint = "https://grad-gooder-reads-database.herokuapp.com/api/";
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const bookId = urlParams.get("id");
  console.log("bookId", bookId);

  let authorQueryResult = fetch(`${APIEndpoint}books/${bookId}/author`);
  const bookQueryResult = await (
    await fetch(`${APIEndpoint}books/${bookId}`)
  ).json();
  console.log("bookQueryResult", bookQueryResult);
  authorQueryResult = await (await authorQueryResult).json();
  console.log("authorQueryResult", authorQueryResult);
  setTitle(bookQueryResult.title);
  setDescription(bookQueryResult.description);
  setCoverImage(bookQueryResult.cover_art, bookQueryResult.title);
  setAuthors(authorQueryResult);
  setRatings(bookQueryResult.positive_rating, bookQueryResult.negative_rating);
}

window.onload = setDetails();

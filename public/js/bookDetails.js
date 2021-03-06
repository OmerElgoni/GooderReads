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
    positiveRatings + " Positive Reviews";
  document.getElementById("negativeReviews").textContent =
    negativeRatings + " Negative Reviews";
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

  document.getElementById("readlistButton").addEventListener("click", addToReadlist);
  document.getElementById("wishlistButton").addEventListener("click", addToWishlist);
  document.getElementById("reviewForm").addEventListener("submit", submitReview);

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
  setCoverImage(bookQueryResult.cover_art, bookQueryResult.title);
  setDescription(bookQueryResult.description);
  setAuthors(authorQueryResult);
  setRatings(bookQueryResult.positive_rating, bookQueryResult.negative_rating);

  const queryResult = await (await fetch(`${APIEndpoint}books/${bookId}/readlist`).then(response => response.json()));
  var reviewSection = document.getElementById("reviewContainer");

  var reviews = "";
  var noReviews = "<article>" + "No reviews yet! Be the first!" + "</article>";

  if (typeof queryResult[0] !== 'undefined') {
    queryResult[0].past_book_owner.sort(function (a, b) {
      return new Date(b.user_past_book.date_completed)
        - new Date(a.user_past_book.date_completed);
    });

    var postiveRating = 0;
    var negativeRating = 0;

    queryResult[0].past_book_owner.forEach((pastBookOwner) => {
      var date = new Date(pastBookOwner.user_past_book.date_completed.replace(' ', 'T'));
      console.log({ pastBookOwner });
      reviews += "<article>" +
        '<section class="user-name">' +
        pastBookOwner.first_name +
        ": </section>" +
        '\"' +
        pastBookOwner.user_past_book.review +
        '\"' +
        "</article>";
      if (pastBookOwner.user_past_book.rating) {
        postiveRating += 1;
      }
      else {
        negativeRating += 1;
      }
    });
  }

  if (reviews == "") {
    reviews += noReviews;
  }

  reviewSection.innerHTML = reviews;
}


async function addToWishlist() {
  const APIEndpoint = "https://grad-gooder-reads-database.herokuapp.com/api/";
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const bookId = urlParams.get("id");
  const userId = 2;
  const wishlistQueryResult = await (
    await fetch(`${APIEndpoint}users/${userId}/wishlist/${bookId}`)
  ).json();

  alert(wishlistQueryResult);
}

async function addToReadlist() {
  const APIEndpoint = "https://grad-gooder-reads-database.herokuapp.com/api/";
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const bookId = urlParams.get("id");
  const userId = 2;
  const readlistQueryResult = await (
    await fetch(`${APIEndpoint}users/${userId}/wishlist/${bookId}`)
  ).json();
  if (readlistQueryResult === "success") {
    alert("added to readlist")
  }
  alert(readlistQueryResult);
}

async function submitReview(event) {
  if (event.preventDefault) event.preventDefault();
  const APIEndpoint = "https://grad-gooder-reads-database.herokuapp.com/api/";
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const bookId = urlParams.get("id");
  const userId = 2;
  // const text = document.getElementById("review-textarea").textContent;
  const text = document.getElementById("review-textarea").value;
  console.log(text)
  const reviewQueryResult = await (
    await fetch(`${APIEndpoint}books/${bookId}/review/${userId}?text=${text}`, { method: 'POST' })
  ).json();
  console.log(reviewQueryResult);
  location.reload();
}

window.onload = setDetails();

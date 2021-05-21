const APIEndpoint = "https://grad-gooder-reads-database.herokuapp.com/api/";

let userId;

document.addEventListener("DOMContentLoaded", loadData());

async function loadData() {
  userId = sessionStorage.getItem('user_Id');
  getPastBooksData();
}

async function getPastBooksData() {
  const queryResult = await await fetch(`${APIEndpoint}books`).then(
    (response) => response.json()
  );

  let bookListSection = document.getElementById("book_browser");

  let read_list = "";

  queryResult.sort(function (a, b) {
    return new Date(b.release_date) - new Date(a.release_date);
  });

<<<<<<< Updated upstream
  var cover_art = "";
=======
  let books = Array(12).fill(0);
  let pages = Array(12).fill(0);

  let location = "location.href='/bookDetails'";

  let cover_art = "";
>>>>>>> Stashed changes
  queryResult.forEach((pastBook, i) => {
    let date = new Date(pastBook.release_date.replace(" ", "T"));

    cover_art = pastBook.cover_art;

    //append html elements with respective book values
    read_list +=
      "" +
      '<section class="column">' +
      '<section class="card">' +
      "" +
      '<section class="image-container">' +
      "" +
      '<img id=" book-art " alt="Book art" class="image" src="' +
      cover_art +
      '"/>' +
      "</section>" +
      '<section class="card-body">' +
      "<strong>" +
      pastBook.title +
      "</strong>" +
      "<p>ISBN: " +
      pastBook.isbn +
      "</p>" +
      "<p>Release date: " +
      date +
      "</p>" +
      "</section>" +
      '<a class="btn-browse"  href="' +
      `/bookDetails/?id=${pastBook.book_id}` +
      '">View Details</a > ' +
      " </section>" +
      " </section>" +
      "";
  });

  bookListSection.innerHTML = read_list;
}

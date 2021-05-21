const APIEndpoint = "https://grad-gooder-reads-database.herokuapp.com/api/";

var userId = "2";

document.addEventListener("DOMContentLoaded", loadData());

async function loadData() {
  getPastBooksData();
}

async function getPastBooksData() {
  const queryResult = await await fetch(`${APIEndpoint}books`).then(
    (response) => response.json()
  );

  var bookListSection = document.getElementById("book_browser");

  var read_list = "";

  queryResult.sort(function (a, b) {
    return new Date(b.release_date) - new Date(a.release_date);
  });

  var cover_art = "";
  queryResult.forEach((pastBook, i) => {
    var date = new Date(pastBook.release_date.replace(" ", "T"));

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
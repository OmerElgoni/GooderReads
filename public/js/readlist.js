const APIEndpoint = 'https://grad-gooder-reads-database.herokuapp.com/api/';

var userId = '2';

document.addEventListener("DOMContentLoaded", loadData());

async function loadData() {
    queryUserAPI();
    getPastBooksData();
}

async function queryUserAPI() {
    const queryResult = await (await fetch(`${APIEndpoint}users/${userId}`).then(response => response.json()));

    console.log(queryResult);
}
async function getPastBooksData() {
    const queryResult = await (await fetch(`${APIEndpoint}users/${userId}/readlist`).then(response => response.json()));
    console.log(queryResult[0].past_books);

    var bookListSection = document.getElementById("read_list");

    var read_list = "";

    queryResult[0].past_books.sort(function(a, b) {
        return new Date(b.user_past_book.date_completed) -
            new Date(a.user_past_book.date_completed);
    });

    var books = Array(12).fill(0);
    var pages = Array(12).fill(0);

    var location = "location.href='/bookDetails'"

    var cover_art = "";
    queryResult[0].past_books.forEach((pastBook, i) => {
        var date = new Date(pastBook.user_past_book.date_completed.replace(' ', 'T'));
        console.log({ pastBook });

        cover_art = pastBook.cover_art;

        //append html elements with respective book values
        read_list += "" + '<section class="book-info-block">' + '' +
            '<section class="image-container">' + '' +
            '<img id=" book-art " alt="Book art" class="image" src="' + cover_art + '"/>' +
            '</section>' +
            '<section class="book-info ">' +
            '<strong>' + pastBook.title + '</strong>' +
            '<p>ISBN: ' + pastBook.isbn + '</p>' +
            '<p>Date completed: ' + date + '</p>' +
            '</section>' +
            '<button class="btn-list"  onclick="' + location + +`/?id=${pastBook.id}'">View Details</button > ' +
            ' </section>' + '';

    });

    bookListSection.innerHTML = read_list;
}
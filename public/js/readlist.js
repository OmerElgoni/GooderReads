const APIEndpoint = 'https://grad-gooder-reads-database.herokuapp.com/api/';
let user;
let userId;

document.addEventListener("DOMContentLoaded", loadData());

async function loadData() {
    user = await (await fetch(`/user`)).json();
    const response = await (await fetch(`${APIEndpoint}users/find/${user.emails[0].value}`)).json()
    userId = response.user_id;
    sessionStorage.setItem('userId',userId);
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

    const bookListSection = document.getElementById("read_list");

    let read_list = "";

    queryResult[0].past_books.sort(function(a, b) {
        return new Date(b.user_past_book.date_completed) -
            new Date(a.user_past_book.date_completed);
    });

<<<<<<< Updated upstream
    var cover_art = "";
=======
    let books = Array(12).fill(0);
    let pages = Array(12).fill(0);


    let cover_art = "";
>>>>>>> Stashed changes
    queryResult[0].past_books.forEach((pastBook, i) => {
        let date = new Date(pastBook.user_past_book.date_completed.replace(' ', 'T'));
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
            '<a class="btn-list"  href="' + `/bookDetails/?id=${pastBook.book_id}` + '">View Details</a > ' +
            ' </section>' + '';

    });

    bookListSection.innerHTML = read_list;
}
const APIEndpoint = 'https://grad-gooder-reads-database.herokuapp.com/api/';

document.addEventListener("DOMContentLoaded", loadData());

async function loadData() {
    queryGenreAPI();
}

async function queryGenreAPI() {
    const queryResult = await (await fetch(`${APIEndpoint}`).then(response => response.json()));
    console.log(queryResult);

    var bookListSection = document.getElementById("book_browser");

    var book_browser = "";

    var cover_art = "";
    queryResult[0].books.forEach((books, i) => {
        console.log({ books });

        cover_art = books.cover_art;

        //append html elements with respective book values
        book_browser += "" + '<section class="book-info-block">' + '' +
            '<section class="image-container">' + '' +
            '<img id=" book-art " class="image" src="' + cover_art + '"/>' +
            '</section>' +
            '<section class="book-info ">' +
            '<strong>' + books.title + '</strong>' +
            '<p>ISBN: ' + books.subject + '</p>' +
            '</section>' +
            '<input class="gr-button-add-to-list" type="button" value="Add to wishlist"/>' +
            ' </section>' + '';
    });

    bookListSection.innerHTML = book_browser;
}

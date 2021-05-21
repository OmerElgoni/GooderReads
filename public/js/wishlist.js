const APIEndpoint = 'https://grad-gooder-reads-database.herokuapp.com/api/';

let userId;

document.addEventListener("DOMContentLoaded", loadData());

async function loadData() {
    userId = sessionStorage.getItem('userId');
    queryUserAPI();
    getWishlistData();
}

async function queryUserAPI() {
    const queryResult = await (await fetch(`${APIEndpoint}users/${userId}`).then(response => response.json()));

    console.log(queryResult);
}
async function getWishlistData() {
    const queryResult = await (await fetch(`${APIEndpoint}users/${userId}/wishList`).then(response => response.json()));
    console.log(queryResult);

    let bookListSection = document.getElementById("wish_list");

    let wish_list = "";

<<<<<<< Updated upstream
    var cover_art = "";
=======
    let books = Array(12).fill(0);
    let pages = Array(12).fill(0);

    let cover_art = "";
>>>>>>> Stashed changes
    queryResult[0].wishlist_books.forEach((wishedBook, i) => {

        console.log({ wishedBook });
        cover_art = wishedBook.cover_art;

        //append html elements with respective book values
        wish_list += "" + '<section class="book-info-block">' + '' +
            '<section class="image-container">' + '' +
            '<img id=" book-art " alt="Book art" class="image" src="' + cover_art + '"/>' +
            '</section>' +
            '<section class="book-info ">' +
            '<strong>' + wishedBook.title + '</strong>' +
            '<p>ISBN: ' + wishedBook.isbn + '</p>' +
            '<p>Publisher: ' + wishedBook.publisher + '</p>' +
            '<p>' + wishedBook.positive_rating + " Likes | " + wishedBook.negative_rating + " Dislikes " + '</p>' +
            '</section>' +
            '<button class="btn-list">Remove</button>' +
            // '<input class="gr-button-add-to-list" type="button" value="Remove"/>' +
            ' </section>' + '';

    });

    bookListSection.innerHTML = wish_list;
}
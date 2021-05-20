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

    // const name = document.getElementById("user-profile-name");
    // const email = document.getElementById("user-profile-email");

    // name.innerHTML = queryResult.first_name + ' ' + queryResult.last_name;

    // // only show email if authenticated?
    // email.innerHTML = queryResult.email_address;
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
    var cover_art = "images/FC9781491927182.png";

    queryResult[0].past_books.forEach((pastBook, i) => {
        var date = new Date(pastBook.user_past_book.date_completed.replace(' ', 'T'));
        console.log({ pastBook });

        // read_list += "" + '<section class="book-info-block"><section class="image-container"><img id=" book-art " class="image" src="' +
        //     pastBook.cover_art + '"/></section></section>' + '';

        read_list += "" + '<section class="book-info-block">' + '' +
            '<section class="image-container">' + '' +
            // '<img id=" book-art " class="image" src="' + pastBook.cover_art + '"/>' +
            '<img id=" book-art " class="image" src="images/FC9781491927182.png"/>' +
            '' +
            '</section>' +
            '<section class="book-info ">' +
            '<strong>' + pastBook.title + '</strong>' +
            '<p>ISBN: ' + pastBook.isbn + '</p>' +
            '<p>Publisher: ' + pastBook.publisher + '</p>' +
            '<input class="gr-button-add-to-list" type="button" value="View Details"/>' +
            '</section>' +
            ' </section>' + '';

        //     read_list += "<article>" +
        //         '<section class="book-title">' +
        //         pastBook.title +
        //         "</section>" +
        //         '\"' +
        //         pastBook.user_past_book.review +
        //         '\"' +
        //         "</article>"
        // }


        // if (date > new Date().setMonth(new Date().getMonth() - 12)) {
        //     books[date.getMonth()] += 1;
        //     pages[date.getMonth()] += pastBook.pages || 0;
        // }
    });

    bookListSection.innerHTML = read_list;
    //setUpCharts(books, pages);
}
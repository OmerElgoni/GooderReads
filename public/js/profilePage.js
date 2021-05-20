var booksChartSection = document.getElementById('monthlyBooksChart');
var pagesChartSection = document.getElementById('monthlyPagesChart');
booksChartSection.style.display = 'none';
pagesChartSection.style.display = 'none';
const APIEndpoint = 'https://grad-gooder-reads-database.herokuapp.com/api/';
var userId = '2';

document.addEventListener("DOMContentLoaded", loadData());

async function loadData(){
    queryUserAPI();
    getPastBooksData();
}

async function queryUserAPI()
{
   const queryResult = await (await fetch(`${APIEndpoint}users/${userId}`).then(response => response.json()));

    console.log(queryResult);

    const name = document.getElementById("user-profile-name");
    const email = document.getElementById("user-profile-email");

    name.innerHTML = queryResult.first_name + ' ' + queryResult.last_name;

    // only show email if authenticated?
    email.innerHTML = queryResult.email_address;
}

async function getPastBooksData()
{
    const queryResult = await (await fetch(`${APIEndpoint}users/${userId}/readlist`).then(response => response.json()));
    console.log(queryResult[0].past_books);

    var reviewSection = document.getElementById("reviews");
  
    var reviews = "";
    
    queryResult[0].past_books.sort(function(a,b){
        return new Date(b.user_past_book.date_completed) 
                - new Date(a.user_past_book.date_completed);
      });

    var books = Array(12).fill(0);
    var pages = Array(12).fill(0);

    queryResult[0].past_books.forEach((pastBook, i) =>
    { 
        var date = new Date(pastBook.user_past_book.date_completed.replace(' ', 'T'));
        console.log({pastBook});
        if ( i < 3) {
            reviews += "<article>" + 
                    '<section class="book-title">' + 
                    pastBook.title +
                    "</section>" + 
                    '\"' +
                    pastBook.user_past_book.review + 
                    '\"' +
                    "</article>" 
        }  

        if (date > new Date().setMonth(new Date().getMonth()-12)){
            books[date.getMonth()] += 1;
            pages[date.getMonth()] += pastBook.pages || 0;            
        }
    });
        
    reviewSection.innerHTML = reviews;
    setUpCharts(books, pages);
}

function showChart(chartName){
    var tabs = document.getElementsByClassName("tab");
    for (i = 0; i < tabs.length; i++) {
        tabs[i].style.display = "none";
    }

    document.getElementById(chartName).style.display = "block";
}

function setUpCharts(books, pages){
    var booksChart = document.getElementById('booksPerMonthChart').getContext('2d');
    var pagesChart = document.getElementById('pagesPerMonthChart').getContext('2d');

    const monthLabels =  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
    var bookChart = new Chart(booksChart, {
        type: 'bar',
        data: {
            labels: monthLabels,
            datasets: [{
                label: '# of books',
                data: books,
                backgroundColor: [
                    'rgba(12, 52, 90, 0.7)',
                    'rgba(244, 211, 94, 0.7)',
                    'rgba(238, 150, 75, 0.7)',
                    'rgba(249, 87, 56, 0.7)'
                ],
                borderColor: [
                    'rgba(12, 52, 90, 1)',
                    'rgba(244, 211, 94, 1)',
                    'rgba(238, 150, 75, 1)',
                    'rgba(249, 87, 56, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            plugins:{
            title: {
            display: true,
            text: 'Books Read Per Month'
            },
            legend: {
                display: false
            }
        },
        
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    var pageChart = new Chart(pagesChart, {
        type: 'bar',
        data: {
            labels: monthLabels,
            datasets: [{
                label: '# of pages',
                data: pages,
                backgroundColor: [
                    'rgba(12, 52, 90, 0.7)',
                    'rgba(244, 211, 94, 0.7)',
                    'rgba(238, 150, 75, 0.7)',
                    'rgba(249, 87, 56, 0.7)'
                ],
                borderColor: [
                    'rgba(12, 52, 90, 1)',
                    'rgba(244, 211, 94, 1)',
                    'rgba(238, 150, 75, 1)',
                    'rgba(249, 87, 56, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            plugins:{
            title: {
            display: true,
            text: 'Pages Read Per Month'
            },
            legend: {
                display: false
            }
        },
        
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
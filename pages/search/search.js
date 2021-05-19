function card(title, description, image) {
  const element = document.createElement("div");
  element.className = "card";
  element.innerHTML = `<img src="${image}" alt="" width=100 height=100 />
  <div class="card-details">
    <h3>${title}</h3>
    <p>
    ${description}
    </p>
  </div>
`;
  return element;
}

async function querySearchAPI() {
  const APIEndpoint = "https://grad-gooder-reads-database.herokuapp.com/api/";
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const searchQuery = urlParams.get("q");

  const queryResult = await (
    await fetch(`${APIEndpoint}books/search?query=${searchQuery}`)
  ).json();

  const parent = document.getElementById("search-result-content");
  queryResult.docs.forEach((element) => {
    parent.appendChild(card(element.title, "", ""));
  });
}

window.onload = querySearchAPI();

const fetch = require("node-fetch");

const API_URL = "http://openlibrary.org/search.json";

const toModel = (response) => {
  //TODO: IMPLEMENT ONCE DATABASE IS SETUP
};
const getResponse = async (url) => {
  const response = await fetch(url);
  const jsonResponse = await response.json();
  return jsonResponse;
};

const parseRequest = (req) => {
  const queryParams = req.query;
  console.log(queryParams);

  if (queryParams.query) {
    return search(queryParams.query);
  }
  if (queryParams.title) {
    return searchByTitle(queryParams.title);
  }
  if (queryParams.author) {
    return searchByAuthor(queryParams.author);
  }

  //We may want to use route parameters for these instead, rather than search params.
  //Just putting these here for now.
  if (queryParams.bookKey) {
    return getBookByKey(queryParams.bookKey);
  }
  if (queryParams.isbn) {
    return getBookByISBN(queryParams.isbn);
  }
  if (queryParams.cover) {
    return getCoverURLByID(queryParams.cover);
  }
};

const search = (query) => {
  const url = new URL(API_URL);
  url.searchParams.set("q", query);

  return getResponse(url);
};

const searchByTitle = (title) => {
  const url = new URL(API_URL);
  url.searchParams.set("title", title);

  return getResponse(url);
};

const searchByAuthor = (author) => {
  const url = new URL(API_URL);
  url.searchParams.set("author", author);

  return getResponse(url);
};

const getBookByKey = (key) => {
  const url = new URL(`https://openlibrary.org/works/${key}.json`);
  return getResponse(url);
};

const getBookByISBN = (isbn) => {
  const url = new URL(`https://openlibrary.org/isbn/${isbn}.json`);
  return getResponse(url);
};

const getCoverURLByID = (cover_id) => {
  return `https://covers.openlibrary.org/b/id/${cover_id}-S.jpg`;
};

module.exports = {
  search,
  searchByTitle,
  searchByAuthor,
  getBookByKey,
  getBookByISBN,
  getCoverURLByID,
  parseRequest,
  toModel,
};

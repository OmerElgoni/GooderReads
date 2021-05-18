const fetch = require("node-fetch");

const API_URL = "http://openlibrary.org/search.json";

const getResponse = async (url) => {
  const response = await fetch(url);
  const jsonResponse = await response.json();
  return jsonResponse;
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
};

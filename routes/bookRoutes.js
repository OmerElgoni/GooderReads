const { Console } = require("console");
const { Router } = require("express");
const { parseRequest } = require("../controllers/openLibrary.controller");
const book = require("../models/book");
const openLibraryService = require("../services/openLibrary.service");

var router = new Router();

module.exports = function (db) {
  //Get all books
  router.get("/", async (req, res) => {
    res.json(await db.book.findAll());
  });

  //Search for books
  router.get("/search", async (req, res) => {
    const response = await parseRequest(req, db);
    res.json(response);
  });

  //Get specific book
  router.get("/:id", async (req, res) => {
    // https://openlibrary.org/api/books?bibkeys=ISBN:9780980200447&jscmd=details
    const book = await db.book.findByPk(req.params.id)
    console.log(book);
    

    const response = await openLibraryService.getBookByISBNDetailed(book.isbn) ;
    const bookDetails = response[Object.keys(response)[0]];
    console.log("detailed response", bookDetails )
    if (bookDetails.details) {
      console.log("FOUND DETAILS");
      
      if (bookDetails.details.description) {
        console.log("FOUND DESCRIPTION");
        book.description = bookDetails.details.description;
      }
      if (bookDetails.details.number_of_pages) {
        console.log("FOUND number_of_pages", bookDetails.details.number_of_pages);
        book.pages = bookDetails.details.number_of_pages;
      }
    }
    await book.save()
    
    res.json(book);
  });

  //Get specific books authors
  router.get("/:id/author", async (req, res) => {
    const book = await db.book.findByPk(req.params.id);
    console.log(book);
    res.json(await book.getAuthors());
  });

  //Get specific books genres
  router.get("/:id/genres", async (req, res) => {
    const book = await db.book.findByPk(req.params.id);
    res.json(await book.getGenres());
  });

  return router;
};

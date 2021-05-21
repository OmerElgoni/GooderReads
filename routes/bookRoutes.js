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
    const book = await db.book.findByPk(req.params.id);
    console.log(book);

    const response = await openLibraryService.getBookByISBNDetailed(book.isbn);
    const bookDetails = response[Object.keys(response)[0]];
    if (bookDetails.details) {
      if (bookDetails.details.description) {
        book.description = bookDetails.details.description;
      }
      if (bookDetails.details.number_of_pages) {
        book.pages = bookDetails.details.number_of_pages;
      }
    }
    await book.save();

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

  router.get("/:id/readlist", async (req, res) => {
    res.json(
      await db.book.findAll({
        where: {
          book_id: req.params.id,
        },
        include: {
          model: db.user,
          as: "past_book_owner",
          required: true,
        },
      })
    );
  });

  router.post("/:id/review/:userId", async (req, res) => {
    try {
      const text = req.query.text;
      console.log("REQ", req.query);
      const book = await db.book.findByPk(req.params.id);
      if (req.query.positive === 'true') {
        book.positive_rating++;
      }
      if (req.query.negative === 'true') {
        book.negative_rating++;
      }
      await book.save();
      const user_book = await db.user_past_book.findOne({
        where: {
          book_id: req.params.id,
          user_id: req.params.userId,
        },
      });

      user_book.review = text;
      
      console.log(user_book);
      await user_book.save();
      res.status(200).send({
        message: "success",
      });
    } catch (error) {
      res.status(500).send({
        message:
          error.message || "Some error occurred while creating the User.",
      });
    }
  });

  return router;
};

const { Router } = require("express");
const { parseRequest } = require("../controllers/openLibrary.controller");

var router = new Router();

module.exports = function (db) {
  //Get all books
  router.get("/", async (req, res) => {
    res.json(await db.book.findAll());
  });

  //Get specific book
  router.get("/:id", async (req, res) => {
    res.json(await db.book.findByPk(req.params.id));
  });

  //Get specific books authors
  router.get("/:id/author", async (req, res) => {
    const book = await db.book.findByPk(req.params.id);
    res.json(book.getAuthors());
  });

  //Search for books
  router.get("/search", async (req, res) => {
    const response = await parseRequest(req, db);
    res.json(response);
  });

  return router;
};
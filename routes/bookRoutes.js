const { Router } = require("express");
const { parseRequest } = require("../services/openLibrary.service");

var router = new Router();

module.exports = function (db) {
  //Get all books
  router.get("/", async (req, res) => {
    res.json(await db.book.findAll());
  });

  //Search for books
  router.get("/search", async (req, res) => {
    const response = await parseRequest(req);
    res.json(response);
  });

  return router;
};

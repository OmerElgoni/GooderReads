const { Router } = require("express");

var router = new Router();

module.exports = function (db) {
  //Get all authors
  router.get("/", async (req, res) => {
    res.json(await db.author.findAll());
  });

  //Get specific authors books
  router.get("/:id/books", async (req, res) => {
    const author = await db.author.findByPk(req.params.id);
    res.json(await author.getBooks());
  });

  return router;
};

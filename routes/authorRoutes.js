const { Router } = require("express");

var router = new Router();

module.exports = function (db) {
  //Get all authors
  router.get("/", async (req, res) => {
    res.json(await db.author.findAll());
  });

  return router;
};

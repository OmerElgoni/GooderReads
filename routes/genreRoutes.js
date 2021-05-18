const { Router } = require("express");

var router = new Router();

module.exports = function (db) {
  //Get all genres
  router.get("/", async (req, res) => {
    res.json(await db.genre.findAll());
  });

  return router;
};

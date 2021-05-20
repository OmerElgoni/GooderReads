const { Router } = require("express");

var router = new Router();

module.exports = function (db) {

  router.get("/:genre", async (req, res) => {
    console.log(req.params);
    res.json(
      await db.genre.findAll({
        where: {
          genre: req.params.genre,
        },
        include: {
          model: db.book,
          required: true,
        },
      })
    )
  });
  return router;
};


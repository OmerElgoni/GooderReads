const { Router } = require("express");

var router = new Router();

module.exports = function (db) {
  //Get all users
  router.get("/", async (req, res) => {
    res.json(await db.user.findAll());
  });

  router.get("/:id", async (req, res) => {
    res.json(await db.user.findByPk(req.params.id));
  });

  router.get("/:id/wishlist", async (req, res) => {
    res.json(
      await db.user.findAll({
        where: {
          user_id: req.params.id,
        },
        include: {
          model: db.book,
          as: "wishlist_books",
          required: true,
        },
      })
    );
  });

  return router;
};

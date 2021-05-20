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

  router.post("/:id/wishlist/:bookId", async (req, res) => {
    try {
      const user = db.user.findByPk(req.params.id);
      const book = db.book.findByPk(req.params.bookId);
      user.addBook(book);
      res.json("Success");
    } catch (error) {
      res.json(error);
    }
    
    
  });

  router.get("/:id/readlist", async (req, res) => {
    res.json(
      await db.user.findAll({
        where: {
          user_id: req.params.id,
        },
        include: {
          model: db.book,
          as: "past_books",
          required: true,
        },
      })
    );
  });

  return router;
};

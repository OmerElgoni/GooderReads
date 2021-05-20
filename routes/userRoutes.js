const { Router } = require("express");

var router = new Router();

module.exports = function (db) {
  const users = require("../controllers/user.controller.js");

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

  router.get("/:id/wishlist/:bookId", async (req, res) => {
    try {
      const user = db.user.findByPk(req.params.id);
      const book = db.book.findByPk(req.params.bookId);
      console.log( Object.getOwnPropertyNames(await user));
      await user.addWantlist(book);
      await user.save();
      res.json("Success");
      console.log("succesfully added book to wishlist")
    } catch (error) {
      res.json("Error");
      console.log("ERROR", error)
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

  router.post("/", users.create);
  router.put("/:id", users.update);

  return router;
};

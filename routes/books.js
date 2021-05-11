const { Router } = require("express");

var router = new Router();

//Get all books
router.get("/", (req, res) => {
  res.send("UNIMPLEMENTED");
});

//Get books by id
router.get("/:id", (req, res) => {
  res.send("UNIMPLEMENTED");
});

//Search for books
router.get("/search", (req, res) => {
  res.send("UNIMPLEMENTED");
});

module.exports = router;

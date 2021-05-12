const { Router } = require("express");
const { parseRequest } = require("../services/openLibrary.service");

var router = new Router();

//Get all books
router.get("/", (req, res) => {
  res.send("UNIMPLEMENTED");
});

//Search for books
router.get("/search", async (req, res) => {
  const response = await parseRequest(req);
  res.json(response);
});

module.exports = router;

//Look at Node-ORM https://node-orm.readthedocs.io/en/latest/

const express = require("express");

const app = express();

//start app
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`App is listening on port ${port}.`));

app.get("/", async (req, res) => {
  try {
    res.status(200).send("Base route");
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/lorem", async (req, res) => {
  try {
    res
      .status(200)
      .send(
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis ducimus saepe eius soluta quos officiis, optio at magni dicta sunt libero quasi veniam, ipsum atque! Numquam, odit nisi? Iure, deserunt."
      );
  } catch (err) {
    res.status(500).send(err);
  }
});

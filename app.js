const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();

app.use(express.static("public"));
app.use(express.static("public/pages"));

//Used for logging
app.use(morgan("common"));
//Used for security
app.use(helmet());
//Implements cors
app.use(cors());

app.get("*", async (req, res) => {
  try {
    res.sendFile(path.join(__dirname + "/public/pages" + req.originalUrl));
  } catch (err) {
    res.status(500).send(err);
  }
});

//start app
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`App is listening on port ${port}.`));

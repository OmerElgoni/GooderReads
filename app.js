const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();

//Used for logging
app.use(morgan("common"));

//Used for security
app.use(helmet());
//Implements cors
app.use(cors());

//Routes
const books = require("./routes/books");
app.use("/api/books", books);

//start app
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`App is listening on port ${port}.`));

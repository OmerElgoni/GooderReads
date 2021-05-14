const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();
const db = require("./models/index.js");
//Should look at this for an ORM/ODM https://sequelize.org/master/manual/getting-started.html
//Can make raw sql queries using https://sequelize.org/master/manual/raw-queries.html
//as well as use model functions

//Used for logging
app.use(morgan("common"));
//Used for security
app.use(helmet());
//Implements cors
app.use(cors());

//Routes
const bookRoutes = require("./routes/bookRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
app.use("/api/books", bookRoutes(db));
app.use("/api/users", userRoutes(db));

app.get("/test/db/authenticate", async (req, res) => {
  try {
    //Test if db connection is working
    await db.sequelize.authenticate();
    res.send("Authentication successful");
  } catch (error) {
    res.json(error);
  }
});

//start app
const port = process.env.PORT || 4000;

//Create any tables that don't exist and start server
db.sequelize.sync().then(() => {
  app.listen(port, () => console.log(`App is listening on port ${port}.`));
});

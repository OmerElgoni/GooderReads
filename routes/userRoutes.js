const { Router } = require("express");

var router = new Router();

module.exports = function (db) {
  //Get all users
  router.get("/", async (req, res) => {
    res.json(await db.user.findAll());
  });

  router.get("/test/create", async (req, res) => {
    const user = db.user.build({
      first_name: "Matthew",
      last_name: "Pilkington",
      email_address: "matthewpil@bbd.co.za",
    });

    await user.save();
    res.send("User was saved to the database!");
  });

  return router;
};

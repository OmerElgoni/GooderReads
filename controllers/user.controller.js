const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

//tutorial: https://bezkoder.com/node-js-express-sequelize-mysql/

exports.create = (req, res) => {
    // Validate request
    if (!req.body.first_name) {
      res.status(400).send({
        message: "Content can not be empty!" + req.body
      });
      return;
    }

    const user = {
      email_address: req.body.email_address,
      first_name: req.body.first_name,
      last_name: req.body.last_name
    };
  
    // Save User in the database
    User.create(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      });
  };

  exports.update = (req, res) => {
    const id = req.params.id;
  
    User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
  };
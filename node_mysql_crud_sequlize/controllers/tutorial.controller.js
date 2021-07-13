const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and save
exports.create = (req, res) => {
  // validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Conteny can not be empty!" });
    return;
  }

  //  Create a Tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : 0,
  };

  //   Save Tutorial in the database
  Tutorial.create(tutorial)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the Tutorial",
      });
    });
};

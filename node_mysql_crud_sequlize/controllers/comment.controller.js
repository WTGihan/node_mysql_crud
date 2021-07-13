const db = require("../models");
const Comment = db.comments;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  // validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  //  Create a Tutorial
  const comment = {
    name: req.body.name,
    text: req.body.text,
    tutorialId: req.body.tutorialId,
  };

  //   Save Tutorial in the database
  await Comment.create(comment)
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

// retreive single object
exports.findOne = (req, res) => {
  const id = req.params.id;
  Comment.findByPk(id, { include: ["tutorial"] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Comment with id = " + id,
      });
    });
};

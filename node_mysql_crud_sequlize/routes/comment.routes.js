module.exports = (app) => {
  const comments = require("../controllers/comment.controller");

  var router = require("express").Router();

  //   Create a new comment
  router.post("/", comments.create);
  router.get("/:id", comments.findOne);

  app.use("/api/comments", router);
};

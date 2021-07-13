module.exports = (app) => {
  const tutorials = require("../controllers/tutorial.controller");

  var router = require("express").Router();

  //   Create a new Tutorial
  router.post("/", tutorials.create);

  //   Retrieve all Tutorials
  router.get("/", tutorials.findAll);

  //   Customize routes should be route first
  //   retrieve all published tutorials
  router.get("/published", tutorials.findAllPublished);

  //   Retrieve a single Tutorial with id
  router.get("/:id", tutorials.findOne);

  //   update the tutorial
  router.put("/:id", tutorials.update);

  //   delete tutorial
  router.delete("/:id", tutorials.delete);

  //   delete all tutorials
  router.delete("/", tutorials.deleteAll);

  app.use("/api/tutorials", router);
};

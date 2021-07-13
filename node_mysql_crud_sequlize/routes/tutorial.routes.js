module.exports = (app) => {
  const tutorials = require("../controllers/tutorial.controller");

  var router = require("express").Router();

  //   Create a new Tutorial
  router.post("/", tutorials.create);

  //   Retrieve all Tutorials
  router.get("/", tutorials.findAll);

  //   Retrieve a single Tutorial with id
  router.get("/:id", tutorials.findOne);

  //   update the tutorial
  router.put("/:id", tutorials.update);

  //   delete tutorial
  router.delete("/:id", tutorials.delete);

  //   delete all tutorials
  router.delete("/", tutorials.deleteAll);

  //   retrieve all published tutorials
  router.get("/published", tutorials.findAllPublished);

  app.use("/api/tutorials", router);
};

const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

const db = require("./models");
db.sequelize.sync();

// parse requests of content-type application/json
app.use(express.json());

// parse requests of content-type -application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to REST API of sequlize" });
});

require("./routes/tutorial.routes")(app);
require("./routes/comment.routes")(app);

// set port listent for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

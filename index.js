const express = require("express");
const bodyParser = require("body-parser");

// create express app
const app = express();

// setup the server port
const port = process.env.PORT || 5000;

// parse request data content type application
app.use(bodyParser.urlencoded({ extended: false }));

// parser request data contenty type application/json
app.use(bodyParser.json());

// define the route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// import employee routes
const employeeRoutes = require("./src/routes/employee.route");

// create employee routes
app.use("/api/v1/employees", employeeRoutes);

// listen to the port
app.listen(port, () => {
  console.log(`Express Server is running at port ${port}`);
});

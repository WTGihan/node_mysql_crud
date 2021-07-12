const EmployeeModel = require("../models/employee.model");

//  get all employee list
exports.getEmployeeList = (req, res) => {
  //   console.log("Here all employee list");
  EmployeeModel.getAllEmployess((err, employee) => {
    // console.log("We are here");
    if (err) return res.send(err);
    res.send(employee);
  });
};

// get employee by ID
exports.getEmployeeByID = (req, res) => {
  //   console.log("Get employee by ID");
  EmployeeModel.getEmployeeByID(req.params.id, (err, employee) => {
    if (err) return res.send(err);
    res.send(employee);
  });
};

// create new employee
exports.createNewEmployee = (req, res) => {
  console.log("Create New Employee");
};

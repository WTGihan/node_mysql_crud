var dbConnection = require("../../config/db.config");

var Employee = (employee) => {
  this.first_name = employee.first_name;
  this.last_name = employee.last_name;
  this.email = employee.email;
  this.status = employee.status ? employee.status : 1;
  this.created_at = new Date();
  this.updated_at = new Date();
};

// get all employess
Employee.getAllEmployess = (result) => {
  dbConnection.query("SELECT * FROM employess", (err, res) => {
    if (err) {
      console.log("Error while fetching employess", err);
      result(null, err);
    } else {
      console.log("Employess fetched successfully");
      result(null, res);
    }
  });
};

// get employee by ID from DB
Employee.getEmployeeByID = (id, result) => {
  dbConnection.query("SELECT * FROM employess WHERE id=?", id, (err, res) => {
    if (err) {
      console.log("Error while fetching employee by id ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Employee;

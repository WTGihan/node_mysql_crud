var dbConnection = require("../../config/db.config");

var Employee = function (employee) {
  this.first_name = employee.first_name;
  this.last_name = employee.last_name;
  this.email = employee.email;
  this.status = employee.status ? employee.status : 1;
  this.created_at = new Date();
  this.updated_at = new Date();
};

// res mean response

// get all employess
Employee.getAllEmployess = (result) => {
  dbConnection.query(
    "SELECT * FROM employess WHERE is_deleted=0",
    (err, res) => {
      if (err) {
        console.log("Error while fetching employess", err);
        result(null, err);
      } else {
        console.log("Employess fetched successfully");
        result(null, res);
      }
    }
  );
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

// get employee by email from DB
Employee.getEmployeeByEmail = (email, result) => {
  dbConnection.query(
    "SELECT * FROM employess WHERE email=? AND is_deleted=0",
    email,
    (err, res) => {
      if (err) {
        console.log("Error while fetching employee by id ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

// check employee by email and id aloready exist from DB
Employee.getEmployeeByEmailAndID = (email, id, result) => {
  dbConnection.query(
    "SELECT * FROM employess WHERE email=? AND id!=? AND is_deleted=0",
    [email, id],
    (err, res) => {
      if (err) {
        console.log("Error while fetching employee by id ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

// create new employee
Employee.createEmployee = (employeeReqData, result) => {
  dbConnection.query(
    "INSERT INTO employess SET ?",
    employeeReqData,
    (err, res) => {
      if (err) {
        console.log("Error while inserting data");
        result(null, err);
      } else {
        console.log("Employee created successfully");
        result(null, res);
      }
    }
  );
};

// update employee
Employee.updateEmployee = (id, employeeReqData, result) => {
  dbConnection.query(
    "UPDATE employess SET first_name=?, last_name=?, email=?, status=? WHERE id=?",
    [
      employeeReqData.first_name,
      employeeReqData.last_name,
      employeeReqData.email,
      employeeReqData.status,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("Error while updating the employee");
        result(null, err);
      } else {
        console.log("Employee updated successfully");
        result(null, res);
      }
    }
  );
};

// delete employee
Employee.deleteEmployee = (id, result) => {
  // Basic delete
  //   dbConnection.query("DELETE FROM employess WHERE id=?", [id], (err, res) => {
  //     if (err) {
  //       result(null, err);
  //     } else {
  //       result(null, res);
  //     }
  //   });

  //   Customized delete
  dbConnection.query(
    "UPDATE employess SET is_deleted=? WHERE id=?",
    [1, id],
    (err, res) => {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Employee;

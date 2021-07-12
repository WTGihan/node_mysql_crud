const EmployeeModel = require("../models/employee.model");
const validate = require("../validation/employee.validation");

//  get all employee list
exports.getEmployeeList = (req, res) => {
  EmployeeModel.getAllEmployess((err, employee) => {
    if (err) return res.status(404).send("Something went Wrong!!!");
    res.send(employee);
  });
};

// get employee by ID
exports.getEmployeeByID = (req, res) => {
  EmployeeModel.getEmployeeByID(req.params.id, (err, employee) => {
    if (err) return res.status(404).send("Something went Wrong!!!");
    res.send(employee);
  });
};

// create new employee
exports.createNewEmployee = (req, res) => {
  //   check null
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const email = req.body.email;

  //   check email already exist

  EmployeeModel.getEmployeeByEmail(email, (err, employee) => {
    if (err) return res.send(err);
    else {
      if (employee.length !== 0) {
        return res.status(404).send("Email already exists!!!");
      } else {
        // Else added data
        createEmployee();
      }
    }
  });

  function createEmployee() {
    const employeeReqData = new EmployeeModel(req.body);

    EmployeeModel.createEmployee(employeeReqData, (err, employee) => {
      if (err) return res.status(404).send("Something went Wrong!!!");
      else {
        return res.status(200).send("Successfully Added");
      }
    });
  }
};

// update employee
exports.updateEmployee = (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const email = req.body.email;

  //   check email already exist in another account
  EmployeeModel.getEmployeeByEmailAndID(
    email,
    req.params.id,
    (err, employee) => {
      if (err) return res.send(err);
      else {
        if (employee.length !== 0) {
          return res
            .status(404)
            .send("Email already exists another account!!!");
        } else {
          updateEmploye();
        }
      }
    }
  );

  function updateEmploye() {
    const employeeReqData = new EmployeeModel(req.body);

    EmployeeModel.updateEmployee(
      req.params.id,
      employeeReqData,
      (err, employee) => {
        if (err) {
          if (err) return res.status(404).send("Something went Wrong!!!");
        } else {
          return res.status(200).send("Successfully Updated");
        }
      }
    );
  }
};

// delete employee
exports.deleteEmployee = (req, res) => {
  EmployeeModel.deleteEmployee(req.params.id, (err, employee) => {
    if (err) {
      if (err) return res.status(404).send("Something went Wrong!!!");
    } else {
      return res.status(200).send("Successfully Deleted");
    }
  });
};

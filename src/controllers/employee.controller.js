const EmployeeModel = require("../models/employee.model");
const validate = require("../validation/employee");

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
// validation should be there
exports.createNewEmployee = (req, res) => {
  // validation

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
      }
      return;
    }
  });
  // console.log("result", result);

  const employeeReqData = new EmployeeModel(req.body);

  EmployeeModel.createEmployee(employeeReqData, (err, employee) => {
    if (err) {
      res.send(err);
      res.json({ status: false, message: "Something went wrong" });
    } else {
      res.json({ status: true, message: "Successfully Added" });
    }
  });
};

// update employee
exports.updateEmployee = (req, res) => {
  const employeeReqData = new EmployeeModel(req.body);
  // check null not working

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    console.log("Valid Data");
    EmployeeModel.updateEmployee(
      req.params.id,
      employeeReqData,
      (err, employee) => {
        if (err) {
          res.send(err);
          res.json({ status: false, message: "Something went wrong" });
        } else {
          res.json({ status: true, message: "Successfully Updated" });
        }
      }
    );
  }
};

// delete employee
exports.deleteEmployee = (req, res) => {
  EmployeeModel.deleteEmployee(req.params.id, (err, employee) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ status: true, message: "Successfully Deleted" });
    }
  });
};

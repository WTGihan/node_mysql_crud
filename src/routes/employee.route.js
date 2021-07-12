const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employee.controller");

// get all employees
router.get("/", employeeController.getEmployeeList);

// get employee id
router.get("/:id", employeeController.getEmployeeByID);

// create new employee
router.post("/", employeeController.createNewEmployee);

module.exports = router;

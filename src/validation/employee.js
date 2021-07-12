const Joi = require("joi");

function validateEmployee(employee) {
  console.log(employee);
  const schema = Joi.object({
    first_name: Joi.string().min(4).required(),
    last_name: Joi.string().min(4).required(),
    email: Joi.string().required(),
  });

  return schema.validate(employee);
}

module.exports = validateEmployee;

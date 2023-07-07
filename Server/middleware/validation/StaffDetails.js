const { check, validationResult } = require("express-validator");

exports.validateEmployeeEntry = [
  check("id_no")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Id number is required")
    .matches(/^[A-Za-z0-9]/)
    .withMessage(
      "Password must contains numbers, letters and special characters('[A-Za-z0-9]')"
    ),
  check("first_name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("first name is required"),
  check("last_name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("last name is required"),
  check("phone_no")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The phone number is required")
    .isInt()
    .withMessage("Only uses numbers for your phone number")
    .isLength({ min: 10, max: 10 })
    .withMessage("Your number should contain exactly 10 digits"),
  check("job_title")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Job title is required"),
  check("P_no").trim().not().isEmpty().withMessage("Job title is required"),
  check("basic_salary")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The basic salary is required")
    .isInt()
    .withMessage("Only uses numbers for your the basic salary"),
];

exports.employeeValidation = (req, res, next) => {
  const result = validationResult(req).array();
  console.log(result);
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({
    success: false,
    message: error,
  });
};

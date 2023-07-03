const { check, validationResult } = require("express-validator");

exports.validateServiceDetails = [
  check("client_name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Client name is required"),
  check("work_location")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The work location is required"),
  check("requested_by")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The person who requested the service is required"),
  check("scope").trim().not().isEmpty().withMessage("The scope is required"),
  check("scope_description")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The scope description is required"),
  check("invoice_code")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Invoice_code is required"),
  check("date")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The service date is required"),
  check("time")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The service time is required"),
  check("work_duration")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The work duration is required")
    .isInt()
    .withMessage("Only uses numbers for the work duration"),
  check("cost")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The scope description is required")
    .isInt()
    .withMessage("Only uses numbers for the cost"),
  check("employee_details")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The employee details are required"),
];

exports.serviceValidation = (req, res, next) => {
  const result = validationResult(req).array();
  console.log(result);
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({
    success: false,
    message: error,
  });
};

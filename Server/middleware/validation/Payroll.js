const { check, validationResult } = require("express-validator");

exports.validatePayrollDetails = [
  check("id_no").trim().not().isEmpty().withMessage("The id no. is required"),
  check("date_of_payment")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The date of payment is required"),
];

exports.payrollValidation = (req, res, next) => {
  const result = validationResult(req).array();
  console.log(result);
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({
    success: false,
    message: error,
  });
};

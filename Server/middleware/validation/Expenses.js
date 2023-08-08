const { check, validationResult } = require("express-validator");

exports.validateExpensesDetails = [
  check("code").trim().not().isEmpty().withMessage("Expense code is required"),
  check("service_item_name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The item or service name is required"),
  check("total_cost")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The total cost is empty")
    .isInt()
    .withMessage("Only uses numbers for the total cost"),
  check("recorded_by")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The person who recorded is required for identification"),
  check("date").trim().not().isEmpty().withMessage("The date is required"),
];

exports.expensesValidation = (req, res, next) => {
  const result = validationResult(req).array();
  console.log(result);
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({
    success: false,
    message: error,
  });
};

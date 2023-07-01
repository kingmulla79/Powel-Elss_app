const { check, validationResult } = require("express-validator");

exports.validateAllowancesDetails = [
  check("id_no")
    .trim()
    .not()
    .isEmpty()
    .withMessage("ID number is required")
    .isInt()
    .withMessage("Only uses numbers for the ID no."),
  check("month").trim().not().isEmpty().withMessage("The month is required"),
  check("year")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The year is empty")
    .isInt()
    .withMessage("Only uses numbers for the year"),
  check("arrears")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The arrears amount is required")
    .isInt()
    .withMessage("Only uses numbers for the arrears"),
  check("house")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The house details is required"),
  check("imprest_amount")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The imprest amount is required")
    .isInt()
    .withMessage("Only uses numbers for the imprest"),
  check("transport")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The transport amount is required")
    .isInt()
    .withMessage("Only uses numbers for the transport"),
];

exports.allowancesValidation = (req, res, next) => {
  const result = validationResult(req).array();
  console.log(result);
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({
    success: false,
    message: error,
  });
};

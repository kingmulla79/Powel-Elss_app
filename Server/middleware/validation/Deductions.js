const { check, validationResult } = require("express-validator");

exports.validateDeductionDetails = [
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
  check("nhif")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The NHIF amount is required")
    .isInt()
    .withMessage("Only uses numbers for the NHIF"),
  check("nssf")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The NSSF amount is required")
    .isInt()
    .withMessage("Only uses numbers for the NSSF"),
  check("advances")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The advance amount is required")
    .isInt()
    .withMessage("Only uses numbers for the advances"),
  check("taxes")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The tax amount is required")
    .isInt()
    .withMessage("Only uses numbers for the tax"),
];

exports.deductionValidation = (req, res, next) => {
  const result = validationResult(req).array();
  console.log(result);
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({
    success: false,
    message: error,
  });
};

const { check, validationResult } = require("express-validator");

exports.validateProductDetails = [
  check("name").trim().not().isEmpty().withMessage("product name is required"),
  check("desc")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Product description is required")
    .isLength({ min: 10 })
    .withMessage("The description should contain a minimum of 10 characters"),
  check("category")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The product category is empty"),
  check("price")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Product price is required")
    .isInt()
    .withMessage("Only uses numbers for the price"),
  check("purpose")
    .trim()
    .not()
    .isEmpty()
    .withMessage("The product purpose is empty"),
];

exports.productValidation = (req, res, next) => {
  const result = validationResult(req).array();
  console.log(result);
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({
    success: false,
    message: error,
  });
};

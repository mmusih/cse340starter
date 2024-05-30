const invModel = require("../models/inventory-model");
const utilities = require(".");
const { body, validationResult } = require("express-validator");
const validate = {};

/*  **********************************
 * Classification Data Validation Rules
 * ********************************* */
validate.classificationRules = () => {
  return [
    // firstname is required and must be string
    body("classification_name")
      .trim()
      .escape()
      .notEmpty()
      .matches(/^[a-zA-Z0-9]+$/)
      .withMessage("Please provide a Classification name."), // on error this message is sent.
  ];
};

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkClassificationData = async (req, res, next) => {
  const { classification_name } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    res.render("inventory/add-classification", {
      errors,
      title: "add-classification",
      nav,
      classification_name,
    });
    return;
  }
  next();
};

module.exports = validate;

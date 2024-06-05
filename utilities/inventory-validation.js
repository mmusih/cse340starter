const invModel = require("../models/inventory-model");
const utilities = require(".");
const { body, validationResult } = require("express-validator");
const validate = {};

/*  **********************************
 *  Inventory validation rules
 * ********************************* */
validate.addInventoryRules = () => {
  return [
    // firstname is required and must be string
    body("inv_make")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide make of vehicle."), // on error this message is sent.

    // lastname is required and must be string
    body("inv_model")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide Model of vehicle."), // on error this message is sent.

    // lastname is required and must be string
    body("inv_year")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 4 })
      .isNumeric()
      .withMessage("Please provide Year of vehicle."), // on error this message is sent.

    // lastname is required and must be string
    body("inv_description")
      .exists()
      .withMessage("Input text for description")
      .isString()
      .withMessage("Text must be a string") // Ensure it is a string
      .isLength({ min: 2 }) // Example minimum length
      .isLength({ max: 1000 })
      .withMessage("Text must not exceed 1000 characters"), // Example maximum length

    body("inv_image")
      .exists()
      .withMessage("Input url for image")
      .isLength({ min: 2 }) // Example minimum length
      .withMessage("Input url for image"), // Example maximum length

    body("inv_thumbnail")
      .exists()
      .withMessage("Input url for thumbnail")
      .isLength({ min: 2 }) // Example minimum length
      .withMessage("Input url for thumbnail"), // Example maximum length

    body("inv_price")
      .exists()
      .withMessage("Price is required") // Ensure the field exists
      .isNumeric()
      .withMessage("Price must be numeric"), // Ensure it is a number

    body("inv_miles")
      .exists()
      .withMessage("Miles required") // Ensure the field exists
      .isNumeric()
      .withMessage("Miles must be numeric"), // Ensure it is a number

    body("inv_color")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide color of vehicle."), // on error this message is sent.

    body("classification_id")
      .exists()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Classification is required"), // Ensure the field exists
  ];
};

/*  **********************************
 *  Inventory validation rules
 * ********************************* */
validate.newInventoryRules = () => {
  return [
    // firstname is required and must be string
    body("inv_make")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide make of vehicle."), // on error this message is sent.

    // lastname is required and must be string
    body("inv_model")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide Model of vehicle."), // on error this message is sent.

    // lastname is required and must be string
    body("inv_year")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 4 })
      .isNumeric()
      .withMessage("Please provide Year of vehicle."), // on error this message is sent.

    // lastname is required and must be string
    body("inv_description")
      .exists()
      .withMessage("Input text for description")
      .isString()
      .withMessage("Text must be a string") // Ensure it is a string
      .isLength({ min: 2 }) // Example minimum length
      .isLength({ max: 1000 })
      .withMessage("Text must not exceed 1000 characters"), // Example maximum length

    body("inv_image")
      .exists()
      .withMessage("Input url for image")
      .isLength({ min: 2 }) // Example minimum length
      .withMessage("Input url for image"), // Example maximum length

    body("inv_thumbnail")
      .exists()
      .withMessage("Input url for thumbnail")
      .isLength({ min: 2 }) // Example minimum length
      .withMessage("Input url for thumbnail"), // Example maximum length

    body("inv_price")
      .exists()
      .withMessage("Price is required") // Ensure the field exists
      .isNumeric()
      .withMessage("Price must be numeric"), // Ensure it is a number

    body("inv_miles")
      .exists()
      .withMessage("Miles required") // Ensure the field exists
      .isNumeric()
      .withMessage("Miles must be numeric"), // Ensure it is a number

    body("inv_color")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide color of vehicle."), // on error this message is sent.

    body("classification_id")
      .exists()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Classification is required"), // Ensure the field exists

    body("inv_id")
      .exists()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("inv_id is required"), // Ensure the field exists
  ];
};

/* ******************************
 * Check data and return errors or continue to add inventory
 * ***************************** */
validate.checkAddInventoryData = async (req, res, next) => {
  const {
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    const classificationList = await utilities.buildClassificationList();
    res.render("./inventory/add-inventory", {
      errors,
      title: "Add Inventory",
      nav,
      classificationList,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
    });
    return;
  }
  next();
};

/* ******************************
 * Check data and return errors or continue to edit inventory
 * ***************************** */
validate.checkUpdateData = async (req, res, next) => {
  const {
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id,
    inv_id,
  } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    const classificationList = await utilities.buildClassificationList();
    res.render("./inventory/edit-inventory", {
      errors,
      title: "Edit Inventory",
      nav,
      classificationList,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
      inv_id,
    });
    return;
  }
  next();
};

module.exports = validate;

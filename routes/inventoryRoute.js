// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities/");
const classValidate = require("../utilities/classification-validation");
const invValidate = require("../utilities/inventory-validation");

// Route to build inventory by classification view
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
);

// Route to build inventory by inventory id
router.get(
  "/detail/:inv_id",
  utilities.handleErrors(invController.buildByInventoryId)
);

// Route to build management view
router.get("/", invController.buildManagementLinks);

// Route to build add classification view
router.get("/add-classification", invController.buildAddClassification);

// Route to handle form submission for adding a new classification
router.post(
  "/add-classification",
  classValidate.classificationRules(),
  classValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
);

// Route to build add inventory view
router.get("/add-inventory", invController.buildAddInventory);

// Route to handle form submission for adding a new inventory item
router.post(
  "/add-inventory",
  invValidate.addInventoryRules(),
  invValidate.checkAddInventoryData,
  utilities.handleErrors(invController.addInventory)
);

module.exports = router;

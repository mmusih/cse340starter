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
router.get("/", utilities.handleErrors(invController.buildManagementLinks));

// Route to build add classification view
router.get(
  "/add-classification",
  utilities.handleErrors(invController.buildAddClassification)
);

// Route to handle form submission for adding a new classification
router.post(
  "/add-classification",
  classValidate.classificationRules(),
  classValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
);

// Route to build add inventory view
router.get(
  "/add-inventory",
  utilities.handleErrors(invController.buildAddInventory)
);

// Route to handle form submission for adding a new inventory item
router.post(
  "/add-inventory",
  invValidate.addInventoryRules(),
  invValidate.checkAddInventoryData,
  utilities.handleErrors(invController.addInventory)
);

router.get(
  "/getInventory/:classification_id",
  utilities.handleErrors(invController.getInventoryJSON)
);

router.get(
  "/edit/:inv_id",
  utilities.handleErrors(invController.editInventoryView) // router edit inventory
);

router.post(
  "/edit/",
  invValidate.newInventoryRules(),
  invValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
);

router.get(
  "/delete/:inv_id",
  utilities.handleErrors(invController.deleteInventoryView) // router edit inventory
);

router.post(
  "/delete/",
  utilities.handleErrors(invController.deleteInventoryItem)
);

module.exports = router;

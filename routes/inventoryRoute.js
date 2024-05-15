// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities/");

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

// // Route to build error week 3 task 3
// router.get("/type/10", invController.buildByClassificationId2);

module.exports = router;

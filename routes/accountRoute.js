// Needed Resources
const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities/");
const regValidate = require("../utilities/account-validation");

// Route to build management view
router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildManagement)
);

// Route to build login view
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Route to build register view
router.get(
  "/register",
  utilities.handleErrors(accountController.buildRegister)
);

// Process the registration data
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);

// Process the login attempt
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkloginData,
  utilities.handleErrors(accountController.accountLogin)
);

// Route to build the account update view
router.get(
  "/update/:account_id", 
  utilities.handleErrors(accountController.getUpdateAccountView));

// Route to process the account update
router.post(
  "/update/:account_id", 
  regValidate.AccountUpdateRules(), 
  regValidate.checkAccountUpdate, 
  utilities.handleErrors(accountController.updateAccount));

// Route to process the password change
router.post(
  "/update-password/:account_id",
  regValidate.PasswordChangeRules(),
  regValidate.checkPasswordUpdate,
  utilities.handleErrors(accountController.updatePassword));

// Route to process logout
router.get('/logout', utilities.handleErrors(accountController.logout));

module.exports = router;

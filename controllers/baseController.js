const utilities = require("../utilities/");
const baseController = {};

baseController.buildHome = async function (req, res) {
  const nav = await utilities.getNav();
  // const headerHTML = utilities.generateHeader(res);
  res.render("index", { title: "Home", loggedin: res.locals.loggedin,
    accountData: res.locals.accountData, nav });
};

module.exports = baseController;

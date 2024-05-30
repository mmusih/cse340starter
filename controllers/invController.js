const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  const className = data[0].classification_name;
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  });
};

/* ***************************
 *  Build inventory by Inventory_id
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  const inv_id = req.params.inv_id;
  const data = await invModel.getInventoryByInventoryId(inv_id);
  const item = await utilities.buildIventoryItem(data);
  const className =
    data[0].inv_make +
    " " +
    data[0].inv_model +
    " " +
    "$" +
    new Intl.NumberFormat("en-US").format(data[0].inv_price);
  let nav = await utilities.getNav();
  res.render("./inventory/vehicle", {
    title: className,
    nav,
    item,
  });
};

invCont.buildManagementLinks = async function (req, res) {
  const nav = await utilities.getNav();
  className = "Inventory Management";
  res.render("./inventory/management", {
    title: className,
    nav,
    errors: null,
  });
};

invCont.buildAddClassification = async function (req, res) {
  const nav = await utilities.getNav();
  className = "Add-Classification";
  res.render("./inventory/add-classification", {
    title: className,
    nav,
    errors: null,
  });
};

/* ****************************************
 *  Process Add classification
 * *************************************** */
invCont.addClassification = async function (req, res) {
  let nav = await utilities.getNav();
  const { classification_name } = req.body;

  const addResult = await invModel.addClassification(classification_name);

  if (addResult) {
    req.flash(
      "notice",
      `Congratulations, Classification: ${classification_name} has been added.`
    );
    res.redirect("/inv");
  } else {
    req.flash("notice", "Sorry, add classification failed.");
    res.status(501).render("./inventory/add-classification", {
      title: "Add-Classification",
      nav,
    });
  }
};

invCont.buildAddInventory = async function (req, res) {
  const nav = await utilities.getNav();
  const classificationList = await utilities.buildClassificationList();
  className = "Add-Inventory";
  res.render("./inventory/add-inventory", {
    title: className,
    nav,
    classificationList,
    errors: null,
  });
};

module.exports = invCont;

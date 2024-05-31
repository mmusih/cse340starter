const invModel = require("../models/inventory-model");
const Util = {};

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications();
  // console.log(data.rows[0].classification_name);
  let list = "<ul>";
  list += '<li><a href="/" title="Home page">Home</a></li>';
  data.rows.forEach((row) => {
    list += "<li>";
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>";
    list += "</li>";
  });
  list += "</ul>";
  return list;
};

/* **************************************
 * Build the classification view HTML
 * ************************************ */
Util.buildClassificationGrid = async function (data) {
  let grid;
  if (data.length > 0) {
    grid = '<ul id="inv-display">';
    data.forEach((vehicle) => {
      grid += "<li>";
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        'details"><img src="' +
        vehicle.inv_thumbnail +
        '" alt="Image of ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' on CSE Motors" /></a>';
      grid += '<div class="namePrice">';
      grid += "<hr />";
      grid += "<h2>";
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' details">' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        "</a>";
      grid += "</h2>";
      grid +=
        "<span>$" +
        new Intl.NumberFormat("en-US").format(vehicle.inv_price) +
        "</span>";
      grid += "</div>";
      grid += "</li>";
    });
    grid += "</ul>";
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return grid;
};

/* **************************************
 * Build the Inventory Item view HTML
 * ************************************ */
Util.buildIventoryItem = async function (data) {
  let item;
  const vehicle = data[0];
  if (data.length > 0) {
    item = '<div id ="car" class = "car">';
    item += '<div id ="car-image" class = "car-image">';
    item +=
      '<img src="' +
      vehicle.inv_image +
      '" alt="Image of ' +
      vehicle.inv_make +
      " " +
      vehicle.inv_model +
      ' on CSE Motors" />';
    item += "</div>";
    item += '<div id ="info-display" class = "info-display">';
    item += '<p class="car-details">';
    item +=
      "Mileage: " + new Intl.NumberFormat("en-US").format(vehicle.inv_miles);
    item += "<br>";
    item += "Make: " + vehicle.inv_make;
    item += "<br>";
    item += "Model: " + vehicle.inv_model;
    item += "<br>";
    item += "Year: " + vehicle.inv_year;
    item += "<br>";
    item += "Description: " + vehicle.inv_description;
    item += "</p>";
    item += "</div>";
    item += "</div>";
  } else {
    item += '<p class="notice">Sorry, no matching vehicle could be found.</p>';
  }
  return item;
};

// Util.buildLinks = async function () {
//   let links;
//   links = '<div id ="links" class = "links">';
//   links += '<a href="/inv/add-classification">';
//   links += "Add New Classification";
//   links += "</a>";
//   links += "<br>";
//   links += '<a href="/inv/add-inventory">';
//   links += "Add New Inventory";
//   links += "</a>";
//   links += "<div/>";
//   return links;
// };

Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications();
  let classificationList =
    '<select name="classification_id" id="classificationList" required >';
  classificationList += "<option value=''>Choose a Classification</option>";
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"';
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += " selected ";
    }
    classificationList += ">" + row.classification_name + "</option>";
  });
  classificationList += "</select>";
  return classificationList;
};

Util.buildLogin = async function () {};
/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for
 * General Error Handling
 **************************************** */
Util.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = Util;

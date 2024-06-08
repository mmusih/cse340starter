const invModel = require("../models/inventory-model");
const Util = {};
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
 * Middleware to check token validity
 **************************************** */
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
    jwt.verify(
      req.cookies.jwt,
      process.env.ACCESS_TOKEN_SECRET,
      (err, accountData) => {
        if (err) {
          req.flash("notice", "Please log in");
          res.clearCookie("jwt");
          return res.redirect("/account/login");
        }
        console.log('Account Data:', accountData);  // Debugging line
        res.locals.accountData = accountData;
        res.locals.loggedin = true;
        next();
      }
    );
  } else {
    res.locals.loggedin = false;
    next();
  }
};

/* ****************************************
 *  Check Login
 * ************************************ */
Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    const { accountData } = res.locals;
    if (accountData && (accountData.accountType === "Employee" || accountData.accountType === "Admin"));
    next();
  } else {
    req.flash("notice", "Unauthorized access.");
    return res.redirect("/account/login");
  }
};

// Define a middleware function to check if the user is an Employee or Admin
Util.authorizeEmployeeOrAdmin = (req, res, next) => {
  // Check if the user is logged in and has a valid JWT token
  if (!req.locals || !req.locals.account_id) {
    req.flash("error", "Unauthorized access.");
    return res.redirect("/account/login");
  }

  const accountType = req.locals.account_type; 

  // Check if the user is an Employee or Admin
  if (accountType !== "Employee" && accountType !== "Admin") {
    req.flash("error", "You do not have permission to access this page.");
    return res.redirect("/");
  }

  // User is authorized, proceed to the next middleware or route handler
  next();
};

Util.checkEmployeeOrAdmin = (req, res, next) => {
  const { accountData } = res.locals;
  if (accountData && (accountData.accountType === "Employee" || accountData.accountType === "Admin")) {
    next();
  } else {
    req.flash("notice", "Unauthorized access.");
    return res.redirect("/account/login");
  }
};

Util.generateHeader = (req, res) => {
  const { accountData } = res.locals;
  let headerHTML = '<header id="top-header">';
  headerHTML += '<div class="siteName">';
  headerHTML += '<a href="/" title="Return to home page">CSE Motors</a>';
  headerHTML += '</div>';
  headerHTML += '<div id="tools">';
  if (accountData.loggedin) {
    // User is logged in, show Logout link and Welcome Basic link
    headerHTML += '<a title="Logout" href="/account/logout">Logout</a>';
    if (accountData.accountData.accountType === "Employee" || accountData.accountData.accountType === "Admin") {
      headerHTML += '<a title="Account Management" href="/account/management">Welcome Basic</a>';
    }
  } else {
    // User is not logged in, show My Account link
    headerHTML += '<a title="My Account" href="/account/login">My Account</a>';
  }
  headerHTML += '</div>';
  headerHTML += '</header>';
  return headerHTML;
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for
 * General Error Handling
 **************************************** */
Util.handleErrors = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next)
    .finally(() => {
      // Ensure the loggedin and accountData locals are set
      res.locals.loggedin = res.locals.loggedin || false;
      res.locals.accountData = res.locals.accountData || null;
    });
};

module.exports = Util;

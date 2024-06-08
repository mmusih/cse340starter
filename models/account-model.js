const pool = require("../database/");

/* *****************************
 *   Register new account
 * *************************** */
async function registerAccount(
  account_firstname,
  account_lastname,
  account_email,
  account_password
) {
  try {
    const sql =
      "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *";
    return await pool.query(sql, [
      account_firstname,
      account_lastname,
      account_email,
      account_password,
    ]);
  } catch (error) {
    return error.message;
  }
}

/* **********************
 *   Check for existing email
 * ********************* */
async function checkExistingEmail(account_email) {
  try {
    const sql = "SELECT * FROM account WHERE account_email = $1";
    const email = await pool.query(sql, [account_email]);
    return email.rowCount;
  } catch (error) {
    return error.message;
  }
}

/* *****************************
 * Return account data using email address
 * ***************************** */
async function getAccountByEmail(account_email) {
  try {
    const result = await pool.query(
      "SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password FROM account WHERE account_email = $1",
      [account_email]
    );
    return result.rows[0];
  } catch (error) {
    return new Error("No matching email found");
  }
}

/* *****************************
 * Update account data details
 * ***************************** */

async function updateAccountInfo (account_id, account_firstname, account_lastname, account_email) {
  try {
    const sql = `UPDATE account
                 SET account_id = $1, account_firstname = $2, account_lastname = $3, account_email = $4
                 WHERE account_id = $1
                 RETURNING *`;
    const result = await pool.query(sql, [account_id, account_firstname, account_lastname, account_email]);
    return result.rows[0];
  } catch (error) {
    console.error("Update account info error: ", error);
    throw error;
  }
};

const updatePassword = async (account_id, hashedPassword) => {
  try {
    const sql = `UPDATE account
                 SET account_password = $2
                 WHERE account_id = $1`;
    await pool.query(sql, [account_id, hashedPassword]);
    return true;
  } catch (error) {
    console.error("Update password error: ", error);
    throw error;
  }
};

module.exports = { registerAccount, checkExistingEmail, getAccountByEmail, updateAccountInfo, updatePassword };

const dbConfig = require("./db.config.js");
const Sequelize = require("sequelize");
const sequelize = require( './__sequelize.js' )  // .(01221.02.2 RAM Require( path ) is NodeJS's original method of importing modules)


testConnection();
// ---------------------------------------------------------------
async function testConnection() {
  // do some work...
  // ---------------------------------------------------------------

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  // ---------------------------------------------------------------
} // end testConnection

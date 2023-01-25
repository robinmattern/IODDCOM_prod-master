const { Sequelize } = require("sequelize");
const sequelize = require( './__sequelize.js' )  // .(01221.02.2 RAM Require( path ) is NodeJS's original method of importing modules)
  // ---------------------------------------------------------------

  let Note = sequelize.define("notes", {
    description: Sequelize.STRING,
  });

  // ---------------------------------------------------------------

  async function updateRow() {
    let id = await Note.update(
      { description: "Finished reading history book" },
      { where: { id: 1 } }
    );
    sequelize.close();
  }

  updateRow();

  // ---------------------------------------------------------------

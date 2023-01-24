const { Sequelize } = require("sequelize");
const sequelize = require( './__sequelize.js' )  // .(01221.02.2 RAM Require( path ) is NodeJS's original method of importing modules)
  // ---------------------------------------------------------------

  let Note = sequelize.define("notes", {
    description: Sequelize.STRING,
  });

  // ---------------------------------------------------------------

  async function deleteRow() {

    let n = await Note.destroy({ where: { id: 2 } });
    console.log(`number of deleted rows: ${n}`);

    sequelize.close();
}

deleteRow();

  // ---------------------------------------------------------------

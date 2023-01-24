const { Sequelize } = require("sequelize");
const sequelize = require( './__sequelize.js' )  // .(01221.02.2 RAM Require( path ) is NodeJS's original method of importing modules)
  // ---------------------------------------------------------------

  let Note = sequelize.define("notes", {
    description: Sequelize.STRING,
  });

  // ---------------------------------------------------------------

  async function getRows() {

    let notes = await Note.findAll({ offset: 2, limit: 3, 
        attributes: ['id', 'description'], raw: true
    });
    
    console.log(notes);

    sequelize.close();
}

getRows();

  // ---------------------------------------------------------------

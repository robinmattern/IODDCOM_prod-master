const { Sequelize } = require("sequelize");
const sequelize = require( './__sequelize.js' )  // .(01221.02.2 RAM Require( path ) is NodeJS's original method of importing modules)
  // ---------------------------------------------------------------

  let Note = sequelize.define("notes", {
    description: Sequelize.STRING,
  });

  // ---------------------------------------------------------------

  const { Op } = require('sequelize') 
  
  async function getRows() {
    
    let notes = await Note.findAll({ where: { id: { [Op.in]: [3, 6] } } });

    notes.forEach(note => {
        console.log(`${note.id}: ${note.description}`);
    });

    sequelize.close();
}

getRows();

  // ---------------------------------------------------------------

const { Sequelize } = require("sequelize");
const sequelize = require( './__sequelize.js' )  // .(01221.02.2 RAM Require( path ) is NodeJS's original method of importing modules)
  // ---------------------------------------------------------------

  let Note = sequelize.define("notes", {
    description: Sequelize.STRING,
  });

  // ---------------------------------------------------------------
  
  Note.findOne({ where: { id: 1 } })
    .then((note) => {
      console.log(note.get({ plain: true }));
    })
    .finally(() => {
      sequelize.close();
    });

  // ---------------------------------------------------------------

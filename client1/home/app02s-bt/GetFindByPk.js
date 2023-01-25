const { Sequelize } = require("sequelize");
const sequelize = require( './__sequelize.js' )  // .(01221.02.2 RAM Require( path ) is NodeJS's original method of importing modules)
  // ---------------------------------------------------------------

  let Note = sequelize.define("notes", {
    description: Sequelize.STRING,
  });

  // ---------------------------------------------------------------
  
  Note.findByPk(2).then((note) => {
      console.log(note.get({ plain: true }));
      console.log('********************')
      console.log(`id: ${note.id}, description: ${note.description}`);
  }).finally(() => {
      sequelize.close();
  });
  
  // ---------------------------------------------------------------

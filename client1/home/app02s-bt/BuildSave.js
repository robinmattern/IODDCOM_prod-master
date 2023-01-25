const { Sequelize } = require("sequelize");
const sequelize = require( './__sequelize.js' )  // .(01221.02.2 RAM Require( path ) is NodeJS's original method of importing modules)
  // ---------------------------------------------------------------

  let Note = sequelize.define("notes", {
    description: Sequelize.STRING,
  });

  const note = Note.build({ description: "Took a cold bath" });
  note
    .save()
    .then(() => {
      console.log("new task saved");
    })
    .finally(() => {
      sequelize.close();
    });
    
  // ---------------------------------------------------------------

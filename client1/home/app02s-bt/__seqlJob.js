    const Sequelize = require("sequelize");
    const sequelize = require( './__sequelize.js' )  // .(01221.02.2 RAM Require( path ) is NodeJS's original method of importing modules)

SeqlJob();

// ---------------------------------------------------------------

async function SeqlJob() {
  // ---------------------------------------------------------------

  let Note = sequelize.define("notes", {  
    description: Sequelize.STRING,
  });

  // ---------------------------------------------------------------

  async function getOneNote() {
    let user = await Note.findOne();

    console.log(user.get("description"));
    sequelize.close();
  }

  getOneNote();

  // ---------------------------------------------------------------
}
// ---------------------------------------------------------------

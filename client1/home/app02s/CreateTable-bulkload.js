const dbConfig = require("./db.config.js");
const Sequelize = require("sequelize");
const sequelize = require( './__sequelize.js' )  // .(01221.02.2 RAM Require( path ) is NodeJS's original method of importing modules)

testConnection();

// ---------------------------------------------------------------

async function testConnection() {

  // ---------------------------------------------------------------

  let Note = sequelize.define("notes", {
    description: Sequelize.STRING,
  });

  let notes = [
    { description: "Tai chi in the morning" },
    { description: "Visited friend" },
    { description: "Went to cinema" },
    { description: "Listened to music" },
    { description: "Watched TV all day" },
    { description: "Walked for a hour" },
  ];

  sequelize.sync({ force: true }).then(() => {
    Note.bulkCreate(notes, { validate: true })
      .then(() => {
        console.log("notes created");
      })
      .catch((err) => {
        console.log("failed to create notes");
        console.log(err);
      })
      .finally(() => {
        sequelize.close();
      });
  });
  // ---------------------------------------------------------------
}
// ---------------------------------------------------------------

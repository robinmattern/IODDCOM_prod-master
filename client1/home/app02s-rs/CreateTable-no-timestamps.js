const { Sequelize } = require("sequelize");
const sequelize = require( './__sequelize.js' )  // .(01221.02.2 RAM Require( path ) is NodeJS's original method of importing modules)
  // ---------------------------------------------------------------

  let Dummy = sequelize.define(
    "dummy",
    {
      description: Sequelize.STRING,
    },
    {
      timestamps: false,
    }
  );

  Dummy.sync()
    .then(() => {
      console.log("New table created");
    })
    .finally(() => {
      sequelize.close();
    });

  // ---------------------------------------------------------------

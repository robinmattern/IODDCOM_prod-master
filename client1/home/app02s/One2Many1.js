const { Sequelize } = require("sequelize");
const sequelize = require( './__sequelize.js' )  // .(01221.02.2 RAM Require( path ) is NodeJS's original method of importing modules)
// ---------------------------------------------------------------
let User = sequelize.define('user', {
  name: Sequelize.STRING,
});

let Task = sequelize.define('task', {
  description: Sequelize.STRING,
});

User.hasMany(Task);

async function createTables() {

  await User.sync();
  await Task.sync();

  console.log('done');
  sequelize.close();
}

createTables();

// ---------------------------------------------------------------


// ---------------------------------------------------------------

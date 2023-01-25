const { Sequelize } = require("sequelize");
const sequelize = require( './__sequelize.js' )  // .(01221.02.2 RAM Require( path ) is NodeJS's original method of importing modules)
// ---------------------------------------------------------------
let User = sequelize.define('user', {
  name: Sequelize.STRING,
});

let Task = sequelize.define('task', {
  description: Sequelize.STRING,
});

// ---------------------------------------------------------------

User.hasMany(Task);

Task.belongsTo(User);

async function showTaskUser() {

    let task = await Task.findOne({ include: [User] });

    console.log(`${task.description} belongs to ${task.user.name}`);

    sequelize.close();
}

showTaskUser();

// ---------------------------------------------------------------

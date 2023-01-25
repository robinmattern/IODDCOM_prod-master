const { Sequelize } = require("sequelize");
const sequelize = require( './__sequelize.js' )  // .(01221.02.2 RAM Require( path ) is NodeJS's original method of importing modules)

// ---------------------------------------------------------------
let Employee = sequelize.define("employees", {
  name: Sequelize.STRING,
});

let Project = sequelize.define("projects", {
  name: Sequelize.STRING,
});

Employee.belongsTo(Project);
// ---------------------------------------------------------------


Employee.findAll({include: [Project]}).then(employees => {

  employees.forEach(employee => {
      console.log(`${employee.name} is in project ${employee.project.name}`);
  });
}).finally(() => {
  sequelize.close();
});

// ---------------------------------------------------------------

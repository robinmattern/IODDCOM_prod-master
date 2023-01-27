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

Project.hasOne(Employee);

Project.findAll({include: [Employee]}).then(projects => {

    projects.forEach(project => {
        console.log(`${project.name} belongs to user ${project.employee.name}`);
    });
}).finally(() => {
    sequelize.close();
});

// ---------------------------------------------------------------

const Sequelize = require("sequelize");
const sequelize = require("./sequelizeConnect.js");

//authenticate_Connection(); // Note: in db.config.js set DB=''
// ---------------------------------------------------------------
async function authenticate_Connection() {
    try {
      await sequelize.authenticate();
      console.log("--Connection has been authenticated");
    } catch (error) {
      console.error("--Unable to connect to the database:", error);
    }
  }
// ---------------------------------------------------------------

//simpleSelect(); // members_projects_view does not exst
//selectQuery();  // { model: Member, plain: true } is not defined
  selectAll();


// ---------------------------------------------------------------
async function simpleSelect () {
    try {
        const values = await sequelize.query(
            'SELECT DISTINCT Id, FirstName, LastName, ProjectName FROM iodd.members_projects_view WHERE Id <= 5 ORDER BY LastName'
            , { type: Sequelize.QueryTypes.SELECT });
        console.log(values);
        console.log("--Select successful");
    } catch (error) {
        console.error("--Select unsuccessful", error);
      }        
    }
// ---------------------------------------------------------------

async function selectQuery() {
    try {
 //   const values = await sequelize.query("SELECT * FROM members WHERE Id <= 90");
    const values = await sequelize.query('SELECT Id, LastName FROM members WHERE Id <= 10', { model: Member, plain: true });
    console.log(values);
    console.log("--Select successful");
  } catch (error) {
    console.error("--Select unsuccessful", error);
  }
}//---------------------------------------------------------------

async function selectAll() {
  let Member = sequelize.define("members", {
    description: Sequelize.STRING,
  });
  try {
    let members = await Member.findAll({
      //where: {LastName: ['Troutman', 'Schinner']},  
      where: {Id: [10]},  
      attributes: ['Id', 'FirstName', 'LastName', 'Company', 'Address1', 'City', 'State', 'Zip'],
      order: ['LastName'], 
      raw: true,
    });
//  console.log(members);
    console.log( require('util').inspect( members, { depth: 9 } ))
    sequelize.close();
  } catch (error) {
    console.error("--Unable to find in table members", error);
  }
}
//---------------------------------------------------------------

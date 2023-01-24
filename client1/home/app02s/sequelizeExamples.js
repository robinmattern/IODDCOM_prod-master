const Sequelize = require("sequelize");
const sequelize = require("./sequelizeConnect.js");
// Run from terminal > node sequelizeExamples.js

//`authenticate_Connection`(); // Note: in db.config.js set DB=""
//CreateDatabase_query_query();
//CreateTable_sync_timestamps();
//dropTable();
//CreateTable_sync_no_timestamps();
//CreateTable_sync_bulkload();
//count_note();
//findOne_note();
//findByPk_note();
//findAll_note_raw_true();
//findAll_note_raw_false();
//findAll_note_2_columns();
//findAll_note_offset_limit();
//findAll_note_Op_between();
//findAll_note_Op_in();
//findAll_note_Op_Where_gt();
//findAll_note_order();
//buildsave_note();
//create_note();
//update_note();
//destroy_note();
//Create_Stored_Procedure_note();
//Execute_Stored_Procedure_note(1);
//Execute_Stored_Procedure_note_querytype(1);
//Create_employees2projects;
//employee_belongsTo_project();
//project_hasOne_employee();
//Create_users2tasks();
//Add_Data_users2tasks();
//user_hasMany_task();
task_belongsTo_user();

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
async function CreateDatabase_query() {
  try {
    const values = await sequelize.query("CREATE DATABASE practice");
    console.log("--Database practice has been created");
  } catch (error) {
    console.error("--Unable to create the practice database:", error);
  }
}
// ---------------------------------------------------------------
async function CreateTable_sync_timestamps() {
  let Dummy = sequelize.define("dummy", {
    description: Sequelize.STRING,
  });

  Dummy.sync()
    .then(() => {
      console.log("--Table dummies with timestamps has been created");
    })
    .catch((err) => {
      console.log("--Unable to create the dummies table");
      console.log(err);
    })
    .finally(() => {
      sequelize.close();
    });
}
// ---------------------------------------------------------------
async function dropTable() {
  let Dummy = sequelize.define("dummy", {
    description: Sequelize.STRING,
  });
  Dummy.drop()
    .then(() => {
      console.log("--Dummies table dropped");
    })
    .catch((err) => {
      console.log("--Unable to drop the dummies table");
      console.log(err);
    })
    .finally(() => {
      sequelize.close();
    });
}
// ---------------------------------------------------------------
async function CreateTable_sync_no_timestamps() {
  let Dummy = sequelize.define(
    "dummy",
    { description: Sequelize.STRING },
    { timestamps: false }
  );

  Dummy.sync()
    .then(() => {
      console.log("Table dummies with no timestamps has been created");
    })
    .catch((err) => {
      console.log("--Unable to create the dummies table");
      console.log(err);
    })
    .finally(() => {
      sequelize.close();
    });
  // ---------------------------------------------------------------
  async function CreateTable_sync_bulkload() {
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
          console.log("--Table notes was created with bulkCreate");
        })
        .catch((err) => {
          console.log("--Unable to create the notes table");
          console.log(err);
        })
        .finally(() => {
          sequelize.close();
        });
    });
  }
}
// ---------------------------------------------------------------
async function count_note() {
  let Note = sequelize.define("notes", {
    description: Sequelize.STRING,
  });

  try {
    let n = await Note.count();
    console.log(`--There are ${n} rows in table notes`);
    sequelize.close();
  } catch (error) {
    console.error("--Unable to count rows in table notes", error);
  }
}
// ---------------------------------------------------------------
async function findOne_note() {
  let Note = sequelize.define("notes", {
    description: Sequelize.STRING,
  });

  Note.findOne({ where: { id: 1 } })
    .then((note) => {
      console.log(note.get({ plain: true }));
    })
    .catch((err) => {
      console.log("--Unable to findone note with id=1");
      console.log(err);
    })
    .finally(() => {
      sequelize.close();
    });
}
// ---------------------------------------------------------------
async function findByPk_note() {
  let Note = sequelize.define("notes", {
    description: Sequelize.STRING,
  });

  Note.findByPk(2)
    .then((note) => {
      console.log(note.get({ plain: true }));
    })
    .catch((err) => {
      console.log("--Unable to findone note with Pk=2");
      console.log(err);
    })
    .finally(() => {
      sequelize.close();
    });
}
// ---------------------------------------------------------------
async function findAll_note_raw_true() {
  let Note = sequelize.define("notes", {
    description: Sequelize.STRING,
  });

  try {
    let notes = await Note.findAll({ raw: true });
    console.log(notes);
    sequelize.close();
  } catch (error) {
    console.error("--Unable to findAll in table notes", error);
  }
}
//---------------------------------------------------------------
async function findAll_note_raw_false() {
  let Note = sequelize.define("notes", {
    description: Sequelize.STRING,
  });

  try {
    let notes = await Note.findAll({ raw: false });
    console.log(notes);
    sequelize.close();
  } catch (error) {
    console.error("--Unable to findAll in table notes", error);
  }
}
//---------------------------------------------------------------
async function findAll_note_2_columns() {
  let Note = sequelize.define("notes", {
    description: Sequelize.STRING,
  });

  try {
    let notes = await Note.findAll({
      attributes: ["id", "description"],
      raw: true,
    });
    console.log(notes);
    sequelize.close();
  } catch (error) {
    console.error("--Unable to findAll in table notes", error);
  }
}
//---------------------------------------------------------------
async function findAll_note_offset_limit() {
  let Note = sequelize.define("notes", {
    description: Sequelize.STRING,
  });

  try {
    let notes = await Note.findAll({
      offset: 2,
      limit: 3,
      attributes: ["id", "description"],
      raw: true,
    });
    console.log(notes);
    sequelize.close();
  } catch (error) {
    console.error("--Unable to findAll in table notes", error);
  }
}
//---------------------------------------------------------------
async function findAll_note_Op_between() {
  let Note = sequelize.define("notes", {
    description: Sequelize.STRING,
  });

  const { Op } = require("sequelize");

  try {
    let notes = await Note.findAll({
      where: { id: { [Op.between]: [3, 6] } },
      attributes: ["id", "description"],
      raw: true,
    });
    console.log(notes);
    sequelize.close();
  } catch (error) {
    console.error("--Unable to findAll in table notes", error);
  }
}
//---------------------------------------------------------------
async function findAll_note_Op_in() {
  let Note = sequelize.define("notes", {
    description: Sequelize.STRING,
  });

  const { Op } = require("sequelize");

  try {
    let notes = await Note.findAll({
      where: { id: { [Op.in]: [3, 6] } },
      attributes: ["id", "description"],
      raw: true,
    });
    console.log(notes);
    sequelize.close();
  } catch (error) {
    console.error("--Unable to findAll in table notes", error);
  }
}
//---------------------------------------------------------------
async function findAll_note_Op_Where_gt() {
  let Note = sequelize.define("notes", {
    description: Sequelize.STRING,
  });

  const { Op } = require("sequelize");

  try {
    let notes = await Note.findAll({
      where: { id: { [Op.gt]: [3] } },
      attributes: ["id", "description"],
      raw: true,
    });
    console.log(notes);
    sequelize.close();
  } catch (error) {
    console.error("--Unable to findAll in table notes", error);
  }
}
//---------------------------------------------------------------
async function findAll_note_order() {
  let Note = sequelize.define("notes", {
    description: Sequelize.STRING,
  });

  try {
    let notes = await Note.findAll({
      order: [["description", "DESC"]],
      attributes: ["id", "description"],
      raw: true,
    });
    console.log(notes);
    sequelize.close();
  } catch (error) {
    console.error("--Unable to findAll in table notes", error);
  }
}
//---------------------------------------------------------------
async function buildsave_note() {
  let Note = sequelize.define("notes", {
    description: Sequelize.STRING,
  });

  const note = Note.build({ description: "Took a cold bath" });
  note
    .save()
    .then(() => {
      console.log("--Build-Save added a new note");
    })
    .catch((err) => {
      console.log("--Build-Save failed");
      console.log(err);
    })
    .finally(() => {
      sequelize.close();
    });
}
//---------------------------------------------------------------
async function create_note() {
  let Note = sequelize.define("notes", {
    description: Sequelize.STRING,
  });

  const note = Note.create({ description: "Took a hot shower" });
  note
    .then(() => {
      console.log("--Create added a new note");
    })
    .catch((err) => {
      console.log("--Create failed");
      console.log(err);
    })
    .finally(() => {
      sequelize.close();
    });
}
//---------------------------------------------------------------
async function update_note() {
  let Note = sequelize.define("notes", {
    description: Sequelize.STRING,
  });

  try {
    let id = await Note.update(
      { description: "Finished reading history book" },
      { where: { id: 1 } }
    );
    console.log("--Table note row updated for id=1");
    sequelize.close();
  } catch (error) {
    console.error("--Unable to findAll in table notes", error);
  }
}
//---------------------------------------------------------------
async function destroy_note() {
  let Note = sequelize.define("notes", {
    description: Sequelize.STRING,
  });

  try {
    let n = await Note.destroy({ where: { id: 2 } });
    console.log(`-- Number of destroyed rows: ${n}`);
    sequelize.close();
  } catch (error) {
    console.error("--Unable to destroy rows in table notes", error);
  }
}
// ---------------------------------------------------------------
async function Create_Stored_Procedure_note() {
  aSQL =
    "CREATE PROCEDURE `sp_getNote`( p_id int) Select id, description from notes where id = p_id ; ";
  try {
    const values = await sequelize.query(aSQL);
    console.log(values);
  } catch (error) {
    console.log(error);
  }
}
// ---------------------------------------------------------------
async function Execute_Stored_Procedure_note(nId) {
  try {
    let o_rowcnt = 0;
    let o_result = await sequelize.query("CALL sp_getNote ( :p_id)", {
      replacements: {
        p_id: nId,
      },
    });
    console.log(o_result);
  } catch (o_err) {
    console.log(o_err);
  }
}
// ---------------------------------------------------------------
async function Execute_Stored_Procedure_note_querytype(nId) {
  const { QueryTypes } = require("sequelize");

  try {
    let o_rowcnt = 0;
    let o_result = await sequelize.query("CALL sp_getNote ( :p_id)", {
      replacements: {
        p_id: nId,
        type: QueryTypes.SELECT,
      },
    });
    console.log(o_result);
  } catch (o_err) {
    console.log(o_err);
  }
}
// ---------------------------------------------------------------
async function Create_employees2projects() {
  let Employee = sequelize.define("employees", {
    name: Sequelize.STRING,
  });

  let Project = sequelize.define("projects", {
    name: Sequelize.STRING,
  });

  Employee.belongsTo(Project);
  // ---------------------------------------------------------------

  let employees = [
    { name: "Jane Brown" },
    { name: "Lucia Benner" },
    { name: "Peter Novak" },
  ];

  sequelize
    .sync({ force: true })
    .then(() => {
      return Employee.bulkCreate(employees);
    })
    .then((employees) => {
      let works = [];
      let i = 0;

      employees.forEach((employee) => {
        let pname = "Project " + String.fromCharCode("A".charCodeAt() + i);
        i++;

        let work = Project.create({ name: pname }).then((project) => {
          employee.setProject(project);
        });

        works.push(work);
      });

      Promise.all(works).then(() => sequelize.close());
      console.log("finish");
    });
}
// ---------------------------------------------------------------
async function employee_belongsTo_project() {
  let Employee = sequelize.define("employees", {
    name: Sequelize.STRING,
  });

  let Project = sequelize.define("projects", {
    name: Sequelize.STRING,
  });

  Employee.belongsTo(Project);
  // ---------------------------------------------------------------

  Employee.findAll({ include: [Project] })
    .then((employees) => {
      employees.forEach((employee) => {
        console.log(`${employee.name} is in project ${employee.project.name}`);
      });
    })
    .finally(() => {
      sequelize.close();
    });
}
// ---------------------------------------------------------------
async function project_hasOne_employee() {
  let Employee = sequelize.define("employees", {
    name: Sequelize.STRING,
  });

  let Project = sequelize.define("projects", {
    name: Sequelize.STRING,
  });

  Employee.belongsTo(Project);
  // ---------------------------------------------------------------

  Project.hasOne(Employee);

  Project.findAll({ include: [Employee] })
    .then((projects) => {
      projects.forEach((project) => {
        console.log(`${project.name} belongs to user ${project.employee.name}`);
      });
    })
    .finally(() => {
      sequelize.close();
    });
}
// ---------------------------------------------------------------
async function Create_users2tasks() {

  let User = sequelize.define("user", {
    name: Sequelize.STRING,
  });

  let Task = sequelize.define("task", {
    description: Sequelize.STRING,
  });

  User.hasMany(Task);

  async function createTables() {
    await User.sync();
    await Task.sync();

    console.log("done");
    sequelize.close();
  }
  createTables();
}
// ---------------------------------------------------------------
async function Add_Data_users2tasks() {

let User = sequelize.define('user', {
  name: Sequelize.STRING,
});

let Task = sequelize.define('task', {
  description: Sequelize.STRING,
});

// ---------------------------------------------------------------
User.hasMany(Task);

let mytasks1 = [
    { description: 'write memo' }, { description: 'check accounts' }
];

let mytasks2 = [
    { description: 'make two phone calls' },
    { description: 'read new emails' },
    { description: 'arrange meeting' }
];

async function addUsersTasks() {

    let user1 = await User.create({ name: 'John Doe' });
    let tasks1 = await Task.bulkCreate(mytasks1);

    await user1.setTasks(tasks1);

    let user2 = await User.create({ name: 'Debbie Griffin' });
    let tasks2 = await Task.bulkCreate(mytasks2);

    await user2.setTasks(tasks2);

    console.log('done');
    sequelize.close();
}

addUsersTasks();
}
// ---------------------------------------------------------------
async function user_hasMany_task() {

let User = sequelize.define('user', {
  name: Sequelize.STRING,
});

let Task = sequelize.define('task', {
  description: Sequelize.STRING,
});

// ---------------------------------------------------------------

User.hasMany(Task);

async function showUsersTasks() {

    let users = await User.findAll({ include: [Task] });

    users.forEach(user => {

        console.log(`${user.name} has tasks: `);

        let tasks = user.tasks;

        tasks.forEach(task => {
            console.log(`  * ${task.description}`);
        })
    });

    console.log('done');
    sequelize.close();
}

showUsersTasks();
}
// ---------------------------------------------------------------
async function task_belongsTo_user() {

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
}
// ---------------------------------------------------------------

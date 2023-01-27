const Sequelize = require("sequelize"); // .(01221.01.1 RAM Used on line 4)
const dbConfig = require("./db.config.js");

var sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    options: { encrypt: true, validateBulkLoadParameters: false },
  },
  //    , options         : { validateBulkLoadParameters: 'false' }
  //    , operatorsAliases:   false
  //    , logging         :   console.log
  logging: function (str) {
    console.log(str);
  }, // do your own logging

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

// export default   sequelize    //#.(01221.02.1 RAM NodeJS's v15 New way)
module.exports = sequelize; // .(01221.02.1 RAM NodeJS's old way to export module objects)

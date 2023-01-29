const Sequelize = require("sequelize"); 
const dbConfig = require("./db.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
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

module.exports = sequelize; 
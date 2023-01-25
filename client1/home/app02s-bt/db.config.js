
module.exports = {
  HOST     : 'localhost',
  USER     : 'root',
  PASSWORD : 'FormR!1234',
  DB       : 'practice',
  dialect  : 'mysql',
  pool: {
    max    : 5,
    min    : 0,
    acquire: 30000,
    idle   : 10000
    }
  };


module.exports = {
  HOST     : 'localhost',
  USER     : 'root',
  PASSWORD : 'Washington!12345',
  DB       : 'practice',
  dialect  : 'mysql',
  pool: {
    max    : 5,
    min    : 0,
    acquire: 30000,
    idle   : 10000
    }
  };

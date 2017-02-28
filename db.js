const config = require('./config');
const sqlite = require('sqlite3');

module.exports = {
  db: new sqlite.Database(config.db)
}

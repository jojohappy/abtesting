const shasum = require('shasum');

class Users {
  constructor(username, password) {
    let uid = shasum({
      username: username,
      password: password
    });

    this.uid = uid;
    this.username = username;
    this.password = password
  }

  static findByUsername(username, done) {
    let db = Users.db;
    db.get('SELECT * FROM users WHERE username=?', username, (err, row) => {
      if (err) {
        console.error(err);
      }
      if (row) {
        done(new Users(row.username, row.password))
      }
      else {
        done(null)
      }
    });
  }

  save(done) {
    let db = Users.db;
    db.run('INSERT INTO users VALUES(?,?,?)', this.uid, this.username, this.password, done);
  }
}

module.exports = Users;

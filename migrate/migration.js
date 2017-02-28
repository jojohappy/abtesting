const shasum = require('shasum');
const db = require('../db').db;

const users = [
  {
    username: 'testA',
    password: 'hoopchina'
  },
  {
    username: 'testB',
    password: '@@big9'
  }
];

db.serialize(() => {
  db.run("CREATE TABLE `users` (uid LONG PRIMARY KEY,username TEXT,password TEXT)");

  let stmt = db.prepare("INSERT INTO users VALUES(?,?,?)");
  users.forEach(u => {
    stmt.run(shasum({
      username: u.username,
      password: shasum(u.password)
    }), u.username, shasum(u.password));
  });
  stmt.finalize();
});

db.close();

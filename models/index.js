const db = require('../db');

let models = {};
let modelsToLoad = ['Users'];
modelsToLoad.forEach(className => {
  let TheClass = require(__dirname + '/' + className.toLowerCase());
  TheClass.db = db.db;

  models[className] = TheClass;
});

module.exports = models;
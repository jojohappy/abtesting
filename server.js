const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser());

app.use('/assets/css/bootstrap.min.css', express.static(__dirname + '/node_modules/bootstrap/dist/css/bootstrap.min.css'));
app.use('/login', express.static(__dirname + '/public/login.html'));

app.use('/', (req, res, next) => {
  var path = req.path;
  if ('/signin' === path || '/signout' === path) {
    return next();
  }
  let cookies = req.cookies;
  if (!cookies || !cookies.uid) {
    return res.redirect('/login');
  }
  else {
    next();
  }
});

app.use('/', express.static(__dirname + '/public'));

app.set('models', require('./models'));

app.use('/', require('./api'));

app.listen(3000, () => {
  console.log('Example app listening on port 3000 for testing A');
});

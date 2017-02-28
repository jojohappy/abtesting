const express = require('express');
const shasum = require('shasum');
let router = express.Router();

router.post('/signin', (req, res) => {
  let Users = req.app.get('models').Users;
  let username = req.body.username;
  let pwd = req.body.password;
  Users.findByUsername(username, (u) => {
    if (!u) {
      return res.redirect('/login');
    }
    if (u.password !== shasum(pwd)) {
      return res.redirect('/login');
    }
    res.cookie('uid', u.uid, {
      domain: 'localhost',
      path: '/'
    })

    if (u.username === 'testA') {
      res.cookie('abtesting', shasum(u.uid), {
        domain: 'localhost',
        path: '/'
      })
    }

    return res.redirect('/');
  });
});

router.get('/signout', (req, res) => {
  res.clearCookie('uid');
  res.clearCookie('abtesting');
  return res.redirect('/login');
});

module.exports = router;

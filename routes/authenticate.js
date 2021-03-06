'use strict';

const express       = require('express');
const request       = require('request');
const queryString   = require('query-string');

const router        = express.Router();

router.post('/', (req, res, next) => {
  const loginInfo = req.body;
  let host = req.hostname;
  if (host.indexOf('localhost') !== -1) {
    host += ':' + process.env.PORT;
  }

  if (!loginInfo.username || !loginInfo.password) {
    return res.json({error: 'Username and password are required'});
  }

  request.get({
    method: 'GET',
    url: `http://${host}/api/users?query=${JSON.stringify(loginInfo)}`,
    json: true
  }, (error, response, users) => {
    if (error || users.length === 0) {
      if (error) {
        console.log(error);
      }
      
      return res.json({error: error ? 'Server error' : 'Invalid login credentials'});
    }

    req.session.user = users[0];

    res.json({user: req.session.user});
  });
});

router.get('/', (req, res, next) => {
  return res.json({isLoggedIn: !!req.session.user});
});

router.get('/logout', (req, res, next) => {
  req.session.user = null;

  return res.json({});
});

module.exports = router;
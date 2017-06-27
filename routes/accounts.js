'use strict';

const express = require('express');
const request = require('request');

const router = express.Router();

router.get('/', (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({error: 'Not logged in'});
  }

  let host = req.hostname;
  if (host.indexOf('localhost') !== -1) {
    host += ':' + process.env.PORT;
  }

  const query = {
    _id: {
      $in: req.session.user.accounts
    }
  };
  
  request.get({
    method: 'GET',
    url: `http://${host}/api/accounts?query=${JSON.stringify(query)}`,
    json: true
  }, (error, response, accounts) => {
    if (error) {
      console.log(error);
      return res.json({error: error ? 'Server error' : 'Invalid login credentials'});
    }

    res.json({accounts: accounts});
  })
});

router.put('/', (req, res, next) => {
  request({
    method: 'PUT',
    url: `http://localhost:${(process.env.PORT || 3000)}/api/accounts`,
    json: true,
    body: req.body
  }, (error, response, account) => {
    if (error) {
      console.log(error);
      return res.json({error: error});
    }

    res.json({account: account});
  });
});

router.post('/', (req, res, next) => {
  request({
    method: 'POST',
    url: `http://localhost:${(process.env.PORT || 3000)}/api/accounts`,
    json: true,
    body: req.body
  }, (error, response, account) => {
    if (error) {
      console.log(error);
      return res.json({error: error});
    }

    res.json({account: account});
  });
});

module.exports = router;
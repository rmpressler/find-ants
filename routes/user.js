'use strict';

const express = require('express');
const request = require('request');

const router = express.Router();

router.get('/', (req, res, next) => {
  if (req.session.user) {
    return res.json({user: req.session.user});
  } else {
    return res.status(401).json({error: 'Not logged in'});
  }
});

router.put('/', (req, res, next) => {
  request({
    method: 'PUT',
    url: `http://localhost:3000/api/users`,
    json: true,
    body: req.body
  }, (error, response, user) => {
    if (error || !user) {
      console.log(error);
      return res.json({error: error});
    }

    req.session.user = user;

    res.json({user: req.session.user});
  });
});

router.post('/', (req, res, next) => {
  request({
    method: 'POST',
    url: `http://localhost:${(process.env.PORT || 3000)}/api/users`,
    json: true,
    body: req.body
  }, (error, response, user) => {
    if (error || !user) {
      console.log(error);
      return res.json({error: error});
    }

    console.log(user);

    req.session.user = user;

    res.json({user: req.session.user});
  });
});

module.exports = router;
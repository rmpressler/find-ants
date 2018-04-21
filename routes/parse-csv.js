const express = require('express');
const parse = require('csv-parse');
const _ = require('lodash/fp');

const router = express.Router();

router.post('/', (req, res, next) => {
    const fields = req.body.input.split(',');
    const trimmedCsv = _.map(field => field.trim(), fields).join(',');
    parse(trimmedCsv, {}, (err, output) => {
        if (err) {
            return next(err);
        }

        return res.json({ output });
    });
});

module.exports = router;

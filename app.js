'use strict';

const express           = require('express');
const session           = require('express-session');
const logger            = require('morgan');
const bodyParser        = require('body-parser');
const routes            = require('./routes');
const api               = require('./routes/api');
const authenticate      = require('./routes/authenticate');

const app = express();
let appBase = __dirname + '/public/';

const skipLogging = ['/bower_components', '/public'];

app.use(logger('dev', {
  skip: (req, res) => skipLogging.indexOf(req.baseUrl) !== -1
}));

app.use(session({
  secret: 'LEH t6HBT QZ',
  resave: false,
  saveUninitialized: true
}));

app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());

app.use(express.static(appBase));

app.use('/authenticate', authenticate);

app.get('/api/:table', api.read);
app.post('/api/:table', api.create);
app.put('/api/:table', api.update);

app.get('/*', routes.indexHandler);

var server = app.listen(process.env.PORT || 3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at test http://%s:%s", host, port);

});

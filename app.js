var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var routes = require('./routes');
var api = require('./routes/api');

app.engine('html', require('ejs').renderFile);

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/api/:table', api.read);
app.post('/api/:table', api.create);
app.put('/api/:table', api.update);

app.get('/*', routes.indexHandler);

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);

});

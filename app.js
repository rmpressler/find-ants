var express = require('express');
var app = express();
var routes = require('./routes');

app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));

app.get('/*', routes.indexHandler);

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);

});

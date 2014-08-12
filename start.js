#!/usr/bin/env node
var http = require('http');
var app = require('./app');
var logger = require("./logger").get(__filename);

var server = http.createServer(app).listen(app.get('port'), function () {
    logger.info('job train server listening on port:[%s]', app.get('port'));
});

server.on("error", function (event, listener) {
    logger.error(event);
})

var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var settings = require("./settings");

var app = express();

/// default attributes
app.locals = {
    title: '包就业',
    author: 'pippo',
    email: 'pippo1980.du@gmail.com'
};

/// view engine setup
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use("/static", express.static(path.join(__dirname, "/static")));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.text({type: 'text/*'}));

/// route mappings
app.use(require("./routes/mappings"));

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        /// development error handler
        /// will print stacktrace
        error: err
    });
});

///start http server
var http = require('http');
var logger = require("./logger").get(__filename);

var server = http.createServer(app).listen(settings['http']['port'], settings['http']['host'], 512, function () {
    logger.info('job train server listening on address:[%s:%s]', settings['http']['host'], settings['http']['port']);
});

server.on("error", function (event, listener) {
    logger.error(event);
});

///init db
require("./db.dml");

//////////////////////////////////////////////
//var menu = require("./routes/webchat/api.menu");
//menu.create(require("./routes/webchat/buttons"), function (success, result, error) {
//    console.log("#####", success, result, error);
//});

//var http = require("http");
//
//var options = {
//    "host": "127.0.0.1",
//    "port": 8080,
//    "method": "POST",
//    "path": "/webchat/callback?a=b",
//    "headers":{
//        "content-type":"application/xml"
//    }
//};
//var req = http.request(options, function (res) {
//
//    res.setEncoding('utf8');
//    res.on('data', function (chunk) {
//        logger.info("the create menu result is:[%s]", chunk);
//    });
//
//});
//req.write("<xml></xml>");
//req.end();
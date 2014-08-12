var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

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

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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
        error: app.get('env') === 'development' ? err : {}
    });
});

///start http server
var http = require('http');
var settings = require("./settings");
var logger = require("./logger").get(__filename);

var server = http.createServer(app).listen(settings['http']['port'], function () {
    logger.info('job train server listening on port:[%s]', settings['http']['port']);
});

server.on("error", function (event, listener) {
    logger.error(event);
})



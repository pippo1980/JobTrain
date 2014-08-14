/**
 * Created by pippo on 14-8-14.
 */
process.on('uncaughtException', function (err) {
    console.log(err);
});

var https = require("https");

var options = {
    hostname: 'api.weixin.qq.com',
    port: 443,
    path: '/cgi-bin/menu/create',
    method: 'POST'
};

var req = https.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
});

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

// write data to request body
//req.write('data\n');
//req.write('data\n');
req.end();


//var https = require('https');
//
//var options = {
//    host: 'graph.facebook.com',
//    port: 443,
//    path: '/pippo/feed?access_token=123',
//    method: 'POST',
//    headers: { 'message': 'hello' }
//};
//
//var req = https.request(options, function(res) {
//    console.log("statusCode: ", res.statusCode);
//    console.log("headers: ", res.headers);
//
//    res.on('data', function(d) {
//        process.stdout.write(d);
//    });
//});
//
//req.end();
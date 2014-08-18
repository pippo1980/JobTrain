/**
 * Created by pippo on 14-8-12.
 */
var xml2js = require('xml2js');
var logger = require("../../logger").get(__filename);
var message = require("./processor");

message.on("subscribe", function (context) {
    var xml = context['xml'];
    var from = xml['FromUserName'];
    logger.debug({file: __filename, info: 'user subscribe us', user: from})

    var welcome = {'xml': {'ToUserName': from, 'FromUserName': xml['ToUserName'], 'CreateTime': new Date().getTime(), 'MsgType': 'text', 'Content': '感谢您关注包就业'}};
    logger.debug({file: __filename, info: "return welcome msg", welcome: welcome});

    var response = context['response'];
    response.send(new xml2js.Builder().buildObject(welcome));
    response.end();
});

logger.info({file: __filename, info: 'add subscribe event processor'});
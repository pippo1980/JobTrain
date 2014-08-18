/**
 * Created by pippo on 14-8-12.
 */
var logger = require("../../logger").get(__filename);
var processor = require("./processor");
var welcome = require("./reply/welcome");

processor.on("subscribe", function (context) {
    var xml = context['xml'];
    var from = xml['FromUserName'];
    logger.debug({file: __filename, info: 'user subscribe us', user: from})

    /*因为是回复,所以from/to要倒过来*/
    var reply = welcome.create(xml['ToUserName'], from)
    logger.debug({file: __filename, info: "reply welcome msg", reply: reply});

    var response = context['response'];
    response.send(reply);
    response.end();
});

logger.info({file: __filename, info: 'add subscribe event processor'});
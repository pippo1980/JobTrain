/**
 * Created by pippo on 14-8-12.
 */
var logger = require("../../logger").get(__filename);
var message = require("./message");

message.on("subscribe", function (context) {
    var message = context['message'];
    var response = context['response'];

    var welcome_msg = {'xml': {'ToUserName': message['FromUserName'], 'FromUserName': message['ToUserName'], 'CreateTime': new Date().getTime(), 'MsgType': 'text', 'Content': '感谢您关注包就业'}};
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(webcom_msg);

    logger.debug("[%s]:%s", __filename, welcome_msg);
    response.send(xml);
    response.end();
});

/**
 * Created by pippo on 14-8-12.
 */

var util = require("util");
var events = require("events");
var logger = require("../../logger").get("webchat-message");

function Processor() {
    events.EventEmitter.call(this);
}

util.inherits(Processor, events.EventEmitter);

Processor.prototype.process = function (context) {
    var message = context['payload']['xml'];
    context['message'] = message;
    logger.debug(message)
    logger.debug("[%s]:receive message:[%s]", __filename, JSON.stringify(message));
    var messageType = message['MsgType'];

    /*如果是事件类型的消息,那么应该使用具体事件作为类型*/
    if (messageType == 'event') {
        messageType = message['Event'] + "/" + message['EventKey'];
    }

    logger.debug("[%s]:the message type is:[%s]", __filename, messageType);
    this.emit(messageType, context);
};

module.exports = new Processor();

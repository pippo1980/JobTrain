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

Processor.prototype.process = function (payload) {
    var message = payload['xml'];
    logger.debug("receive message:[%s]", JSON.stringify(message));
    var messageType = message['MsgType']
    /*如果是事件类型的消息,那么应该使用具体事件作为类型*/
    if (messageType == 'event') {
        messageType = message['event'];
    }

    logger.debug("the message type is:[%s]", messageType);
    this.emit(messageType, message);
};

module.exports = new Processor();

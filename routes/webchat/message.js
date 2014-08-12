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

Processor.prototype.process = function (message) {
    logger.debug("receive message:[%s]", message);

    var eventType = message['MsgType']

    /*如果是事件类型的消息,那么应该使用具体事件作为类型*/
    if (eventType == 'event') {
        eventType = message['event'];
    }

    this.emit(eventType, message);
};

module.exports = new Process();

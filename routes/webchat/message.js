/**
 * Created by pippo on 14-8-12.
 */

var util = require("util");
var events = require("events");
var logger = require("../../logger").get(__filename);

function Processor() {
    events.EventEmitter.call(this);
}

util.inherits(Processor, events.EventEmitter);

Processor.prototype.process = function (context) {
    logger.debug(context)
    var xml = context['xml'] = context['message']['xml'];
    logger.debug({ msg: "on xml message", file: __filename, xml: xml });

    /*如果是事件类型的消息,那么应该使用具体事件作为类型*/
    var messageType = xml['MsgType'];
    if (messageType == 'event') {
        messageType = xml['Event'];
    }

    logger.debug({msg: 'emit event', file: __filename, type: messageType, context: context});
    this.emit(messageType, context);
};

module.exports = new Processor();

/**
 * Created by pippo on 14-8-12.
 */
var logger = require("../../logger").get(__filename);
var processor = require("./processor");

processor.on("text", function (context) {
    logger.debug(context);
});

logger.info({file: __filename, info: 'add text msg processor'});
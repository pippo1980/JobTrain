/**
 * Created by pippo on 14-8-12.
 */
var logger = require("../../logger").get(__filename);
var message = require("./message");

message.on("text", function (message) {
    logger.debug(__filename);
});
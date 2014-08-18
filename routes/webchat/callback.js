/**
 * Created by pippo on 14-8-12.
 */
var crypto = require('crypto');
var xml2js = require('xml2js');
var settings = require("../../settings");
var logger = require("../../logger").get(__filename);
var webchat_logger = require("../../logger").get("webchat-message");
var processor = require("./processor");

module.exports.init = init;

function init(router) {
    /*回掉响应*/
    router.get("/webchat/callback", onValidate);
    router.post("/webchat/callback", onMessage);

    /*processor 注册*/
    require("./processor.text");
    require("./processor.event.subscribe");
}

function validateSignature(req) {
    var signature = req.param("signature");
    var timestamp = req.param("timestamp");
    var nonce = req.param("nonce");

    var token = settings['webchat']['token'];
    var to_validate_array = [token, timestamp, nonce];
    var to_validate_str = to_validate_array.sort().join("");
    var expect = crypto.createHash("sha1").update(to_validate_str).digest('hex');

    return expect == signature;
}

function onValidate(req, res) {
    if (!validateSignature(req)) {
        res.send(403, "invalid signature");
        return;
    }

    res.send(req.param("echostr"));
    res.end();
}

function onMessage(req, res) {
    if (settings['profile'] != 'dev' && !validateSignature(req)) {
        res.send(403, "invalid signature");
        return;
    }

    xml2js.parseString(req.body, {trim: true}, function (error, message) {
        if (error != null) {
            res.end();
            logger.error({info: "parse req body due to error", file: __filename, body: req.body});
            logger.error(error);
            return;
        }

        try {
            webchat_logger.debug(message);
            processor.process({'request': req, 'response': res, 'message': message});
        } catch (error) {
            res.end();
            logger.error({ info: "process message due to error", file: __filename, message: message});
            logger.error(error);
        }
    });
}
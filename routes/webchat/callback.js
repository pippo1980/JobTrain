/**
 * Created by pippo on 14-8-12.
 */
var crypto = require('crypto');
var xml2js = require('xml2js');
var settings = require("../../settings");
var logger = require("../../logger").get(__filename);
var message = require("./message");

module.exports.init = function (router) {
    router.get("/webchat/callback", onValidate);
    router.post("/webchat/callback", onMessage);
}


function validateSignature(req) {
    var signature = req.param("signature");
    var timestamp = req.param("timestamp");
    var nonce = req.param("nonce");

    var token = settings['webchat']['token'];
    var to_validate_array = [token, timestamp, nonce];
    var to_validate_str = to_validate_array.sort().join("");
    var expect = crypto.createHash("sha1").update(to_validate_str);

    return expect == signature;
}

function onValidate(req, res) {
    var echostr = req.param("echostr");
    if (validateSignature()) {
        res.send(echostr);
    } else {
        res.status = 403;
        res.send("invalid signature");
    }
}

function onMessage(req, res) {
    if (!validateSignature(req)) {
        res.status = 403;
        res.send("invalid signature");
        return;
    }

    xml2js.parseString(res.body, {trim: true}, function (error, message) {
        if (error != null) {
            logger.error("parse msg:[%s] due to error:[%s]", req.body, error);
            return;
        }

        message.process(message);
    });
}
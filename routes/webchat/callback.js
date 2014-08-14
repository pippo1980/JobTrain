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
    var expect = crypto.createHash("sha1").update(to_validate_str).digest('hex');

    return expect == signature;
}

function onValidate(req, res) {
    if (!validateSignature(req)) {
        res.send(403, "invalid signature");
        return;
    }

    res.send(req.param("echostr"));
}

function onMessage(req, res) {
    if (!validateSignature(req)) {
        res.send(403, "invalid signature");
        return;
    }

    xml2js.parseString(req.body, {trim: true}, function (error, payload) {
        if (error != null) {
            logger.error("%s:parse msg:[%s] due to error:[%s]", __filename, req.body, error);
            return;
        }

        try {
            message.process(payload);
        } catch (error) {
            logger.error("%s:process msg:[%s] due to error:[%s]", __filename, JSON.stringify(payload), error);
        }
    });

    res.end();
}
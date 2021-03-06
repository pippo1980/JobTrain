/**
 * Created by pippo on 14-8-12.
 */

var https = require('https');
var settings = require("../../settings");
var logger = require("../../logger").get(__filename);

var wechat_settings = settings['wechat'];
var api_url = wechat_settings['api.access_token'] +
              "?grant_type=client_credential" +
              "&appid=" +
              wechat_settings['app_id'] +
              "&secret=" +
              wechat_settings['app_secret'];

var access_token = null;
var access_token_period = 7000 * 1000;
var access_token_timestamp = new Date().getTime();

function fetchToken(callback) {
    logger.info({file: __filename, info: "try to get new access token with url", url: api_url});

    https.get(api_url, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            logger.info("the access_token result is:[%s]", chunk);
            logger.info({file: __filename, info: "receive the access_token result", result: chunk})
            var result = null;
            var error = null;
            try {
                result = JSON.parse(chunk);
                access_token = result['access_token'];
                access_token_period = result['expires_in'] * 1000;
                access_token_timestamp = new Date().getTime() + access_token_period;
            } catch (e) {
                error = e;
            }

            callback(error == null, access_token, error);
        });
    }).on('error', function (e) {
        logger.error("get new access token due to error:[%s]", e);
        callback(false, null, e);
    })
}

module.exports.retrieve = function (callback) {
    if (access_token == null) {
        fetchToken(callback);
        return;
    }

    if (new Date().getTime() - access_token_timestamp > access_token_period) {
        fetchToken(callback);
        return;
    }

    callback(access_token);
}


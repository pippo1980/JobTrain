/**
 * Created by pippo on 14-8-12.
 */

var https = require('https');
var settings = require("../../settings");
var logger = require("../../logger").get(__filename);

var api_url = settings['webchat']['api.menu'];

function Menu() {

}

Menu.prototype.create = function (buttons, callback) {

    require("./api.access_token").retrieve(function (success, access_token, error) {

        if (!success) {
            logger.error("can not retrieve access_token");
            callback(false, null, error);
            return;
        }

        var url = api_url + "/create" + "?access_token=" + access_token;
        logger.info("try to create buttons:[%s] with url:[%s]", buttons, url);

        var options = {
            "host": "api.weixin.qq.com",
            "port": 443,
            "method": "POST",
            "path": "/cgi-bin/menu/create?access_token=" + access_token,
            "headers": {
                "content-type": "application/json"
            }
        };

        var req = https.request(options, function (res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                logger.info("the create menu result is:[%s]", chunk);
                callback(true, chunk);
            });
        }).on('error', function (e) {
            logger.error("create menu due to error:[%s]", e);
            callback(false, null, e);
        })

        console.log(JSON.stringify(buttons))
        req.write(JSON.stringify(buttons));
        req.end;
    });

};

module.exports = new Menu();



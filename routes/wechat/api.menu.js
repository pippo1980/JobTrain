/**
 * Created by pippo on 14-8-12.
 */

var request = require('request');
var settings = require("../../settings");
var logger = require("../../logger").get(__filename);

var api_url = settings['wechat']['api.menu'];

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
        logger.info({file: __filename, info: "try to create menus", url: url, buttons: buttons});

        var options = {
            url: url,
            method: 'POST',
            body: JSON.stringify(buttons)
        }

        request(options, function (error, response, body) {
            callback(error == null, body, error);
        })
    });

};

module.exports = new Menu();



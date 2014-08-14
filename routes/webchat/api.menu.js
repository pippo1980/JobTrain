/**
 * Created by pippo on 14-8-12.
 */

var request = require('request');
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
            url: url,
            method: 'POST',
            body: JSON.stringify(buttons)
        }

        request(options, function (error, response, body) {
            logger.info("create menu result is:[%s]", body);
        })
    });

};

module.exports = new Menu();



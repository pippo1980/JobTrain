/**
 * Created by pippo on 14-8-12.
 */
var bunyan = require('bunyan');
var settings = require("./settings");

var console_logger = {
    "stream": process.stdout,
    "level": "debug",
    "src": true
};
var loggers = {};
var global_logger = null;

if (settings['bunyan'] != null) {
    var logger_settings = settings['bunyan'];

    for (var logger_name in logger_settings) {
        var logger_setting = logger_settings[logger_name];
        console.info("the logger:", logger_name, "setting is:", logger_setting);

        if (logger_name == "global") {
            var streams = [console_logger];
            logger_setting.streams = streams.concat(logger_setting.streams);
        }

        loggers[logger_name] = bunyan.createLogger(logger_setting);
    }

}

global_logger = loggers['global'];
if (global_logger == null) {
    global_logger = bunyan.createLogger({
        "name": "job-train",
        "streams": [
            {
                "stream": process.stdout,
                "level": "debug",
                "src": true
            }
        ]
    });
}

exports.get = function (name) {

    var logger = loggers[name];
    if (logger == null) {
        return global_logger;
    }

}
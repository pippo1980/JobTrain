/**
 * Created by pippo on 14-8-12.
 */
var profile = "dev";

process.argv.forEach(function (value, index, array) {
    if (value.indexOf("--profile=") >= 0) {
        profile = value.replace("--profile=", "");
    }
});

var settings = require("./profile/" + profile + ".json");
console.info("the app settings is:", settings);

module.exports = settings;

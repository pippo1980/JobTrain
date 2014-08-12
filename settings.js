/**
 * Created by pippo on 14-8-12.
 */
var profile_file = "dev.json";

process.argv.forEach(function (value, index, array) {
    if (value.indexOf("--profile=") > 0) {
        profile_file = value.replace("--profile_file", "");
    }
});

var settings = require("./profile/" + profile_file);
console.info("the app settings is:", settings);

module.exports = settings;

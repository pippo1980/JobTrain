/**
 * Created by pippo on 14-8-18.
 */
var db = require("../../db.sqlite.template");

module.exports.init = function (router) {
    router.get("/m/tags", list);
    router.put("/m/tag", add);
}

function list(req, res) {
    res.render('mobile/tags', { title: '包就业' });
}

function add(req, res) {

}
/**
 * Created by pippo on 14-8-19.
 */

var db = require("../../db.sqlite.template");

module.exports.init = function (router) {
    router.get("/m/train", search);

}

function search(req, res) {
    var search_sql = "select * from train_t where (1=1)"
    var params = [];

    var name = req.param("name");
    if (name != null) {
        search_sql += "and name=? ";
        params.push("%" + name + "%");
    }

    var start = req.param("start") || 0;
    var limit = req.param("limit") || 10;
    search_sql += "offset ? limit ? ";
    params.push(start);
    params.push(limit);

    db.find(search_sql, params, function (success, rows) {

    });
}
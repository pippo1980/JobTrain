/**
 * Created by pippo on 14-8-19.
 */

var db = require("../../db.sqlite.template");

module.exports.init = function (router) {
    router.get("/m/trains", trains);
    router.get("/m/trains.segment", segment);
    router.get("/m/trains.count", count);
}

function trains(req, res) {
    var name = req.param("name");
    var start = req.param("start") || 0;
    var limit = req.param("limit") || 2;
    res.render("mobile/trains", {start: start, limit: limit, name: name});
}

var search_sql = "select train_t.id as id, train_class_t.id as train_class_id, min(train_class_t.price) as mini_price " +
                 "from train_t, train_class_t " +
                 "where train_t.name like ? " +
                 "and train_t.id=train_class_t.train_id " +
                 "group by train_t.id limit ? offset ?";

function segment(req, res) {
    var name = req.param("name");
    var start = req.param("start") || 0;
    var limit = req.param("limit") || 2;
    var params = [];
    params.push("%" + name + "%");
    params.push(limit);
    params.push(start);

    db.find(search_sql, params, function (success, rows) {
        /*没有记录的情况*/
        if (!success || rows.length == 0) {
            res.render("mobile/trains_segment", {start: start, limit: limit, items: []});
            return;
        }

        var item_sql = "select train_class_t.*, train_t.name, train_t.student_desc, train_t.train_desc " +
                       "from train_t, train_class_t " +
                       "where train_class_t.id = ? " +
                       "and train_class_t.train_id=train_t.id";

        /*循环主数据,填充其他属性*/
        var items = [];
        var length = rows.length;
        for (var i = 0; i < length; i++) {
            db.get(item_sql, [rows[i].train_class_id], function (success, row) {
                items.push(row);
                /*因为node是纯异步的,只要在最内部的循环结束时做返回客户端的逻辑*/
                if (length === items.length) {
                    var result = {start: start, limit: limit, name: name, items: success ? items : []};
                    res.render("mobile/trains_segment", result);
                }
            })
        }
    });
}

var count_sql = "select train_t.id as id, train_class_t.id as train_class_id, count(train_t.id) as train_count " +
                "from train_t, train_class_t " +
                "where train_t.name like ? " +
                "and train_t.id=train_class_t.train_id " +
                "group by train_t.id";

function count(req, res) {
    console.log(count_sql)
    var name = req.param("name");

    db.get(count_sql, [name], function (success, row) {
        console.log(row);
    })
}
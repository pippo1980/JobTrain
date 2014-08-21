/*
 *
 *  * Copyright © 2014 www.myctu.cn.
 *  * All rights reserved.
 *
 */

/**
 * Created by pippo on 14-8-19.
 */
var uuid = require('node-uuid');
var db = require("../../db.sqlite.template");

module.exports.init = function (router) {
    router.get("/admin/train", index);
    router.get("/admin/train/search", search);
    router.post("/admin/train/form", form);
    router.post("/admin/train/add", add);
    router.post("/admin/train/update", update);
    router.post("/admin/train/remove", remove);
}

function index(req, res) {
    res.render("admin/train/index");
}

function search(req, res) {
    var search_sql = "select * from train_t where (1=1) "
    var params = [];

    var name = req.param("name");
    if (name != null) {
        search_sql += "and name=? ";
        params.push("%" + name + "%");
    }

    var start = req.param("start") || 0;
    var limit = req.param("limit") || 10;

    search_sql += "limit ? offset ? ";
    params.push(limit);
    params.push(start);

    db.find(search_sql, params, function (success, rows) {
        var result = {start: start, limit: limit, items: success ? rows : []};
        res.render("admin/train/list", result);
    });
}

var load_sql = "select * from train_t where id=?";
function form(req, res) {
    var id = req.param('id');
    db.get(load_sql, [id], function (success, row) {
        res.render("admin/train/form", {train: row || {}});
    });
}

//var train={
//    id:'',
//    name:'培训名称',
//    student_desc:'适合学员',
//    train_desc:'课程简介'
//}
var add_sql = "insert into train_t values($id, $name, $student_desc, $train_desc)";
function add(req, res) {
    var param = {
        $id: uuid.v4(),
        $name: req.param('name'),
        $student_desc: req.param('student_desc'),
        $train_desc: req.param('train_desc')
    };

    db.update(add_sql, param, function (success) {
        res.send({success: success});
    });
}

var update_sql = "update train_t set name=$name, student_desc=$student_desc, train_desc=$train_desc where id=$id";
function update(req, res) {
    var param = {
        $id: req.param('id'),
        $name: req.param('name'),
        $student_desc: req.param('student_desc'),
        $train_desc: req.param('train_desc')
    };

    db.update(update_sql, param, function (success) {
        res.send({success: success});
    });
}


var remove_sql = "delete from train_t where id=?";
function remove(req, res) {
    db.update(remove_sql, [req.param('id')], function (success) {
        res.send({success: success});
    });
}
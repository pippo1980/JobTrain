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
    router.get("/admin/train/class/search", search);
    router.post("/admin/train/class/form", form);
    router.post("/admin/train/class/add", add);
    router.post("/admin/train/class/update", update);
    router.post("/admin/train/class/remove", remove);
}

function search(req, res) {
    res.render("admin/train/class/list");
}

var load_sql = "select * from train_t where id=?";
function form(req, res) {

}

//var train={
//    id:'',
//    name:'培训名称',
//    student_desc:'适合学员',
//    train_desc:'课程简介'
//}
var add_sql = "insert into train_t values($id, $name, $student_desc, $train_desc)";
function add(req, res) {

}

var update_sql = "update train_t set name=$name, student_desc=$student_desc, train_desc=$train_desc where id=$id";
function update(req, res) {

}


var remove_sql = "delete from train_t where id=?";
function remove(req, res) {

}
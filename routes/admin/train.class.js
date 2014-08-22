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
    var search_sql = "select * from train_class_t where (1=1) "
    var params = [];

    //    var name = req.param("name");
    //    if (name != null) {
    //        search_sql += "and name=? ";
    //        params.push("%" + name + "%");
    //    }

    var start = req.param("start") || 0;
    var limit = req.param("limit") || 10;

    search_sql += "limit ? offset ? ";
    params.push(limit);
    params.push(start);

    db.find(search_sql, params, function (success, rows) {
        var result = {start: start, limit: limit, items: success ? items : []};
        res.render("admin/train/class/list", result);
    })
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
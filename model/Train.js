/**
 * Created by pippo on 14-8-26.
 */
var uuid = require('node-uuid');
var Database = require("../db.sqlite3.database.js");
var db = new Database();
db.run("create table if not exists train_t (" +
       "id TEXT PRIMARY KEY, " +
       "train_type TEXT NOT NULL, " +
       "serial_num TEXT NOT NULL, " +
       "name TEXT NOT NULL, " +
       "price INTEGER, " +
       "vip_price INTEGER, " +
       "apply_count INTEGER, " +
       "total_count INTEGER, " +
       "signin_time TEXT," +
       "train_time TEXT," +
       "classroom TEXT," +
       "student_desc TEXT," +
       "train_desc TEXT NOT NULL," +
       "requirement TEXT NOT NULL," +
       "purpose_org TEXT NOT NULL," +
       "obtain_skill TEXT NOT NULL," +
       "target_role TEXT NOT NULL" +
       ");");

function Train() {
    this.id = null;
    this.train_type = null;          //类型描述,会按照这个类型对培训班进行分组
    this.serial_num = null;          //培训班编号
    this.name = null                 //培训班名称
    this.price = null;               //价格
    this.vip_price = null;           //包就业价格
    this.apply_count = null;         //已经报名人数
    this.total_count = null;         //允许总人数
    this.signin_time = null;         //报道时间
    this.train_time = null;          //上课时间
    this.classroom = null;           //上课地点
    this.student_desc = null;        //面向的学生
    this.train_desc = null;          //培训班描述
    this.requirement = null;         //要求的基础
    this.purpose_org = null;         //面向的企业
    this.obtain_skill = null;        //获得的技能
    this.target_role = null;         //将成为的角色
}

module.exports = Train;

Train.prototype.load = function (callback) {
    var sql = "select * from train_t where id=?";
    var train = this;
    db.get(sql, [train.id], function (success, row) {
        if (success && row != null) {
            for (var name in row) {
                train[name] = row[name];
            }
        } else {
            train = null;
        }

        callback(success, train);
    });
}

Train.prototype.add = function (callback) {
    var sql = "insert into train_t values(" +
              "$id," +
              "$train_type," +
              "$serial_num," +
              "$name," +
              "$price," +
              "$vip_price," +
              "$apply_count," +
              "$total_count," +
              "$signin_time," +
              "$train_time," +
              "$classroom," +
              "$student_desc," +
              "$train_desc," +
              "$requirement," +
              "$purpose_org," +
              "$obtain_skill," +
              "$target_role)"

    var params = {
        $id: uuid.v4(),
        $train_type: this.train_type,
        $serial_num: this.serial_num,
        $name: this.name,
        $price: this.price,
        $vip_price: this.vip_price,
        $apply_count: this.apply_count,
        $total_count: this.total_count,
        $signin_time: this.signin_time,
        $train_time: this.train_time,
        $classroom: this.classroom,
        $student_desc: this.student_desc,
        $train_desc: this.train_desc,
        $requirement: this.requirement,
        $purpose_org: this.purpose_org,
        $obtain_skill: this.obtain_skill,
        $target_role: this.target_role
    }

    db.update(sql, params, function (success) {
        callback(success);
    });
}

Train.prototype.update = function (callback) {
    var sql = "update train_t set " +
              "train_type= $train_type," +
              "serial_num=$serial_num," +
              "name=$name," +
              "price=$price," +
              "vip_price=$vip_price," +
              "apply_count=$apply_count," +
              "total_count=$total_count," +
              "signin_time=$signin_time," +
              "train_time=$train_time," +
              "classroom=$classroom," +
              "student_desc=$student_desc," +
              "train_desc=$train_desc," +
              "requirement=$requirement," +
              "purpose_org=$purpose_org," +
              "obtain_skill=$obtain_skill," +
              "target_role=$target_role " +
              "where id=$id";

    var params = {
        $id: this.id,
        $train_type: this.train_type,
        $serial_num: this.serial_num,
        $name: this.name,
        $price: this.price,
        $vip_price: this.vip_price,
        $apply_count: this.apply_count,
        $total_count: this.total_count,
        $signin_time: this.signin_time,
        $train_time: this.train_time,
        $classroom: this.classroom,
        $student_desc: this.student_desc,
        $train_desc: this.train_desc,
        $requirement: this.requirement,
        $purpose_org: this.purpose_org,
        $obtain_skill: this.obtain_skill,
        $target_role: this.target_role
    }


    db.update(sql, params, function (success) {
        callback(success);
    });
}

Train.prototype.remove = function (callback) {
    var sql = "delete from train_t where id=?";
    var id = this.id;
    db.update(sql, [id], function (success) {
        callback(success);
    });
}

Train.prototype.page = function (start, limit, callback) {
    var sql = "select * from train_t limit ? offset ?";

    db.find(sql, [limit, start], function (success, rows) {
        var items = [];

        if (success && rows != null) {
            for (var i = 0; i < rows.length; i++) {
                var train = new Train();
                train.id = rows[i].id;
                train.train_type = rows[i].train_type;
                train.serial_num = rows[i].serial_num;
                train.name = rows[i].name;
                train.price = rows[i].price;
                train.vip_price = rows[i].vip_price;
                train.apply_count = rows[i].apply_count;
                train.total_count = rows[i].total_count;

                items.push(train);
            }
        }

        callback({start: start, limit: limit, items: items});
    })
}


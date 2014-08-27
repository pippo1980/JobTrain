/**
 * Created by pippo on 14-8-26.
 */
var Database = require("../db.sqlite3.database.js");
var db = new Database();
db.run("create table if not exists user_t (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL , password TEXT NOT NULL);");

function User() {
    this.id = null;
    this.email = null;
    this.password = null;
}

function User(id) {
    this.id = id;
}

function User(email, password) {
    this.email = email;
    this.password = password;
}

module.exports = User;

User.login = function (callback) {
    var sql = 'select * from user_t where email=? and password=?';
    var user = this;
    db.get(sql, [user.email, user.password], function (success, row) {
        if (success && row != null) {
            user.id = row['id'];
        }

        callback(success && row != null, user);
    });
}

//var user = new user('pippo1980.du@gmailcom', '1q2w3e4r');
//user.login(function (success, user) {
//    console.log(success, user);
//});
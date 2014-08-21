/**
 * Created by pippo on 14-8-19.
 */

var db = require("./db.sqlite.template");

/*init db*/
db.run("create table if not exists user_t (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL , password TEXT NOT NULL);");
db.run("create table if not exists train_t (id TEXT PRIMARY KEY, name TEXT NOT NULL, student_desc TEXT, train_desc TEXT);");
db.run("create table if not exists train_class_t (id TEXT PRIMARY KEY, price TEXT NOT NULL, current_student INTEGER NOT NULL, total_student INTEGER NOT NULL, train_id TEXT NOT NULL);");
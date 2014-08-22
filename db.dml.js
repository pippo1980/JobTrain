/**
 * Created by pippo on 14-8-19.
 */

var db = require("./db.sqlite.template");

/*init db*/
db.run("create table if not exists user_t (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL , password TEXT NOT NULL);");
db.run("create table if not exists train_t (id TEXT PRIMARY KEY, name TEXT NOT NULL, student_desc TEXT, train_desc TEXT);");
db.run("create table if not exists train_class_t (" +
       "id TEXT PRIMARY KEY, " +
       "train_id TEXT NOT NULL, " +
       "price TEXT NOT NULL, " +
       "vip_price TEXT NOT NULL, " +
       "current_student INTEGER NOT NULL, " +
       "total_student INTEGER NOT NULL, " +
       "serial_num TEXT NOT NULL," +
       "purpose_org TEXT NOT NULL," +
       "time_range TEXT NOT NULL," +
       "workspace TEXT NOT NULL," +
       "in_place_time TEXT NOT NULL," +
       "description TEXT NOT NULL," +
       "requirement TEXT NOT NULL," +
       "obtain TEXT NOT NULL," +
       "become TEXT NOT NULL" +
       ");");
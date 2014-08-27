/*
 *
 *  * Copyright © 2014 www.myctu.cn.
 *  * All rights reserved.
 *
 */

/**
 * Created by pippo on 14-4-6.
 */
var path = require('path');
var sqlite3 = require('sqlite3').verbose();

function Database() {
    this.init();
}

module.exports = Database;

var db = null;

Database.prototype.init = function () {

    if (db != null) {
        this.db = db;
        return;
    }

    var db_path = path.join(process.cwd(), 'sqlite3.db');
    console.log("try to create db:", db_path);
    try {
        this.db = db = new sqlite3.Database(db_path);
    } catch (e) {
        this.db = db = null;
        console.error("open sqlite db due to error:", error);
    }
}

Database.prototype.reset = function () {
    if (this.db != null) {
        console.log("try to close db:", this.db);
        this.db.close(function (error) {
            if (error != null) {
                console.error("close sqlite db due to error", error);
            }
            this.db = null;
        })
    }

    return this.init();
}

Database.prototype.operate = function (operation) {
    if (this.db == null) {
        this.init();
    }

    try {
        operation(this.db);
    } catch (error) {
        console.error("operation due to error:", operation, error);
        this.reset();
    }
}

Database.prototype.run = function (sql) {
    try {
        this.db.run(sql);
    } catch (e) {
        console.error("run:", sql, " due to error:", e);
    }
}

Database.prototype.update = function (sql, params, callback) {
    var template = this;
    this.operate(function (db) {
        console.log("update:", sql, params);
        db.run(sql, params, function (error) {
            if (error != null) {
                console.error("update due to error:", error);
                template.reset();
            }

            callback(error == null);
        });
    });
}

Database.prototype.get = function (sql, params, callback) {
    var template = this;
    this.operate(function (db) {
        console.log("get:", sql, params);
        db.get(sql, params, function (error, row) {
            if (error != null) {
                console.error("get due to error:", error);
                template.reset();
            }

            callback(error == null, row);
        });
    });
}

Database.prototype.find = function (sql, params, callback) {
    var template = this;
    this.operate(function (db) {
        console.log("find:", sql, params);
        db.all(sql, params, function (error, rows) {
            if (error != null) {
                console.error("find due to error:", error);
                template.reset();
            }

            callback(error == null, rows);
        });
    });
}

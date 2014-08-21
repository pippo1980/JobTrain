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

module.exports = new Template();

function Template() {

    var db = initDB();

    function initDB() {
        var db_path = path.join(process.cwd(), 'sqlite3.db');
        console.log("try to create db:", db_path);

        try {
            db = new sqlite3.Database(db_path);
        } catch (e) {
            console.error("open sqlite db due to error:", error);
            db = null;
        }

        return db;
    }

    function resetDB() {
        if (db != null) {
            console.log("try to close db:", db);
            db.close(function (error) {
                if (error != null) {
                    console.error("close sqlite db due to error", error);
                }
                db = null;
            })
        }

        return initDB();
    }

    function operate(operation) {
        if (db == null) {
            initDB();
        }

        try {
            operation(db);
        } catch (error) {
            console.error("operation due to error:", operation, error);
            resetDB();
        }
    }

    return {
        'run': function (sql) {
            db.run(sql);
        },

        'update': function (sql, params, callback) {
            operate(function (db) {
                console.log("update:", sql, params);
                db.run(sql, params, function (error) {
                    if (error != null) {
                        console.error("update due to error:", error);
                        resetDB();
                    }

                    callback(error == null);
                });
            });
        },

        'get': function (sql, params, callback) {
            operate(function (db) {
                console.log("get:", sql, params);
                db.get(sql, params, function (error, row) {
                    if (error != null) {
                        console.error("get due to error:", error);
                        resetDB();
                    }

                    callback(error == null, row);
                });
            });
        },

        'find': function (sql, params, callback) {
            operate(function (db) {
                console.log("find:", sql, params);
                db.all(sql, params, function (error, rows) {
                    if (error != null) {
                        console.error("find due to error:", error);
                        resetDB();
                    }

                    callback(error == null, rows);
                });
            });
        }

    }
}


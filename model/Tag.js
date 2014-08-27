/**
 * Created by pippo on 14-8-26.
 */
var uuid = require('node-uuid');
var Database = require("../db.sqlite3.database.js");
var db = new Database();
db.run("create table if not exists tag_t (id TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT);");

function Tag() {
    this.id = null;
    this.name = null;
    this.description = null;
}

function Tag(id) {
    this.id = id;
    this.name = null;
    this.description = null;
}

function Tag(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
}

module.exports = Tag;

Tag.prototype.load = function (callback) {
    var sql = "select * from tag_t where id=?";
    var tag = this;
    db.get(sql, [tag.id], function (success, row) {
        if (success && row != null) {
            tag.id = row.id;
            tag.name = row.name;
            tag.description = row.description;
        } else {
            tag = null;
        }

        callback(success, tag);
    });
}

Tag.prototype.add = function (callback) {
    var sql = "insert into tag_t values($id, $name, $description)";
    var param = {
        $id: uuid.v4(),
        $name: this.name,
        $description: this.description
    };

    db.update(sql, param, function (success) {
        callback(success);
    });
}

Tag.prototype.update = function (callback) {
    var sql = "update tag_t set name=$name, description=$description where id=$id";
    var param = {
        $id: this.id,
        $name: this.name,
        $description: this.description
    };

    db.update(sql, param, function (success) {
        callback(success);
    });
}

Tag.prototype.remove = function (callback) {
    var sql = "delete from tag_t where id=?";
    var id = this.id;
    db.update(sql, [id], function (success) {
        callback(success);
    });
}

Tag.prototype.list = function (callback) {
    var sql = "select * from tag_t limit 100";

    db.find(sql, [], function (success, rows) {
        var items = [];

        if (success && rows != null) {
            for (var i = 0; i < rows.length; i++) {
                var tag = new Tag(rows[i].id, rows[i].name, rows[i].description);
                items.push(tag);
            }
        }

        callback(items);
    })
}

Tag.prototype.page = function (start, limit, callback) {
    var sql = "select * from tag_t limit ? offset ?";

    db.find(sql, [limit, start], function (success, rows) {
        var items = [];

        if (success && rows != null) {
            for (var i = 0; i < rows.length; i++) {
                var tag = new Tag(rows[i].id, rows[i].name, rows[i].description);
                items.push(tag);
            }
        }

        callback({start: start, limit: limit, items: items});
    })
}

Tag.prototype.count = function (callback) {
    var sql = "select count(*) from tag_t";

    db.get(sql, [], function (success, row) {
        var count = (!success || row == null) ? 0 : row;
        callback(count);
    })
}

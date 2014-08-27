/**
 * Created by pippo on 14-8-19.
 */
var Train = require("../../model/Train");

module.exports.init = function (router) {
    router.get("/admin/train", index);
    router.get("/admin/train/page", page);
    router.post("/admin/train/form", form);
    router.post("/admin/train/add", add);
    router.post("/admin/train/update", update);
    router.post("/admin/train/remove", remove);
}

function index(req, res) {
    res.render("admin/train/index");
}

function page(req, res) {
    var start = req.param("start") || 0;
    var limit = req.param("limit") || 10;
    var train = new Train();
    train.page(start, limit, function (pagination) {
        res.render("admin/train/page", pagination);
    });
}

function form(req, res) {
    var train = new Train();
    train.id = req.param('id');
    train.load(function (success) {
        res.render("admin/train/form", {train: success ? train : {}});
    })
}

function add(req, res) {
    var train = new Train();

    for (var key in train) {
        var value = req.param(key);
        if (value != null) {
            train[key] = value;
        }
    }

    train.add(function (success) {
        res.send({success: success});
    })
}

function update(req, res) {
    var train = new Train();

    for (var key in train) {
        var value = req.param(key);
        if (value != null) {
            train[key] = value;
        }
    }

    train.update(function (success) {
        res.send({success: success});
    })
}

function remove(req, res) {
    var train = new Train();
    train.id = req.param('id');
    train.remove(function (success) {
        res.send({success: success});
    })
}
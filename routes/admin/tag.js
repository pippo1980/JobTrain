/**
 * Created by pippo on 14-8-19.
 */
var Tag = require('../../model/Tag');

module.exports.init = function (router) {
    router.get("/admin/tag", index);
    router.get("/admin/tag/page", page);
    router.post("/admin/tag/form", form);
    router.post("/admin/tag/add", add);
    router.post("/admin/tag/update", update);
    router.post("/admin/tag/remove", remove);
}

function index(req, res) {
    res.render("admin/tag/index");
}

function page(req, res) {
    var start = req.param("start") || 0;
    var limit = req.param("limit") || 10;
    var tag = new Tag();
    tag.page(start, limit, function (pagination) {
        res.render("admin/tag/page", pagination);
    })
}

function form(req, res) {
    var id = req.param('id');
    var tag = new Tag(id);
    tag.load(function (success) {
        res.render("admin/tag/form", {tag: success ? tag : {}});
    })
}

function add(req, res) {
    var tag = new Tag(null, req.param('name'), req.param('description'));
    tag.add(function (success) {
        res.send({success: success});
    })
}

function update(req, res) {
    var tag = new Tag(req.param('id'), req.param('name'), req.param('description'));
    tag.update(function (success) {
        res.send({success: success});
    })
}

function remove(req, res) {
    var tag = new Tag(req.param('id'));
    tag.remove(function (success) {
        res.send({success: success});
    })
}
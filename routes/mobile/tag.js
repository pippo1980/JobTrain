/**
 * Created by pippo on 14-8-18.
 */
var Tag = require("../../model/Tag");

module.exports.init = function (router) {
    router.get("/m/tags", list);
}

function list(req, res) {
    var tag = new Tag();
    tag.list(function (tags) {
        res.render('mobile/tags', { tags: tags });
    })
}

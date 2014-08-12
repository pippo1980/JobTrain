/**
 * Created by pippo on 14-8-12.
 */

module.exports.init = function (router) {
    router.get("/", index);
}

function index(req, res) {
    res.render('index', { title: '包就业' });
}

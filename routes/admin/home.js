/**
 * Created by pippo on 14-8-18.
 */

var crypto = require('crypto');

module.exports.init = function (router) {
    router.use("/admin", validate);
    router.get("/admin", home);
}

function validate(req, res, next) {
    var session_id = req.cookies['session_id'];
    if (session_id != null) {
        next(req, res);
    } else {
        res.redirect(302, "/admin/login")
    }

}


function home(req, res) {
    res.render('admin/home', { title: '包就业' });
}

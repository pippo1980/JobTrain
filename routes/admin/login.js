/**
 * Created by pippo on 14-8-18.
 */
var db = require("../../db.sqlite.template");


var login_sql = 'select id from user_t where email=? and password=?';


module.exports.init = function (router) {
    router.get("/admin/register", register);
    router.post("/admin/register", do_register);

    router.get("/admin/login", login);
    router.post("/admin/login", do_login);
}

function register(req, res) {
    res.render('admin/register');
}

function do_register(req, res) {
    res.render('admin/register');
}

function login(req, res) {
    res.render('admin/login');
}

function do_login(req, res) {
    var params = [req.param('email'), req.param('password')];
    db.get(login_sql, params, function (success, row) {

        if (success && row != null) {
            res.cookie("session_id", row);
            res.render("admin/home");
        } else {
            res.render('admin/login', {error: '用户名密码不正确'});
        }

    });

}
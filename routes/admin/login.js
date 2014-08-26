/**
 * Created by pippo on 14-8-18.
 */
var User = require("../../model/User");

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
    var user = new User(req.param('email'), req.param('password'));
    user.login(function (success) {
        if (success) {
            res.cookie("session_id", user.id);
            res.render("admin/home");
        } else {
            res.render('admin/login', {error: '用户名密码不正确'});

        }
    });
}
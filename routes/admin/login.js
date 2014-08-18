/**
 * Created by pippo on 14-8-18.
 */

module.exports.init = function (router) {
    router.get("/admin/register", register);
    router.post("/admin/register", do_register);
    router.get("/admin/login", login);
    router.get("/admin/login", do_login);
}

function register(req, res) {
    res.render('admin/register', { title: '包就业' });
}

function do_register(req, res) {
    res.render('admin/register', { title: '包就业' });
}

function login(req, res) {
    res.render('admin/login', { title: '包就业' });
}

function do_login(req, res) {

}
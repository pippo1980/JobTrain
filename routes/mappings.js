/**
 * Created by pippo on 14-8-11.
 */
var express = require('express');
var router = express.Router();
var logger = require("../logger").get("http-access");
/*access log*/
router.use(function (req, res, next) {
    logger.debug({url: req.url, method: req.method, content_type: req.get('content-type'), params: req.params, body: req.body})
    //logger.debug(req);
    next();
});

/*init the router mappings*/
require('./index').init(router);
require('./webchat/callback').init(router);

/*admin*/
require('./admin/login').init(router);
require('./admin/home').init(router);

/*complete*/
module.exports = router;
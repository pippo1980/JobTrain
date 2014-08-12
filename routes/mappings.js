/**
 * Created by pippo on 14-8-11.
 */
var express = require('express');
var router = express.Router();
var logger = require("../logger").get("http-access");
/*access log*/
router.use(function (req, res, next) {
    logger.debug({url: req.url, method: req.method, params: req.params})
    next();
});

/*init the router mappings*/
require('./index').init(router);

/*complete*/
module.exports = router;
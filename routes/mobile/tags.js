/*
 *
 *  * Copyright © 2014 www.myctu.cn.
 *  * All rights reserved.
 *
 */

/**
 * Created by pippo on 14-8-18.
 */

module.exports.init = function (router) {
    router.get("/m/tags", tags);
}

function tags(req, res) {
    res.render('mobile/tags', { title: '包就业' });
}
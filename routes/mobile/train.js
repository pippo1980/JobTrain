/**
 * Created by pippo on 14-8-19.
 */
var Train = require("../../model/Train");

module.exports.init = function (router) {
    router.get("/m/trains", trains);
    router.get("/m/train/synopsis", synopsis);
}

function trains(req, res) {
    var train = new Train();
    train.train_type = req.param("tag");
    train.typeList(function (items) {
        res.render("mobile/trains", {trains: items, train_type: train.train_type});
    });
}

function synopsis(req, res) {
    var train = new Train();
    train.train_type = req.param("type");
    train.price = req.param("price");

    train.getByType(function (success) {
        //console.log(train)
        res.render("mobile/train_synopsis", {train: train});
    });
}
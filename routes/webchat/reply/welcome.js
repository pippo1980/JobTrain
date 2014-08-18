/**
 * Created by pippo on 14-8-18.
 */
var xml2js = require('xml2js');
var logger = require("../../../logger").get(__filename);

var builder = new xml2js.Builder();
module.exports.create = function (from, to) {

    var welcome = {
        'xml': {
            'FromUserName': from,
            'ToUserName': to,
            'CreateTime': new Date().getTime(),
            'MsgType': 'news',
            'ArticleCount': 2,
            'Articles': {
                'item': [
                    {
                        'Title': '感谢您关注包就业',
                        'PicUrl': 'http://baojiuye.inmovation.com/public/webchat/welcome/title.png',
                        'Url': 'http://baojiuye.inmovation.com/webchat/course.search'
                    },
                    {
                        'Title': 'Android工程师培训',
                        'Description': '意向企业:小米\n预计薪资:5000~10000',
                        'PicUrl': 'http://baojiuye.inmovation.com/public/webchat/welcome/android.png',
                        'Url': 'http://baojiuye.inmovation.com/webchat/course.search'
                    }
                ]
            }

        }
    };

    return builder.buildObject(welcome);
}

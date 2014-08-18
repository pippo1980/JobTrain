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
            'ArticleCount': 4,
            'Articles': {
                'item': [
                    {
                        'Title': '欢迎咨询就业直通车',
                        'PicUrl': 'http://baojiuye.inmovation.com/static/webchat/welcome/title.png',
                        'Url': 'http://baojiuye.inmovation.com/webchat/course.search'
                    },
                    {
                        'Title': "Android工程师培训\n\n 意向企业:小米\n 预计薪资:5000~10000",
                        'PicUrl': 'http://baojiuye.inmovation.com/static/webchat/welcome/android.png',
                        'Url': 'http://baojiuye.inmovation.com/webchat/course.search'
                    },
                    {
                        'Title': 'IOS工程师培训\n\n 意向企业:小米\n 预计薪资:5000~10000',
                        'PicUrl': 'http://baojiuye.inmovation.com/static/webchat/welcome/ios.png',
                        'Url': 'http://baojiuye.inmovation.com/webchat/course.search'
                    },{
                        'Title': 'JAVA工程师培训\n\n 意向企业:小米\n 预计薪资:5000~10000',
                        'PicUrl': 'http://baojiuye.inmovation.com/static/webchat/welcome/java.png',
                        'Url': 'http://baojiuye.inmovation.com/webchat/course.search'
                    }
                ]
            }

        }
    };

    return builder.buildObject(welcome);
}

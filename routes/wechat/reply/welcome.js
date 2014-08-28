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
                        'PicUrl': 'http://baojiuye.inmovation.com/static/wechat/welcome/title.png',
                        'Url': 'http://baojiuye.inmovation.com/m/tags'
                    },
                    {
                        'Title': "Android工程师培训\n\n 意向企业:小米\n 预计薪资:5000~10000",
                        'PicUrl': 'http://baojiuye.inmovation.com/static/wechat/welcome/android.png',
                        'Url': 'http://baojiuye.inmovation.com/m/train/detail?id=0598c9ca-f055-42b3-9beb-5c23e6e9f88a'
                    },
                    {
                        'Title': 'IOS工程师培训\n\n 意向企业:小米\n 预计薪资:5000~10000',
                        'PicUrl': 'http://baojiuye.inmovation.com/static/wechat/welcome/ios.png',
                        'Url': 'http://baojiuye.inmovation.com/m/train/detail?id=0598c9ca-f055-42b3-9beb-5c23e6e9f88a'
                    },{
                        'Title': 'JAVA工程师培训\n\n 意向企业:小米\n 预计薪资:5000~10000',
                        'PicUrl': 'http://baojiuye.inmovation.com/static/wechat/welcome/java.png',
                        'Url': 'http://baojiuye.inmovation.com/m/train/detail?id=0598c9ca-f055-42b3-9beb-5c23e6e9f88a'
                    }
                ]
            }

        }
    };

    return builder.buildObject(welcome);
}

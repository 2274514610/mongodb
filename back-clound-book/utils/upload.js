//封装的七牛云上传组件
const qiniu = require('qiniu');    //引入七牛

var accessKey = 'zbv7cH95ZBgbsc4S9QYHEHNCfFBpHeknkbsUf54Z';
var secretKey = '2UAjom2DJ_TVCiGAoPogZ23pbJ4EzQsLPJq0VO4P';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

module.exports = function () {
    var options = {
        scope: 'cloud-back-html',  //你的空间名称
        //ulr 是上传完成的图片地址
        returnBody: '{"key":"$(key)","hash":"$(etag)","url":"q8qdky23t.bkt.clouddn.com/${key}"}',  //返回的内容
        expires: 7200,   //过期时间  两小时
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken = putPolicy.uploadToken(mac);
    return uploadToken
};

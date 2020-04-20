const mongoose = require('mongoose');

const user = new mongoose.Schema({
    avatar: {
        type: String,
        default: 'http://image.yaojunrong.com/zhenxiang.jpg'
    },
    phone: {
        type: Number,
        unique: true   //唯一的
    },
    password: String,  //密码
    nickname: String   //用户名
}, {versionKey: false, timestamps: {createAt: 'createTime', updatedAt: 'updateTime'}});

module.exports = mongoose.model('user', user);   //第一个参数是集合名称  第二个参数是集合骨架
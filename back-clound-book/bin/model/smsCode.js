//用于注册用户的手机号和验证码的集合骨架
const mongoose = require('mongoose');

const smsCode = new mongoose.Schema({
   phone: Number,
   code: String
},{versionKey: false, timestamps: {createdAt: 'createTime',updatedAt: 'updateTime'}});

module.exports = mongoose.model('smsCode',smsCode);   //第一个参是集合名  第二个参数是集合骨架
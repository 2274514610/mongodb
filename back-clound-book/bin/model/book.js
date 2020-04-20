const mongoose = require('mongoose');

const book = new mongoose.Schema({
    title: String,
    img: String,
    author: String,
    looksnum: {
        type: String,
        default: 0
    },
    desc: String,
    type: {
        type: mongoose.SchemaTypes.ObjectId,   //在数据库中,id是这种数据类型
        ref: 'category'   //ref表示数据来源
    },
    index: {
        type: Number,
        default: 1
    }
},{versionKey: false,timestamps: {createAt: 'createTime', updatedAt: 'updateTime'}});

module.exports = mongoose.model('book',book);    //第一个参：集合名   第二个参：集合骨架
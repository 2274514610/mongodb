const mongoose = require('mongoose')

const category = mongoose.Schema({
    title: String,
    icon: String,
    books: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'book'
    }],
    index: {
        type: Number,
        default: 1
    },
    status: {
        type: Number,
        default: 1
    }
},{versionKey:false,timestamps:{createAt: 'createTime', updatedAt: 'updateTime'}});

module.exports = mongoose.model('category',category);   //第一个参：集合名  第二个参：集合骨架
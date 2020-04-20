const mongoose = require('mongoose');

const swiper = new mongoose.Schema({
    book: {
        type: mongoose.Types.ObjectId,
        ref: 'book'
    },
    index: {
        type: Number,
        default: 1
    },
    status: {
        type: Number,
        default: 1
    },
    title: String,
    img: String
},{versionKey: false,timestamps: {createAt: 'createTime',updatedAt: 'updateTime'}});
module.exports = mongoose.model('swiper',swiper);   //第一个参数是集合名 第二个参数是集合骨架

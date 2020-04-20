const swiperModel = require('../model/swiper');
const mongoose = require('mongoose');

//添加轮播图接口
async function addSwiper(req, res, next) {
    try {
        const {title, img, bookId, index = 1} = req.body;
        const swiper = await swiperModel.create({
            title,
            img,
            book: mongoose.Types.ObjectId(bookId),
            index
        });
        res.json({
            code: 200,
            msg: '添加轮播图成功'
        })
    } catch (err) {
        next(err)
    }
}

//获取所有的轮播图
async function allSwiper(req, res, next) {
    try {
        //pn代表页数  size代表每页有几条数据
        let {pn = 1, size = 1} = req.query;
        pn = Number(pn);
        size = Number(size);
        //populate 可以自动替换 document 中的指定字段，替换内容从其他 collection 获取
        //skip 跳过多少条再取   limit限制每次取的数量
        //采用倒叙排列方式   sort({index: -1,_id:-1})  index和_id 这两个的排列顺序有区别 _id的优先级比较高,所有它要放在后面
        let data = await swiperModel
            .find({status: 1})
            .populate({path: 'book'})
            .sort({index: -1,_id: -1})
            .skip((pn - 1) * size)
            .limit(size);
        res.json({
            code: 200,
            data
        })
    } catch (err) {
        next(err)
    }
}

//更新轮播图接口
async function updateSwiper(req, res, next) {
    try {
        const id = req.params.id;
        const {title, bookId, status, index} = req.body;
        const update = await swiperModel.updateOne({
            _id: mongoose.Types.ObjectId(id)
        },{
            title,
            book: mongoose.Types.ObjectId(bookId),
            status,
            index
        })
        res.json({
            code: 200,
            msg: '轮播图更新成功'
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {addSwiper, allSwiper,updateSwiper};
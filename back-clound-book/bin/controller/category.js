const categoryModel = require('../model/category');    //引入书籍分类的集合骨架
const bookModel = require('../model/book');   //引入书籍的集合骨架
const mongoose = require('mongoose');    //引入mongoose将id转为ObjectId格式

//添加分类
async function addCategory(req, res, next) {
    try {
        const {title, icon} = req.body;
        await categoryModel.create({
            title,
            icon
        });
        res.json({
            code: 200,
            msg: '添加分类成功'
        })
    } catch (err) {
        next(err)
    }
}

//删除某个分类
async function removeCategory(req,res,next) {
    try {
        const {id} = req.params;
        await categoryModel.deleteOne({id});
        res.json ({
            code: 200,
            msg: '删除成功'
        })
    } catch(err) {
        next(err)
    }
}

//获取分类
async function getCategory(req, res, next) {
    try {
        //在category这个集合里查找分类,并排序(倒着排)
       const data = await categoryModel.find().sort({_id:-1});
        res.json({
            code: 200,
            data
        })
    } catch (err) {
        next(err)
    }
};

//将某本书添加到某个分类中
async function addBookToCategory(req,res,next) {
    try {
       const {categoryId,bookId} = req.body;
       const category = await categoryModel.findOne({
           _id: mongoose.Types.ObjectId(categoryId)
       });
       const book = await bookModel.findOne({
           _id: mongoose.Types.ObjectId(bookId)
       });
       if(book) {
           await category.books.push(book._id);
           await category.save();    //添加完成后，进行手动保存
           res.json({
               code: 200,
               msg: '分类添加书籍成功'
           })
       }else {
           res.json ({
               code: 400,
               msg: '分类添加书籍失败,您要添加的书籍不存在'
           })
       }

    }catch (err) {
        next(err)
    }
};

//获取添加到分类集合中的书的详情
async function getBookByCategory(req,res,next) {
    try {
        //populate 可以自动替换 document 中的指定字段，替换内容从其他 collection 获取
        const data = await categoryModel.find().sort({_id: -1}).populate('books');
        res.json({
            code: 200,
            data
        })
    }catch(err) {
        next(err)
    }
}

module.exports = {
    addCategory,
    getCategory,
    addBookToCategory,
    getBookByCategory,
    removeCategory
};
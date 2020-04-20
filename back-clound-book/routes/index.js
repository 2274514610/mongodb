var express = require('express');
var router = express.Router();
const bookRouter = require('./book');
const categoryRouter = require('./category');
const titleRouter = require('./title');
const articleRouter = require('./article');
const userRouter = require('./user');
const smsCodeRouter = require('./smsCode');
const uploadRouter = require('./upload');
const swiperRouter = require('./swiper');
const collectionRouter = require('./collection');

router.use('/book',bookRouter);   //关于书籍的路由配置
router.use('/category',categoryRouter);   //关于书籍分类的路由配置
router.use('/title',titleRouter);  //关于书籍目录的路由配置
router.use('/article',articleRouter);   //关于文章详情的路由配置
router.use('/user',userRouter);   //关于用户信息的路由配置
router.use('/smsCode',smsCodeRouter);  //关于发送验证码的路由配置
router.use('/uploadToken',uploadRouter);  //关于上传图片的路由配置
router.use('/swiper',swiperRouter);   //关于轮播图的路由配置
router.use('/collection',collectionRouter);   //关于收藏的路由配置

module.exports = router;

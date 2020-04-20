const express = require('express');
const router = express.Router();
const {getBook,getBookArticle,getAllBook,removeBook} = require('../bin/controller/book');

router.post('/',getBook);
router.get('/allBook',getAllBook);  //这个路由要放在动态路由前面,不然拿不到书籍
router.delete('/:id',removeBook);
router.get('/:id',getBookArticle);   //动态路由


module.exports = router;
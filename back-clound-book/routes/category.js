const express = require('express');
const router = express.Router();
const {addCategory,getCategory,addBookToCategory,getBookByCategory,removeCategory} = require('../bin/controller/category')

router.post('/',addCategory);
router.get('/',getCategory);
router.post('/book',addBookToCategory);
router.get('/book',getBookByCategory);
router.delete('/:id',removeCategory);

module.exports = router;
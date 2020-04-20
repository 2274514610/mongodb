const express = require('express');
const router = express.Router();
const {addCollection,getCollection,removeCollection} = require('../bin/controller/collection');
const {auth} = require('../bin/controller/auth');  //判断是否登录

router.post('/',auth,addCollection);
router.get('/',auth,getCollection);
router.patch('/:id',auth,removeCollection);

module.exports = router;
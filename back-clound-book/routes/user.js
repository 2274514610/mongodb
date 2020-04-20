const express = require('express');
const router = express.Router();
const {register,login,getUser} = require('../bin/controller/user');
const {auth} = require('../bin/controller/auth');   //引入鉴权函数

router.post('/register',register);
router.post('/login',login);
router.get('/',auth,getUser);   //鉴权成功,解析token数据,获取用户id后,才会执行获取用户操作

module.exports = router;
const express = require('express');
const router = express.Router();
const {upload} = require('../bin/controller/upload');
const {auth} = require('../bin/controller/auth');   //引入鉴权函数

router.get('/',auth,upload);   //只有用户登录了，才能上传文件

module.exports = router;
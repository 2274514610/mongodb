const express = require('express');
const router = express.Router();
const {getArticle} = require('../bin/controller/article');

router.get('/:id',getArticle);

module.exports = router;
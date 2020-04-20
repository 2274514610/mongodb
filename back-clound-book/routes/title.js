const express = require('express');
const router = express.Router();
const {getTitle} = require('../bin/controller/title');

router.get('/',getTitle);

module.exports = router
const express = require('express');
const router = express.Router();
const {addSwiper,allSwiper,updateSwiper} = require('../bin/controller/swiper');

router.post('/',addSwiper);
router.get('/',allSwiper);
router.patch('/:id',updateSwiper);

module.exports = router;

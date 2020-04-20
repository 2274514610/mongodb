const {Router} = require('express');
const router = Router();
const {sendCode} = require('../bin/controller/smsCode');

router.post('/',sendCode);

module.exports = router;
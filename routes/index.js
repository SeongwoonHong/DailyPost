const express = require('express');
const router = express.Router();
const account = require('./account');
const memo = require('./memo');

router.use('/account', account);
router.use('/memo', memo);
module.exports = router;

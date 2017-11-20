const express = require('express');
const router = express.Router();

router.post('/signup', (req, res) => {
  return res.json({'msg': 'cool'});
});

module.exports = router;

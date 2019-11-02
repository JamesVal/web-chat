const express = require('express');
const router = express.Router();
const utils = require('../utils');

/* GET api listing. */
router.get('/', (req, res) => {
  res.status(200).json({status: "okay"});
});

/* POST api listing. */
router.post('/', (req, res) => {
  res.status(200).json({result: 200});
});

router.post('/login', (req, res) => {
  console.log("Login Attempt:", req.body.username);
  res.status(200).json({result: "success", token: utils.getUid(256)});
});

module.exports = router;
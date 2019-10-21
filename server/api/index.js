const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.status(200).json({status: "okay"});
});

/* POST api listing. */
router.post('/', (req, res) => {
  res.status(200).json({result: 200});
});

module.exports = router;
const express = require('express');

const rankingController = require('../controllers/ranking_controller');

const router = express.Router();

router.get('/topWriters', rankingController.topWriters);
router.get('/topTags', rankingController.topTags);


module.exports = router;
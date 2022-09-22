const express = require('express');

const recommentContorller = require('../controllers/recomment_contorller');

const router = express.Router();

router.get('/:unique_id', recommentContorller.getRecommendCount);
router.post('/:unique_id', recommentContorller.recommendAdd);
router.delete('/:unique_id', recommentContorller.recommendCancel);

module.exports = router;
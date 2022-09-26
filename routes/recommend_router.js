const express = require('express');
const validateToken = require("../middlewares/validate_token");
const recommentContorller = require('../controllers/recomment_contorller');

const router = express.Router();

router.get('/:uid', recommentContorller.getRecommendCount);
router.post('/:uid', validateToken.validateToken, recommentContorller.recommendAdd);
router.delete('/:uid', validateToken.validateToken, recommentContorller.recommendCancel);

module.exports = router;
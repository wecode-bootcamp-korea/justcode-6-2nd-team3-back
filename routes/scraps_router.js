const express = require('express');

const scrapsController = require('../controllers/scraps_controller');

const router = express.Router();

router.post('/:post_id', scrapsController.addPostScraps);
router.delete('/:post_id', scrapsController.deletePostScraps);
router.get('', scrapsController.selectPostScraps);

module.exports = router;
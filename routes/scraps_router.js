const express = require('express');

const scrapsController = require('../controllers/scraps_controller');

const router = express.Router();

router.post('/:user_id/:post_id', scrapsController.addPostScraps);
router.delete('/:user_id/:post_id', scrapsController.deletePostScraps);
router.get('/:user_id', scrapsController.selectPostScraps);

module.exports = router;
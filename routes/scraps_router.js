const express = require('express');
const validateToken = require("../middlewares/validate_token");
const scrapsController = require('../controllers/scraps_controller');

const router = express.Router();

router.post('/:post_id', validateToken.validateToken, scrapsController.addPostScraps);
router.delete('/:post_id', validateToken.validateToken, scrapsController.deletePostScraps);
router.get('/:user_id', scrapsController.selectPostScraps);

module.exports = router;
const express = require('express');
const validateToken = require("../middlewares/validate_token");
const postController = require('../controllers/post_controller');

const router = express.Router();

router.post('', validateToken.validateToken, postController.insertPost);
router.get('/:post_id', postController.selectPostOne);
router.patch('/:post_id', validateToken.validateToken, postController.updatePost);
router.delete('/:post_id', validateToken.validateToken, postController.deletePost);
router.get('', postController.selectPostList)

module.exports = router;
const express = require('express');

const postController = require('../controllers/post_controller');

const router = express.Router();

router.post('', postController.insertPost);
router.get('/:post_id', postController.selectPostOne);
router.patch('/:post_id', postController.updatePost);
router.delete('/:post_id', postController.deletePost);
router.get('', postController.selectPostList)

module.exports = router;
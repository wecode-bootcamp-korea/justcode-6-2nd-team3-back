const express = require("express");
const commentController = require("../controllers/comment_controller");
const validateToken = require("../middlewares/validate_token");

const router = express.Router();

router.get("/", commentController.postComment);
router.post("/",validateToken.validateToken, commentController.commentAdd);
router.patch("/",validateToken.validateToken, commentController.commentUpdate);
router.delete("/",validateToken.validateToken, commentController.commentDelete);



module.exports = router;
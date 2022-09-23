const express = require("express");
const userRouter = require("./user_router");
const postRouter = require('./post_router');
const menuRouter = require('./menu_rotuer');
const profileRouter = require("./user_profile_router");
const commentRouter = require("./comment_router");
const rankingRouter = require("./ranking_router");
const tagController = require("../controllers/tag_controller");
const scrapsController = require('./scraps_router');
const recommentContorller = require("./recommend_router");

const router = express.Router();

router.use("/users", userRouter);
router.use('/posts', postRouter);
router.use('/menus', menuRouter);
router.use("/profile", profileRouter);
router.use("/comment", commentRouter);
router.use("/ranking", rankingRouter);
router.get("/tags", tagController.tagSearch);
router.use("/scraps", scrapsController);
router.use("/recommend", recommentContorller);

module.exports = router;

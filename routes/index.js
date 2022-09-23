const express = require("express");
const userRouter = require("./user_router");
const postRouter = require('./post_router');
const menuRouter = require('./menu_rotuer');
const profileRouter = require("./user_profile_router");
const tagController = require("../controllers/tag_controller");
const scrapsController = require('./scraps_router');

const router = express.Router();

router.use("/users", userRouter);
router.use('/posts', postRouter);
router.use('/menus', menuRouter);
router.use("/profile", profileRouter);
router.get("/tags", tagController.tagSearch);
router.use("/scraps", scrapsController);

module.exports = router;

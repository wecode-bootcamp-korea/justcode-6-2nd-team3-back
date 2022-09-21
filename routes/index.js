const express = require("express");
const userRouter = require("./user_router");
const postRouter = require('./post_router');
const menuRouter = require('./menu_rotuer');

const router = express.Router();

router.use("/users", userRouter);
router.use('/posts', postRouter);
router.use('/menus', menuRouter);

module.exports = router;

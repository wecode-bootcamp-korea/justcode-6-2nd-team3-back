const express = require("express");
const userRouter = require("./user_router");
const postRouter = require('./post_router');

const router = express.Router();

router.use("/users", userRouter);
router.use('/posts', postRouter);

module.exports = router;

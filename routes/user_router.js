const express = require("express");
const userController = require("../controllers/user_controller");

const router = express.Router();

router.post("/login", userController.loginUser);

module.exports = router;
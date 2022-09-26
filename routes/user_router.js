const express = require("express");
const userController = require("../controllers/user_controller");
const validateToken = require("../middlewares/validate_token");

const router = express.Router();

router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/me", validateToken.validateToken, userController.getme);
router.patch("/", validateToken.validateToken, userController.changePassword);
router.delete("/", validateToken.validateToken, userController.userDoNotUse);



module.exports = router;
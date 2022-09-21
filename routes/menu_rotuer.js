const express = require("express");
const menuController = require("../controllers/menu_controller");

const router = express.Router();

router.get("", menuController.selectMainCategory);
router.get("/:main_category_id", menuController.selectSubCategory);

module.exports = router;
const express = require("express");
const userController = require("../controllers/user_controller");
const validateToken = require("../middlewares/validate_token");
const multer = require('multer');
const storage = multer.diskStorage({
    destination : (req, file, callback) => {
        if(!file){
            next();
        }
        callback(null, "uploads/images/")
    },
    filename : (req, file, callback)=>{
        const duplicatePrevention =  Date.now()
        callback(null, duplicatePrevention+file.originalname)
    }
}
)
const uploader = multer({storage:storage})

const router = express.Router();

router.post("/signup", uploader.single('filename'), userController.createUser);
router.post("/login", userController.loginUser);
router.patch("/", validateToken.validateToken, userController.changePassword);
router.delete("/", validateToken.validateToken, userController.userDoNotUse);



module.exports = router;
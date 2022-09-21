const express = require("express");
const userProfileController = require("../controllers/user_profile_controller");
const validateToken = require("../middlewares/validate_token");
const multer = require('multer');
const storage = multer.diskStorage({
    destination : (req, file, callback) => {
        if(!file){
            next();
        }
        callback(null, "uploads/")
    },
    filename : (req, file, callback)=>{
        const duplicatePrevention =  Date.now()
        callback(null, duplicatePrevention+file.originalname)
    }
}
)
const uploader = multer({storage:storage})

const router = express.Router();

router.get("/", validateToken.validateToken, userProfileController.userProfile);
router.patch("/", validateToken.validateToken,  uploader.single('filename'), userProfileController.userProfileUpdate);



module.exports = router;
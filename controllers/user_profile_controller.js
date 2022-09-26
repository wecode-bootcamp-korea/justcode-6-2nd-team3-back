const userProfileService = require("../services/user_profile_service");
const { validatorValues } = require("../common/validator_value");

// 사용자 프로필 불러오기
const userProfile = async (req, res) => {
    const {unique_id} =  req.foundUser; 
    if(!unique_id){
        res.status(400).json({ message: `user id 이/가 없습니다` })
        return;
    }
    
    try{
        const result = await userProfileService.userProfile(unique_id);
        res.status(200).json({user : result , message: "success_getUserProfile" })
    }catch(err){
        console.log(err);
        res.status(err.statusCode || 500).json({ message: err.message });
    }
    
}

// 사용자 프로필 수정 
const userProfileUpdate = async (req, res) => {
    const {user_name, nickname, tags} = req.body
    const {unique_id} =  req.foundUser;
    if(!unique_id){
        res.status(400).json({ message: `user id 이/가 없습니다` })
        return;
    }
    
    const haskey = {user_name:false, nickname:false, tags:false}; 
    let err = validatorValues(req.body, haskey);
    if(err) {
        return res.status(400).json({ message: err });
    }

    try{
        const result = await userProfileService.userProfileUpdate( unique_id, user_name, nickname, tags);
        res.status(200).json({user : result, message: "success_userProfileUpdate" })
    }catch(err){
        console.log(err);
        res.status(err.statusCode || 500).json({ message: err.message });
    }

} 

// 사용자 프로필 이미지 수정 
const userProfileImageUpdate = async (req, res) => {
    const {unique_id} =  req.foundUser;
    if(!unique_id){
        res.status(400).json({ message: `user id 이/가 없습니다` })
        return;
    }

    try{
        console.log(req.file)
        if(req.file){ 
            let image = "/"+req.file.filename;
            await userProfileService.userProfileImageUpdate(image, unique_id);
        }else{
            const image = ""
            await userProfileService.userProfileImageUpdate(image, unique_id);
        }
        const result = await userProfileService.userProfile(unique_id);
        res.status(200).json({user : result, message: "success_userProfileImageUpdate" })
    }catch(err){
        console.log(err);
        res.status(err.statusCode || 500).json({message:err.message})
    }

} 


module.exports = {userProfile, userProfileUpdate, userProfileImageUpdate };

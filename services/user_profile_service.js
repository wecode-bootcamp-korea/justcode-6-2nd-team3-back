const userProfileDao = require("../models/user_profile_dao");
const userDao = require("../models/user_dao");
const fs = require("fs");

// 사용자 프로필 데이터 가져오기
const userProfile = async (user_id) => {
  const user = await userProfileDao.getUserProfile(user_id);

  if(!user){
      const error = new Error ("USER_UNDEFINED")
      error.statusCode = 400
      throw error
  }

  try{
    // const userTags  = JSON.parse(user.tags)
    // user.tags = userTags
    if(user.profile_image){
      const url = "http://localhost:8000/file"+ user.profile_image
      user.profile_image = url
    }  
  }catch(err){
    console.log(err)
  }
  
  return user
}

// 사용자 프로필 수정
const userProfileUpdate = async (id, user_name, nickname, tags)=>{
  const resultByNickname = await userDao.getUserByNickname(nickname);
  // if(resultByNickname){
  //   const error = new Error({ message: "USER_NICKNAME_DUPLICATE"}.message);
  //   error.statusCode = 400;
  //   throw error;
  // }

  try{
    await userProfileDao.userUpdate(id, user_name, nickname);

    await userProfileDao.userTagsDelete(id);
    if(tags.length>0){
      for(let i = 0; i<tags.length; i++){
        if(!tags[i].tag_id){
          await userProfileDao.createTag(tags[i].tag_name);
          const tagId = await userProfileDao.getTagId(tags[i].tag_name);
          tags[i].tag_id = tagId.unique_id;
        }
        await userProfileDao.userTagInsert(id, tags[i].tag_id);
      }
    }
    const user = await userProfileDao.getUserProfile(id);
    // const userTags  = JSON.parse(user.tags)
    // user.tags = userTags
    if(user.profile_image){
      const url = "http://localhost:8000/file"+ user.profile_image
      user.profile_image = url
    }  
    return user
  }catch(err){
    console.log(err)
  }
}

// 사용자 프로필 이미지 수정
const userProfileImageUpdate = async (image, id)=>{
  try{
    const user = await userProfileDao.getUserProfileImage(id);
    if(user.profile_image){
      if (fs.existsSync("./uploads" + user.profile_image)) {
        try {
          fs.unlinkSync("./uploads" + user.profile_image);
        } catch (error) {
          console.log(error);
        }
      }
    }
    await userProfileDao.profileImageUpdate(image, id);
    const userResult = await userProfileDao.getUserProfile(id);
    // const userTags  = JSON.parse(userResult.tags)
    // userResult.tags = userTags
    if(userResult.profile_image){
      const url = "http://localhost:8000/file"+ userResult.profile_image
      userResult.profile_image = url
    }  
    return userResult
  }catch(err){
    console.log(err)
  }
}

const getUserProfileInfo = async (user_id) => {
  return await userProfileDao.getUserProfileInfo(user_id);
}

module.exports = { 
  userProfile
  , userProfileImageUpdate
  , userProfileUpdate
  , getUserProfileInfo
};

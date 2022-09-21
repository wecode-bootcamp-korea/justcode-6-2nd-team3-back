const userProfileDao = require("../models/user_profile_dao");
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
    const userTags  = JSON.parse(user.tags)
    user.tags = userTags
    if(user.profile_image){
      const url = "http://localhost:8000/file"+ user.profile_image
      user.profile_image = url
    }  
  }catch(err){
    console.log(err)
  }
  
  return user
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
  }catch(err){
    console.log(err)
  }
}
// 사용자 프로필 수정
const userProfileUpdate = async (id, user_name, nickname, tags)=>{
  try{
    await userProfileDao.userUpdate(id, user_name, nickname);
    const tagArray  = JSON.parse(tags);

    await userProfileDao.userTagsDelete(id);
    if(tagArray.length>0){
      for(let i = 0; i<tagArray.length; i++){
        if(!tagArray[i].tag_id){
          await userProfileDao.createTag(tagArray[i].tag_name);
          const tagId = await userProfileDao.getTagId(tagArray[i].tag_name);
          tagArray[i].tag_id = tagId.unique_id;
        }
        await userProfileDao.userTagInsert(id, tagArray[i].tag_id);
      }
    }
    const user = await userProfileDao.getUserProfile(id);
    const userTags  = JSON.parse(user.tags)
    user.tags = userTags
    if(user.profile_image){
      const url = "http://localhost:8000/file"+ user.profile_image
      user.profile_image = url
    }  
    return user
  }catch(err){
    console.log(err)
  }
}

module.exports = { 
  userProfile
  , userProfileImageUpdate
  , userProfileUpdate
};

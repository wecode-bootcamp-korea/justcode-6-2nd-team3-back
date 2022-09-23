const jwt = require('jsonwebtoken');

const postDao = require('../models/post_dao');
const postTagsDao = require('../models/post_tags_dao');
const menuDao = require('../models/menu_dao');
const scoreDao = require('../models/user_scores_dao');
const userProfileDao = require("../models/user_profile_dao");

// 게시글 작성
const insertPost = async params => { 

  const sub_category_name = await menuDao.selectSubCategoryName(params.sub_category_id);
  let post_id = '';
  if(sub_category_name[0].sub_category_name === '구인'){   // 구인 게시판 게시글 입력
    // 협의 or 급여 설정 값 어떻게 넘겨줄지 논의 필요.

    await postDao.insertJobsPost(params, getUserUniqueId(params.token));
  } else {  // 일반 게시판 게시글 입력
    post_id = await postDao.insertPost(params, getUserUniqueId(params.token));
  }

   // const tagArray  = JSON.parse(params.tags);
   const tagArray  = params.tags;
   if(tagArray.length>0){
     for(let i = 0; i<tagArray.length; i++){
       if(!tagArray[i].tag_id){
         await userProfileDao.createTag(tagArray[i].tag_name);
         const tagId = await userProfileDao.getTagId(tagArray[i].tag_name);
         tagArray[i].tag_id = tagId.unique_id;
       }
       await postTagsDao.insertPostTags(tagArray[i].tag_id, post_id);  
     }
   }

  await scoreDao.addUserScore(params.user_id);
}

// 게시글 세부페이지 읽기
const selectPostOne = async (post_id) => {
  postDao.postViewsCount(post_id);
  const post = await postDao.selectPostOne(post_id);

  return post;
}

// 게시글 수정
const updatePost = async params => {

  const sub_category_name = await menuDao.selectSubCategoryName(params.sub_category_id);

  if(sub_category_name[0].sub_category_name === '구인'){   // 구인 게시판 게시글 수정
    await postDao.updateJobsPost(params, getUserUniqueId(params.token));
  } 
  else {
    await postDao.updatePost(params, getUserUniqueId(params.token));

    
  }

  await postTagsDao.deletePostTags(params.post_id);
  // const tagArray  = JSON.parse(params.tags);
  const tagArray  = params.tags;
  if(tagArray.length>0){
    for(let i = 0; i<tagArray.length; i++){
      if(!tagArray[i].tag_id){
        await userProfileDao.createTag(tagArray[i].tag_name);
        const tagId = await userProfileDao.getTagId(tagArray[i].tag_name);
        tagArray[i].tag_id = tagId.unique_id;
      }
      await postTagsDao.insertPostTags(tagArray[i].tag_id, params.post_id);
    }
  }
}

// 게시글 삭제
const deletePost = async params => {
  await postTagsDao.deletePostTags(params.post_id);
  await postDao.deletePost(getUserUniqueId(params.token), params.post_id);
}

// 게시글 목록 읽기
const selectPostList = async params => {
  let user_id = "";
  if(params.token) {
    user_id = getUserUniqueId(params.token);
  }

  let sub_category_name = ['일반'];
  if(params.sub_category_id) {
    sub_category_name = await menuDao.selectSubCategoryName(params.sub_category_id);
  }
  
  let posts = '';

  if(sub_category_name[0].sub_category_name === '구인'){   // 구인 게시판 게시글 목록 조회 수정 중
    posts = await postDao.selectJobsPostList(params);
  } else {
    posts = await postDao.selectPostList(params, user_id);
  }
  return posts;
}

// token 가지고와서 사용자 아이디 복호화 하는 것. 리팩토링 시에 따로 뺄 예정
const getUserUniqueId = (token) => {
  const user_id = jwt.verify(token, 'server_made_secret_key').userId;

  return user_id;
}

module.exports = { insertPost, selectPostOne, updatePost, deletePost, selectPostList }
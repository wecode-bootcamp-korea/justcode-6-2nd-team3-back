const jwt = require('jsonwebtoken');

const postDao = require('../models/post_dao');
const postTagsDao = require('../models/post_tags_dao');
const menuDao = require('../models/menu_dao');
const scoreDao = require('../models/user_scores_dao');
const userDao = require('../models/user_dao');
const userProfileDao = require("../models/user_profile_dao");


// 게시글 작성
const insertPost = async (params, user_id) => { 
  
  let user_type = await userDao.getme(user_id);

  const sub_category_name = await menuDao.selectSubCategoryName(params.sub_category_id);
  let post_id = '';
  let err_msg = '';
  if(sub_category_name[0].sub_category_name === '구인' && user_type[0].user_type == 2){   // 구인 게시판 게시글 입력
    post_id = await postDao.insertJobsPost(params, user_id);
  } else if (sub_category_name[0].sub_category_name === '구인' && user_type[0].user_type != 2){
    err_msg = '기업회원만 작성 가능합니다.'
  }

  if(sub_category_name[0].sub_category_name === '공지사항' && user_type[0].user_type == 3) {
    post_id = await postDao.insertPost(params, user_id);
  } else if (sub_category_name[0].sub_category_name === '공지사항' && user_type[0].user_type != 3){
    err_msg = '관리자만 작성 가능합니다.'
  }

  if(sub_category_name[0].sub_category_name !== '공지사항' || sub_category_name[0].sub_category_name !== '구인') {
    post_id = await postDao.insertPost(params, user_id);
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

  await scoreDao.addUserScore(user_id);

  return {post_id, err_msg};
}

// 게시글 세부페이지 읽기
const selectPostOne = async (post_id) => {
  postDao.postViewsCount(post_id);
  const post = await postDao.selectPostOne(post_id);

  for(let i = 0; i<post.length; i++){
    post[i].profile_image = "http://localhost:8000/file"+ post[i].profile_image;
    post[i].Business_registration_image = "http://localhost:8000/file"+ post[i].Business_registration_image;
  }

  return post;
}

// 게시글 수정
const updatePost = async (params, user_id) => {

  const sub_category_name = await menuDao.selectSubCategoryName(params.sub_category_id);

  if(sub_category_name[0].sub_category_name === '구인'){   // 구인 게시판 게시글 수정
    await postDao.updateJobsPost(params, user_id);
  } 
  else {
    await postDao.updatePost(params, user_id);
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
const deletePost = async (post_id, user_id) => {
  await postTagsDao.deletePostTags(post_id);
  await postDao.deletePost(user_id, post_id);
}

// 게시글 목록 읽기
const selectPostList = async params => {

  let corsur = '';
  let page_count = '';
  
  let user_id = "";
  if(params.authorization ) {
    user_id = jwt.verify(params.authorization, 'server_made_secret_key').userId;
  }

  let sub_category_name = ['일반'];
  if(params.sub_category_id) {
    sub_category_name = await menuDao.selectSubCategoryName(params.sub_category_id);
  }
  
  let posts = '';

  if(sub_category_name[0].sub_category_name === '구인'){   
    console.log('구인 ~~~ ');
    page_count = await postDao.getJobsPostCount(params);
    
    if(params.page) {
      if(params.page != 1) {
        corsur = page_count[0].post_count - ((params.page-1) * params.limit) + 1;
      } 
    }

    posts = await postDao.selectJobsPostList(params, corsur);
  } else {
    console.log('QNA~~~ ');
    page_count = await postDao.getPostCount(params);

    if(params.page) {
      if(params.page != 1) {
        corsur = page_count[0].post_count - ((params.page-1) * params.limit) + 1;
      } 
    }
    
    posts = await postDao.selectPostList(params, user_id, corsur);
  }

  for(let i = 0; i<posts.length; i++){
    posts[i].profile_image = "http://localhost:8000/file"+ posts[i].profile_image;
    posts[i].Business_registration_image = "http://localhost:8000/file"+ posts[i].Business_registration_image;
  }

  return {posts, page_count};
}

const getEvnetPostList = async () => {
  return await postDao.getEvnetPostList();
}

module.exports = { insertPost, selectPostOne, updatePost, deletePost, selectPostList, getEvnetPostList }
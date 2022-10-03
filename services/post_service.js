const jwt = require('jsonwebtoken');

const postDao = require('../models/post_dao');
const postTagsDao = require('../models/post_tags_dao');
const scrapsDao = require('../models/scraps_dao');
const recommendDao = require('../models/recommend_dao');
const commentDao = require('../models/comment_dao');
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

  if(sub_category_name[0].sub_category_name != '구인' && sub_category_name[0].sub_category_name != '공지사항') {
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
  return post;
}

// 게시글 수정
const updatePost = async (params, user_id, post_id) => {

  const sub_category_name = await menuDao.selectSubCategoryName(params.sub_category_id);

  const user_check = await postDao.checkPost(post_id);
  if(user_id != user_check[0].user_id) {
    const error = new Error({ message: "게시글 작성자가 아닙니다."}.message);
        error.statusCode = 400;
        throw error;
  }

  if(sub_category_name[0].sub_category_name === '구인'){   // 구인 게시판 게시글 수정
    await postDao.updateJobsPost(params, user_id, post_id);
  } 
  else {
    await postDao.updatePost(params, user_id, post_id);
  }

  await postTagsDao.deletePostTags(post_id);
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
const deletePost = async (user_id, post_id) => {

  const user_check = await postDao.checkPost(post_id);
  if(user_id != user_check[0].user_id) {
    const error = new Error({ message: "게시글 작성자가 아닙니다."}.message);
        error.statusCode = 400;
        throw error;
  }
 
  await postTagsDao.deletePostTags(post_id);
  await scrapsDao.deletePostScraps(post_id, user_id);
  await recommendDao.recommendCancel(user_id, post_id, 'post_recommend', 'post_id', '')
  await commentDao.commentAllDelete(post_id);
  
  await postDao.deletePost(user_id, post_id);

  const check = await postDao.checkPost(post_id);
  if(check.length == 1) {
    const error = new Error({ message: "post delete fail"}.message);
        error.statusCode = 400;
        throw error;
  }
}

// 게시글 목록 읽기
const selectPostList = async params => {

  let corsur = '';
  let page_count = '';

  let sub_category_name = ['일반'];
  if(params.sub_category_id) {
    sub_category_name = await menuDao.selectSubCategoryName(params.sub_category_id);
  }
  
  let posts = '';

  if(sub_category_name[0].sub_category_name === '구인'){   
    page_count = await postDao.getJobsPostCount(params);
    
    if(params.page) {
      if(params.page != 1) {
        corsur = page_count[0].post_count - ((params.page-1) * params.limit) + 1;
      } 
    }

    posts = await postDao.selectJobsPostList(params, corsur);
  } else {
    page_count = await postDao.getPostCount(params);

    if(params.page) {
      if(params.page != 1) {
        corsur = page_count[0].post_count - ((params.page-1) * params.limit) + 1;
      } 
    }
    
    posts = await postDao.selectPostList(params, corsur);
  }
  return {posts, page_count};
}

const getEvnetPostList = async () => {
  const evnetPostList = await postDao.getEvnetPostList();

  return evnetPostList;
}

module.exports = { insertPost, selectPostOne, updatePost, deletePost, selectPostList, getEvnetPostList }
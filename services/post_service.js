const postDao = require('../models/post_dao');
const postTagsDao = require('../models/post_tags_dao');
const menuDao = require('../models/menu_dao');
const scoreDao = require('../models/user_scores_dao');

// 게시글 작성
const insertPost = async params => { 

  const sub_category_name = await menuDao.selectSubCategoryName(params.sub_category_id);
  
  if(sub_category_name[0].sub_category_name === '구인'){   // 구인 게시판 게시글 입력
    // 협의 or 급여 설정 값 어떻게 넘겨줄지 논의 필요.

    await postDao.insertJobsPost(params);
  } else {  // 일반 게시판 게시글 입력
    const post_id = await postDao.insertPost(params);

    const tags = params.tags.split(',');
    for(let i=0; i<tags.length; i++) {
      await postTagsDao.insertPostTags(tags[i], post_id);  
    }
  }

  await scoreDao.addUserScore(params.user_id);
}

// 게시글 세부페이지 읽기
const selectPostOne = async (post_id) => {
  const post = await postDao.selectPostOne(post_id);

  return post;
}

// 게시글 수정
const updatePost = async params => {

  const sub_category_name = await menuDao.selectSubCategoryName(params.sub_category_id);

  if(sub_category_name[0].sub_category_name === '구인'){   // 구인 게시판 게시글 수정
    await postDao.updateJobsPost(params);
  } 
  else {
    await postDao.updatePost(params);

    await postTagsDao.deletePostTags(params.post_id);

    const tags = params.tags.split(',');
      for(let i=0; i<tags.length; i++) {
      await postTagsDao.insertPostTags(tags[i], params.post_id);  
    }
  }
}

// 게시글 삭제
const deletePost = async (user_id, post_id) => {
  await postTagsDao.deletePostTags(post_id);
  await postDao.deletePost(user_id, post_id);
}

// 게시글 목록 읽기
const selectPostList = async params => {
  const posts = await postDao.selectPostList(params);

  return posts;
}

module.exports = { insertPost, selectPostOne, updatePost, deletePost, selectPostList }
const postDao = require('../models/post_dao');
const postTagsDao = require('../models/post_tags_dao');

// 게시글 작성
const insertPost = async params => { 
  const post_id = await postDao.insertPost(params);

  const tags = params.tags.split(',');
  for(let i=0; i<tags.length; i++) {
    await postTagsDao.insertPostTags(tags[i], post_id);  
  }
  
}

// 게시글 세부페이지 읽기
const selectPostOne = async (post_id) => {
  const post = await postDao.selectPostOne(post_id);

  return post;
}

// 게시글 수정
const updatePost = async params => {
  await postDao.updatePost(params);

  await postTagsDao.deletePostTags(params.post_id);

  const tags = params.tags.split(',');
  for(let i=0; i<tags.length; i++) {
    await postTagsDao.insertPostTags(tags[i], params.post_id);  
  }
}

// 게시글 삭제
const deletePost = async (user_id, post_id) => {
  await postTagsDao.deletePostTags(post_id);
  await postDao.deletePost(user_id, post_id);
}

module.exports = { insertPost, selectPostOne, updatePost, deletePost }
const postService = require('../services/post_service');

// 게시글 작성
const insertPost = async (req, res) => {
  // user_id는 토큰으로 받아오는 것으로 수정할 예정
  const { user_id, main_category_id, sub_category_id, title, content, tags } = req.body;
  
  try {
    const params = {user_id, main_category_id, sub_category_id, title, content, tags};
    
    await postService.insertPost(params);

    return res.status(201).json({ message: 'post create succes' });
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
};

// 게시글 세부페이지 읽기
const selectPostOne = async (req, res) => {
  const { post_id } = req.params;
  try {
    const post = await postService.selectPostOne(post_id);

    return res.status(200).json({ post });
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
}

// 게시글 수정
const updatePost = async (req, res) => {
  // user_id는 토큰으로 받아오는 것으로 수정할 예정
  const { user_id, post_id } = req.params;
  const { sub_category_id, title, content, tags } = req.body;

  try{
    const params = {user_id, post_id, sub_category_id, title, content, tags};
    await postService.updatePost(params);

    return res.status(200).json({ message: 'post update succes' });
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
}

// 게시글 삭제
const deletePost = async (req, res) => {
  // user_id는 토큰으로 받아오는 것으로 수정할 예정
  const { user_id, post_id } = req.params;

  try{
    await postService.deletePost(user_id, post_id);

    return res.status(200).json({ message: 'post delete succes' });
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
}

module.exports = { insertPost, selectPostOne, updatePost, deletePost }
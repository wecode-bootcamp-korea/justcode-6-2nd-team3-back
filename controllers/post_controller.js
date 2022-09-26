const postService = require('../services/post_service');
const { validatorValues } = require("../middlewares/validator_value");

// 게시글 작성
const insertPost = async (req, res) => {
  const { token } = req.headers;
  const { main_category_id, sub_category_id, title, content, tags, 
    position, career, region, contract_type, pay, manager_name, manager_tel, manager_email } = req.body;

  if (errors) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const params = {token, main_category_id, sub_category_id, title, content, tags,
      position, career, region, contract_type, pay, manager_name, manager_tel, manager_email};
    
    // await postService.insertPost(params);

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
  const { token } = req.headers;
  const { post_id } = req.params;
  const { sub_category_id, title, content, tags,
    position, career, region, contract_type, pay, manager_name, manager_tel, manager_email } = req.body;

  try{
    const params = {token, post_id, sub_category_id, title, content, tags,
      position, career, region, contract_type, pay, manager_name, manager_tel, manager_email};
    await postService.updatePost(params);

    return res.status(200).json({ message: 'post update succes' });
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
}

// 게시글 삭제
const deletePost = async (req, res) => {
  const { token } = req.headers;
  const { post_id } = req.params;

  try{
    const params = { token, post_id };
    await postService.deletePost(params);

    return res.status(200).json({ message: 'post delete succes' });
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
}


// 게시글 목록 읽기
const selectPostList = async (req, res) => {
  const { token } = req.headers;
  const { main_category_id, sub_category_id, search_keyword, filter, page, limit} = req.query

  try{
    const params = {token, main_category_id, sub_category_id, search_keyword, filter, page, limit};
    const posts = await postService.selectPostList(params);

    return res.status(200).json({ posts });
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
}

module.exports = { insertPost, selectPostOne, updatePost, deletePost, selectPostList }
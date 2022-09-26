const postService = require("../services/post_service");
const { validatorValues } = require("../common/validator_value");
const postDto = require("../dto/post_dto")

// 게시글 작성
const insertPost = async (req, res) => {
  const {unique_id} =  req.foundUser;
  postDto.setPostDto(req.body);

  const params = postDto.getPostValue();
  let err = validatorValues(params, postDto.getPostHaskey());

  if(err) {
        return res.status(400).json({ message: err });
  }

  try {  
    await postService.insertPost(params, unique_id);

    return res.status(201).json({ message: 'post create success' });
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
  const {unique_id} =  req.foundUser;
  postDto.setPostDto(req.body);

  const params = postDto.getPostValue();
  let err = validatorValues(params, postDto.getPostHaskey());

  if(err) {
        return res.status(400).json({ message: err });
  }

  try{
    await postService.updatePost(params, unique_id);

    return res.status(200).json({ message: 'post update success' });
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
}

// 게시글 삭제
const deletePost = async (req, res) => {
  const {unique_id} =  req.foundUser;
  const { post_id } = req.params;

  try{
    const params = {unique_id, post_id};
    await postService.deletePost(params);

    return res.status(200).json({ message: 'post delete success' });
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
}


// 게시글 목록 읽기
const selectPostList = async (req, res) => {
  const { authorization } = req.headers;
  const { main_category_id, sub_category_id, search_keyword, filter, page, limit} = req.query

  try{
    const params = {authorization, main_category_id, sub_category_id, search_keyword, filter, page, limit};
    const posts = await postService.selectPostList(params);

    return res.status(200).json( { posts } );
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
}

module.exports = { insertPost, selectPostOne, updatePost, deletePost, selectPostList }
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
    const data = await postService.insertPost(params, unique_id);

    if(data.err_msg) {
      return res.status(400).json({ message: data.err_msg }); 
    }

    return res.status(201).json({ post_id: data.post_id, message: 'post create success' });
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
};

// 게시글 세부페이지 읽기
const selectPostOne = async (req, res) => {
  const { post_id } = req.params;

  if(isNaN(post_id)) {
    return res.status(400).json({ message: '잘못된 게시글 번호입니다.' });
  }

  try {
    const post = await postService.selectPostOne(post_id);

    if(post[0].unique_id === null) {
      return res.status(400).json({ message: '게시글이 존재하지 않습니다' });
    } else {
      return res.status(200).json({ post });
    }
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
}

// 게시글 수정
const updatePost = async (req, res) => {
  const {unique_id} =  req.foundUser;
  const { post_id } = req.params;
  postDto.setPostDto(req.body);

  const params = postDto.getPostValue();
  let err = validatorValues(params, postDto.getPostHaskeyByUpdate());

  if(err) {
        return res.status(400).json({ message: err });
  }

  try{
    await postService.updatePost(params, unique_id, post_id);

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
    await postService.deletePost(unique_id, post_id);
    return res.status(200).json({ message: 'post delete success' });  
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
}


// 게시글 목록 읽기
const selectPostList = async (req, res) => {
  const { user_id } = req.params;
  const { main_category_id, sub_category_id, search_keyword, filter, page, limit, filter_keyword} = req.query

  try{
    const params = {main_category_id, sub_category_id, search_keyword, filter, page, limit, filter_keyword, user_id};
    const posts = await postService.selectPostList(params);

    return res.status(200).json( { posts } );
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
}

const getEvnetPostList = async (req, res) => {
  try {
    const events = await postService.getEvnetPostList();

    return res.status(200).json( { events } );
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
}

module.exports = { insertPost, selectPostOne, updatePost, deletePost, selectPostList, getEvnetPostList }
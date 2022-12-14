const recommendService = require("../services/recommend_service");

// 댓글&게시글 추천 수 가져오기
const getRecommendCount = async (req, res) => {
  const { uid } = req.params;
  const { table_type } = req.query; // type으로 게시글 or 댓글 구분하여 id 값 가지고와서 데이터 가져오기
  
  try {
    const params = { table_type, uid };

    const recommendCount = await recommendService.getRecommendCount(params);

    return res.status(200).json( recommendCount );
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
}

// 댓글&게시글 추천/비추천 
const recommendAdd = async (req, res) => {
  const { unique_id } =  req.foundUser;
  const { uid } = req.params;
  const { table_type, recommend_type } = req.query;

  try {
    const params = { table_type, uid, recommend_type }
    // await recommendService.recommendAdd(params, unique_id);
    const recommendCount = await recommendService.recommendAdd(params, unique_id);

    return res.status(200).json({ recommendCount: recommendCount, message: table_type + 'recommend add success' });
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
}

// 댓글&게시글 추천/비추천 취소
const recommendCancel = async (req, res) => {
  const { unique_id } =  req.foundUser;
  const { uid } = req.params;
  const { table_type, recommend_type } = req.query;

  try {
    const params = { table_type, uid, recommend_type }
    const recommendCount = await recommendService.recommendCancel(params, unique_id);

    return res.status(200).json({ recommendCount: recommendCount, message: table_type + 'recommend cancle success' });
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
}

module.exports = { getRecommendCount, recommendAdd, recommendCancel }
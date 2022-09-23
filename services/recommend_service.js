const recommendDao = require("../models/recommend_dao");
const jwt = require("jsonwebtoken");

const setTableName = (table_type) => {
  let table_name = "";
  if(table_type === "post") {
    table_name = "post_recommend";
  } else {
    table_name = "comment_recommend";
  }
  
  return table_name;
}

const setColumnName = (table_type) => {
  let columnName = "";
  if(table_type === "post") {
    columnName = "post_id";
  } else {
    columnName = "comment_id";
  }
  
  return columnName;
}

// 댓글&게시글 추천 수 가져오기
const getRecommendCount = async params => {

  const recommendCount = await recommendDao.getRecommendCount(params.unique_id, setTableName(params.table_type), setColumnName(params.table_type));

  return recommendCount;
}

// 댓글&게시글 추천/비추천 
const recommendAdd = async params => {

  await recommendDao.recommendAdd(getUserUniqueId(params.token), params.unique_id, setTableName(params.table_type), setColumnName(params.table_type), params.recommend_type);  
}

// 댓글&게시글 추천/비추천 취소
const recommendCancel = async params => {
  
  await recommendDao.recommendCancel(getUserUniqueId(params.token), params.unique_id, setTableName(params.table_type), setColumnName(params.table_type), params.recommend_type);
}

const getUserUniqueId = (token) => {
  const user_id = jwt.verify(token, 'server_made_secret_key').userId;

  return user_id;
}

module.exports = { getRecommendCount, recommendAdd, recommendCancel }
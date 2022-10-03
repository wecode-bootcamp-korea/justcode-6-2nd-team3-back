const { myDataSource } = require('./typeorm');

// 댓글&게시글 추천 수 가져오기
const getRecommendCount = async (unique_id, table_name, column_name) => {

  let query = `SELECT 
  (SELECT COUNT(*) FROM `+ table_name +` WHERE `+ column_name + ` = ? AND recommend_type = 1) - 
  (SELECT COUNT(*) FROM `+ table_name +` WHERE `+ column_name + ` = ? AND recommend_type = 2) AS recommend_count
  FROM DUAL;`;

  console.log('getRecommendCount query>>>>>>>>>>>>>>>>>> ', query);

  const recommendCount = await myDataSource.query(query, [unique_id, unique_id]);

  return recommendCount;
}

// 댓글&게시글 추천/비추천 
const recommendAdd = async (user_id, unique_id, table_name, column_name, recommend_type) => {
  let query = `INSERT INTO ` + table_name + ` (user_id, ` + column_name + `, recommend_type) VALUES (?, ?, ?);`;

  console.log(user_id, unique_id, table_name, column_name, recommend_type);
  console.log('recommend insert query >>>>>>>>>>>>>>>>>>>> ', query);

  await myDataSource.query(query, [user_id, unique_id, recommend_type])
}

// 댓글&게시글 추천/비추천 취소
const recommendCancel = async (user_id, unique_id, table_name, column_name, recommend_type) => {
  let query = `DELETE FROM ` + table_name;
  let where = ``;

  if(recommend_type) {
    where = ` WHERE user_id = ? AND ` + column_name + ` = ? AND recommend_type = ?`;
  } else {
    where = ` WHERE user_id = ? AND ` + column_name + ` = ?`;
  }
  
  query = query + where;

  console.log(user_id, unique_id, table_name, column_name, recommend_type);
  console.log('recommend delte query >>>>>>>>>>>>>>>>>>>> ', query);

  await myDataSource.query(query, [user_id, unique_id, recommend_type]);
}

module.exports = { getRecommendCount, recommendAdd, recommendCancel }
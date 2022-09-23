const { myDataSource } = require('./typeorm');

// 게시글 작성
const insertPost = async (params, user_id) => { 
  const post_id =  await myDataSource.query(
    `INSERT INTO posts(main_category_id, sub_category_id, user_id, title, content) VALUES (?, ?, ?, ?, ?);`,
    [params.main_category_id, params.sub_category_id, user_id, params.title, params.content]
  );

  return post_id.insertId;
}

// 구인 게시글 작성
const insertJobsPost = async (params, user_id) => {
  await myDataSource.query(
    `INSERT INTO posts(main_category_id, sub_category_id, user_id, 
     position, career, region, contract_type, pay, manager_name, 
     manager_tel, manager_email, title, content) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    [params.main_category_id, params.sub_category_id, user_id, 
     params.position, params.career, params.region, params.contract_type, params.pay,
     params.manager_name, params.manager_tel, params.manager_email, params.title, params.content]
  )
}

// 게시글 세부페이지 읽기
const selectPostOne = async (post_id) => {
  const post = await myDataSource.query(
    `SELECT 
    posts.unique_id,
    users.nickname,
    users.profile_image,
    user_scores.score,
    DATE_FORMAT(posts.create_at, '%Y-%m-%d') AS create_at,
    posts.title,
    posts.content,
    posts.position, 
    posts.career, 
    posts.region, 
    posts.contract_type, 
    posts.pay, 
    posts.manager_name, 
    posts.views,
    JSON_ARRAYAGG(
       JSON_OBJECT(
          'tag_id', tags.unique_id,
          'tag_name', tags.tag_name
       )
    ) AS tags
    FROM posts
    LEFT JOIN users ON posts.user_id = users.unique_id
    LEFT JOIN user_scores ON users.unique_id = user_scores.user_id
    LEFT JOIN post_tags ON posts.unique_id = post_tags.post_id
    LEFT JOIN tags ON post_tags.tage_id = tags.unique_id
    WHERE posts.unique_id = ?`, 
    [post_id]
  )

  return post;
}

// 게시글 수정
const updatePost = async (params, user_id) => {
  await myDataSource.query(
    `UPDATE posts SET sub_category_id = ?, title = ?, content = ? WHERE unique_id = ? AND user_id = ?`,
    [params.sub_category_id, params.title, params.content, params.post_id, user_id]
  );
}

// 구인 게시글 수정
const updateJobsPost = async (params, user_id) => {
  await myDataSource.query(
    `UPDATE posts SET position = ?, career = ?, region = ?, contract_type = ?, pay = ?, manager_name = ?, manager_tel = ?, manager_email = ?, title = ?, content = ? 
     WHERE unique_id = ? AND user_id = ?`,
    [params.position, params.career, params.region, params.contract_type, params.pay, params.manager_name, params.manager_tel, params.manager_email, 
     params.title, params.content, params.post_id, user_id]
  );
}

// 게시글 삭제
const deletePost = async (user_id, post_id) => {
  await myDataSource.query(
    `DELETE FROM posts WHERE user_id = ? AND unique_id = ?`,
    [user_id, post_id]
  );
}

// 게시글 목록 읽기
const selectPostList = async (params, user_id) => {
  let query = `SELECT 
  posts.unique_id,
  users.nickname,
  users.profile_image,
  user_scores.score,
  DATE_FORMAT(posts.create_at, '%Y-%m-%d') AS create_at,
  posts.title,
  sub_category.sub_category_name,
  (SELECT COUNT(*) FROM scraps WHERE post_id = posts.unique_id) AS scraps_cnt,
  (SELECT COUNT(*) FROM comments WHERE post_id = posts.unique_id) AS comment_cnt,
  (SELECT COUNT(*) FROM post_recommend WHERE post_id = posts.unique_id) AS recommend_cnt,
  posts.views,
  JSON_ARRAYAGG(
      JSON_OBJECT(
      'tag_id', tags.unique_id,
      'tag_name', tags.tag_name
    )
    ) AS tags
  FROM posts
  LEFT JOIN users ON posts.user_id = users.unique_id
  LEFT JOIN sub_category ON posts.sub_category_id = sub_category.unique_id
  LEFT JOIN user_scores ON users.unique_id = user_scores.user_id
  LEFT JOIN post_tags ON posts.unique_id = post_tags.post_id
  LEFT JOIN tags ON post_tags.tage_id = tags.unique_id `;
  let condition = ``;
  let group_by = `GROUP BY posts.unique_id `;
  let order_by = `ORDER BY posts.create_at DESC`;

  // main_category_id, sub_category_id, search_keyword, filter, page, limit

  let setParams = [];

  if(user_id) {
    condition = `WHERE posts.user_id = ? `;
    setParams.push(user_id);
  } 

  if(params.main_category_id) {

    if(!condition) {
      condition = `WHERE posts.main_category_id = ?`;
    } else {
      condition = condition + ` AND posts.main_category_id = ?`;
    }

    setParams.push(params.main_category_id);
  } 

  if(params.sub_category_id) {

    if(!condition) {
      condition = `WHERE posts.sub_category_id = ?`;
    } else {
      condition = condition + ` AND posts.sub_category_id = ?`;
    }

    setParams.push(params.sub_category_id);
  } 

  if(params.search_keyword) {

    if(!condition) {
      condition = `WHERE posts.title LIKE CONCAT('%',` + `?` + `,'%')`;
    } else {
      condition = condition + ` AND posts.title LIKE CONCAT('%',` + `?` + `,'%')`;
    }

    setParams.push(params.search_keyword);

  } 

  if(params.filter) {
    if(params.filter === 1) { // 추천순
      order_by = `ORDER BY recommend_cnt DESC`;
    }

    if(params.filter === 2) { // 댓글순
      order_by = `ORDER BY comment_cnt DESC`;
    }

    if(params.filter === 3) { // 스크랩순
      order_by = `ORDER BY scraps_cnt DESC`;
    }

    if(params.filter === 4) { // 조회수순
      order_by = `ORDER BY posts.views DESC`;
    }
  } 

  query = query + condition + group_by + order_by;
  
  return await myDataSource.query(query, setParams);
}

const selectJobsPostList = async (params) => {
  let query = `SELECT 
  posts.unique_id,
  posts.create_at,
  posts.title,
  companies.company_name,
  companies.Business_registration_image,
  DATE_FORMAT(posts.create_at, '%Y-%m-%d') AS create_at,
  posts.position,
  posts.region,
  posts.pay,
  posts.career,
  sub_category.sub_category_name,
  (SELECT COUNT(*) FROM scraps WHERE post_id = posts.unique_id) AS scraps_cnt,
  (SELECT COUNT(*) FROM comments WHERE post_id = posts.unique_id) AS comment_cnt,
  (SELECT COUNT(*) FROM post_recommend WHERE post_id = posts.unique_id) AS recommend_cnt,
  JSON_ARRAYAGG(
      JSON_OBJECT(
      'tag_id', tags.unique_id,
      'tag_name', tags.tag_name
    )
    ) AS tags
  FROM posts
  LEFT JOIN users ON posts.user_id = users.unique_id
  LEFT JOIN companies ON users.unique_id = companies.user_id
  LEFT JOIN sub_category ON posts.sub_category_id = sub_category.unique_id
  LEFT JOIN user_scores ON users.unique_id = user_scores.user_id
  LEFT JOIN post_tags ON posts.unique_id = post_tags.post_id
  LEFT JOIN tags ON post_tags.tage_id = tags.unique_id
  WHERE posts.main_category_id = ?
  AND posts.sub_category_id = ? `;
  let condition = ``;
  let group_by = `GROUP BY posts.unique_id `;
  let order_by = `ORDER BY posts.create_at DESC`;

  let setParams = [];
  setParams.push(params.main_category_id);
  setParams.push(params.sub_category_id);

  if(params.search_keyword) {
    condition = `AND posts.title LIKE CONCAT('%',` + `?` + `,'%')`;

    setParams.push(params.search_keyword);

  } 
  query = query + condition + group_by + order_by;
  
  return await myDataSource.query(query, setParams);
}

const postViewsCount = async (post_id) => {
  await myDataSource.query(`UPDATE posts SET views = views + 1 WHERE unique_id = ?`, [post_id]);
}

module.exports = { insertPost, insertJobsPost, selectPostOne, updatePost, updateJobsPost, deletePost, selectPostList, postViewsCount, selectJobsPostList }
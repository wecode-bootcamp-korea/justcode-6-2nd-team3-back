const { myDataSource } = require('./typeorm');

// 게시글 작성
const insertPost = async params => { 
  const post_id =  await myDataSource.query(
    `INSERT INTO posts(main_category_id, sub_category_id, user_id, title, content) VALUES (?, ?, ?, ?, ?);`,
    [params.main_category_id, params.sub_category_id, params.user_id, params.title, params.content]
  );

  return post_id.insertId;
}

// 구인 게시글 작성
const insertJobsPost = async params => {
  await myDataSource.query(
    `INSERT INTO posts(main_category_id, sub_category_id, user_id, 
     position, career, region, contract_type, pay, manager_name, 
     manager_tel, manager_email, title, content) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    [params.main_category_id, params.sub_category_id, params.user_id, 
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
    user_scores.score,
    posts.create_at,
    posts.title,
    posts.content,
    posts.position, 
    posts.career, 
    posts.region, 
    posts.contract_type, 
    posts.pay, 
    posts.manager_name, 
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
const updatePost = async params => {
  await myDataSource.query(
    `UPDATE posts SET sub_category_id = ?, title = ?, content = ? WHERE unique_id = ? AND user_id = ?`,
    [params.sub_category_id, params.title, params.content, params.post_id, params.user_id]
  );
}

// 구인 게시글 수정
const updateJobsPost = async params => {
  await myDataSource.query(
    `UPDATE posts SET position = ?, career = ?, region = ?, contract_type = ?, pay = ?, manager_name = ?, manager_tel = ?, manager_email = ?, title = ?, content = ? 
     WHERE unique_id = ? AND user_id = ?`,
    [params.position, params.career, params.region, params.contract_type, params.pay, params.manager_name, params.manager_tel, params.manager_email, 
     params.title, params.content, params.post_id, params.user_id]
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
const selectPostList = async params => {
  let query = `SELECT 
  posts.unique_id AS post_id, 
  users.nickname,
  user_scores.score,
  posts.create_at,
  posts.title,
  sub_category.sub_category_name,
  (SELECT COUNT(*) FROM comments WHERE post_id = post_id) AS comment_cnt,
  (SELECT COUNT(*) FROM post_recommend WHERE post_id = post_id) AS recommend_cnt,
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
  let where = `WHERE posts.main_category_id = ?`;

  query = query + condition + where;

  return await myDataSource.query(query, [params.main_category_id])
}

module.exports = { insertPost, insertJobsPost, selectPostOne, updatePost, updateJobsPost, deletePost, selectPostList }
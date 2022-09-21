const { myDataSource } = require('./typeorm');

// 게시글 작성
const insertPost = async params => { 
  const post_id =  await myDataSource.query(
    `INSERT INTO posts(main_category_id, sub_category_id, user_id, title, content) VALUES (?, ?, ?, ?, ?);`,
    [params.main_category_id, params.sub_category_id, params.user_id, params.title, params.content]
  );

  return post_id.insertId;
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

// 게시글 삭제
const deletePost = async (user_id, post_id) => {
  await myDataSource.query(
    `DELETE FROM posts WHERE user_id = ? AND unique_id = ?`,
    [user_id, post_id]
  );
}

module.exports = { insertPost, selectPostOne, updatePost, deletePost }
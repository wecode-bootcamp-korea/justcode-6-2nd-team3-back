const { myDataSource } = require('./typeorm');

const addPostScraps = async params => {
  await myDataSource.query(
    `INSERT INTO scraps(user_id, post_id) VALUES(?, ?)`,
    [params.user_id, params.post_id]
  );
}

const deletePostScraps = async params => {
  await myDataSource.query(
    `DELETE FROM scraps WHERE user_id = ? AND post_id = ?`,
    [params.user_id, params.post_id]
  )
}

const selectPostScraps = async(user_id) => {
  const scraps = await myDataSource.query(
    `SELECT 
    sub_category.sub_category_name,
    posts.title,
    scraps.create_at
    FROM scraps
    LEFT JOIN posts ON scraps.post_id = posts.unique_id
    LEFT JOIN sub_category ON posts.sub_category_id = sub_category.unique_id
    WHERE scraps.user_id = ?`,
    [user_id]
  );

  return scraps;
}

module.exports = { addPostScraps, deletePostScraps, selectPostScraps }
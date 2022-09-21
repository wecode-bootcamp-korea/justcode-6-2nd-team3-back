const { myDataSource } = require('./typeorm');

const insertPostTags = async (tag, post_id) => {
  await myDataSource.query(
    `INSERT INTO post_tags(post_id, tage_id) VALUES (?, ?);`,
    [post_id, tag]
  );
}

const deletePostTags = async (post_id) => {
  await myDataSource.query(
    `DELETE FROM post_tags WHERE post_id = ?`,
    [post_id]
  );
}

module.exports = { insertPostTags, deletePostTags }
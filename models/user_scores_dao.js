const { myDataSource } = require('./typeorm');

const addUserScore = async (user_id) => {
  await myDataSource.query(
    `UPDATE user_scores SET score = score+1 WHERE user_id = ?;`,
    [user_id]
  );
}

module.exports = { addUserScore }
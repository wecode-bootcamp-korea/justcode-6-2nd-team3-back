const scrapsDao = require('../models/scraps_dao');

const addPostScraps = async (post_id, user_id) => {
  await scrapsDao.addPostScraps(post_id, user_id);
}

const deletePostScraps = async (post_id, user_id) => {
  await scrapsDao.deletePostScraps(post_id, user_id);
}

const selectPostScraps = async(authorization ) => {
  const user_id = jwt.verify(authorization , 'server_made_secret_key').userId;
  const scraps = await scrapsDao.selectPostScraps(user_id);

  return scraps;
}

module.exports = { addPostScraps, deletePostScraps, selectPostScraps }
const scrapsDao = require('../models/scraps_dao');

const addPostScraps = async params => {
  await scrapsDao.addPostScraps(params, getUserUniqueId(params.token));
}

const deletePostScraps = async params => {
  await scrapsDao.deletePostScraps(params, getUserUniqueId(params.token));
}

const selectPostScraps = async(token) => {
  const scraps = await scrapsDao.selectPostScraps(getUserUniqueId(token));

  return scraps;
}

const getUserUniqueId = (token) => {
  const user_id = jwt.verify(token, 'server_made_secret_key').userId;

  return user_id;
}

module.exports = { addPostScraps, deletePostScraps, selectPostScraps }
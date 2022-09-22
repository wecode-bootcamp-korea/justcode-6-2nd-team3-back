const scrapsDao = require('../models/scraps_dao');

const addPostScraps = async params => {
  await scrapsDao.addPostScraps(params);
}

const deletePostScraps = async params => {
  await scrapsDao.deletePostScraps(params);
}

const selectPostScraps = async(user_id) => {
  const scraps = await scrapsDao.selectPostScraps(user_id);

  return scraps;
}

module.exports = { addPostScraps, deletePostScraps, selectPostScraps }
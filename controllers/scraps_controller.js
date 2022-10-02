const scrapsService = require('../services/scraps_service');

const addPostScraps = async(req, res) => {
  const {unique_id} =  req.foundUser;
  const {post_id} = req.params;

  try {
    await scrapsService.addPostScraps(post_id, unique_id);

    return res.status(201).json({ message: 'scrap add success' });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

const deletePostScraps = async(req, res) => {
  const {unique_id} =  req.foundUser;
  const {post_id} = req.params;

  try {
    await scrapsService.deletePostScraps(post_id, unique_id);

    return res.status(200).json({ message: 'scrap delete success' });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }

}

const selectPostScraps = async(req, res) => {
  const {user_id} = req.params;

  try{
    const scraps = await scrapsService.selectPostScraps(user_id);

    return res.status(200).json({ scraps });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

module.exports = { addPostScraps, deletePostScraps, selectPostScraps }
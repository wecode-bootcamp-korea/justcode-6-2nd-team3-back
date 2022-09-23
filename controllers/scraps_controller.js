const scrapsService = require('../services/scraps_service');

const addPostScraps = async(req, res) => {
  const { token } = req.headers;
  const {post_id} = req.params;

  try {
    const params = {token, post_id};
    await scrapsService.addPostScraps(params);

    return res.status(201).json({ message: 'scrap add success' });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

const deletePostScraps = async(req, res) => {
  const { token } = req.headers;
  const {post_id} = req.params;

  try {
    const params = {token, post_id};
    await scrapsService.deletePostScraps(params);

    return res.status(200).json({ message: 'scrap delete success' });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }

}

const selectPostScraps = async(req, res) => {
  const { token } = req.headers;

  try{
    const scraps = await scrapsService.selectPostScraps(token);

    return res.status(200).json({ scraps });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

module.exports = { addPostScraps, deletePostScraps, selectPostScraps }
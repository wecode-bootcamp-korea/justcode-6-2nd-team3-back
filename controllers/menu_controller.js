const menuService = require('../services/menu_service');

const selectMainCategory = async (req, res) => {
  try {
    const main_category = await menuService.selectMainCategory();

    return res.status(200).json({ main_category });
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
}

const selectSubCategory = async (req, res) => {
  const { main_category_id } = req.params;
  console.log('main_category_id >>>>> ', main_category_id);
  try {
    const sub_category = await menuService.selectSubCategory(main_category_id);

    return res.status(200).json({ sub_category });
  } catch (err) {
    res.status(err.status || 500).json(err.message);
  }
}

module.exports = { selectMainCategory, selectSubCategory }
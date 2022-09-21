const menuDao = require('../models/menu_dao');

const selectMainCategory = async () => {
  const main_category = await menuDao.selectMainCategory();
  
  return main_category;
}

const selectSubCategory = async (main_category_id) => {
  const sub_category = await menuDao.selectSubCategory(main_category_id);
  
  return sub_category;
}

module.exports = { selectMainCategory, selectSubCategory }
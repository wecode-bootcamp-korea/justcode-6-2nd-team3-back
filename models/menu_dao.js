const { myDataSource } = require('./typeorm');

const selectMainCategory = async () => {
  const main_category = await myDataSource.query(
    `SELECT unique_id, main_category_name FROM main_category`
  );
  
  return main_category;
}

const selectSubCategory = async (main_category_id) => {
  const sub_category = await myDataSource.query(
    `SELECT unique_id, main_category_id, sub_category_name FROM sub_category WHERE main_category_id= ?`,
    [main_category_id]
  )
  
  return sub_category;
}

module.exports = { selectMainCategory, selectSubCategory }
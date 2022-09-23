const userService = require("../models/tag_dao");

const tagSearch = async (keyword) => {
    return  await userService.getTagSearchList(keyword);
}


module.exports = { tagSearch};
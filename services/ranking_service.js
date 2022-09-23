const rankingDao = require("../models/ranking_dao");

// 사용자 프로필 데이터 가져오기
const topWriters = async (user_id) => {
    return  await rankingDao.getTopWriters();
}

const topTags = async (user_id) => {
    return  await rankingDao.getTopTags();
}

module.exports = {topWriters, topTags};
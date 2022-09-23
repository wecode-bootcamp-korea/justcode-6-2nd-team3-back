const rankingService = require("../services/ranking_service");

// 게시물에 댓글 불러오기
const topWriters = async (req, res) => {
    try{
        const result = await rankingService.topWriters();
        res.status(200).json({topWriters : result, message: "success_getTopWriters" })
    }catch(err){
        console.log(err);
        res.status(err.statusCode || 500).json({message:err.message})
    }

} 

const topTags = async (req, res) => {
    try{
        const result = await rankingService.topTags();
        res.status(200).json({topTags : result, message: "success_getTopTags" })
    }catch(err){
        console.log(err);
        res.status(err.statusCode || 500).json({message:err.message})
    }

} 

module.exports = {topWriters, topTags};
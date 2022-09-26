const rankingService = require("../services/ranking_service");

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

const editorChoice = async (req, res) => {
    try{
        const result = await rankingService.editorChoice();
        res.status(200).json({editorChoice : result, message: "success_getTopTags" })
    }catch(err){
        console.log(err);
        res.status(err.statusCode || 500).json({message:err.message})
    }

} 

const weeklyBest = async (req, res) => {
    try{
        const result = await rankingService.weeklyBest();
        res.status(200).json({weeklyBest : result, message: "success_getTopTags" })
    }catch(err){
        console.log(err);
        res.status(err.statusCode || 500).json({message:err.message})
    }

} 

module.exports = {topWriters, topTags, editorChoice, weeklyBest};
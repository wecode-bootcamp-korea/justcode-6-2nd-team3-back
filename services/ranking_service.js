const rankingDao = require("../models/ranking_dao");

const topWriters = async () => {
    const writers = await rankingDao.getTopWriters();
    for(let i =0; i < writers.length; i++){
        if(writers[i].profile_image){
            const url = "http://localhost:8000/file"+ writers[i].profile_image
            writers[i].profile_image = url
        }  
    }
    return writers
}

const topTags = async () => {
    return  await rankingDao.getTopTags();
}

const editorChoice = async () => {
    const EditorChoice = await rankingDao.getEditorChoice();
    for(let i =0; i < EditorChoice.length; i++){
        if(EditorChoice[i].profile_image){
            const url = "http://localhost:8000/file"+ EditorChoice[i].profile_image
            EditorChoice[i].profile_image = url
        }  
        if(EditorChoice[i].tags.length>0){
            const userTags  = JSON.parse(EditorChoice[i].tags)
            EditorChoice[i].tags = userTags
        }
    }
    return EditorChoice
}

const weeklyBest = async () => {
    
    const WeeklyBest = await rankingDao.getWeeklyBest();
    for(let i =0; i < WeeklyBest.length; i++){
        if(WeeklyBest[i].profile_image){
            const url = "http://localhost:8000/file"+ WeeklyBest[i].profile_image
            WeeklyBest[i].profile_image = url
        }  
        if(WeeklyBest[i].tags.length>0){
            const userTags  = JSON.parse(WeeklyBest[i].tags)
            WeeklyBest[i].tags = userTags
        }
    }
    return WeeklyBest
}

module.exports = {topWriters, topTags , editorChoice, weeklyBest };
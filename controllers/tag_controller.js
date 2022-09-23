const userService = require("../services/tag_service");


const tagSearch = async (req, res) => {
    const {keyword} = req.query
    if(!keyword){
        res.status(400).json({ message: `keyword 이/가 없습니다` })
        return;
    }

    try{
        const result = await userService.tagSearch(keyword);
        res.status(200).json({tagList : result , message: "tagSearchList" })
    }catch(err){
        console.log(err);
        res.status(500).json(err)
    }

}

module.exports = { tagSearch };
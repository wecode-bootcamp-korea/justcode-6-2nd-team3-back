const userService = require("../services/tag_service");


const tagSearch = async (req, res) => {
    const {keyword} = req.query
    if(!keyword){
        res.status(200).json({tagList : [] , message: "tagSearchList" })
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
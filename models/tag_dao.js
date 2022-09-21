const { myDataSource } = require('./typeorm');

const getTagSearchList = async (keyword)=>{
    const tagSearchList = await myDataSource.query(`
    SELECT unique_id, tag_name  
        FROM tags 
        WHERE tag_name LIKE CONCAT(? ,'%') 
        ORDER BY LENGTH(tag_name)
    ;`, [keyword])
    
    return tagSearchList
}


module.exports = { getTagSearchList };
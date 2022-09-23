const { myDataSource } = require('./typeorm');

const getTopWriters = async ()=>{
    return await myDataSource.query(`
    SELECT ANY_VALUE(p.user_id) AS user_id
            , ANY_VALUE(u.user_name) AS user_name
            , COUNT(p.user_id) AS cnt
        FROM posts p 
        JOIN users u ON u.unique_id = p.user_id 
        GROUP BY p.user_id   
        ORDER BY cnt DESC
        LIMIT 0, 5;`
    )
}

const getTopTags = async ()=>{
    return await myDataSource.query(`
    SELECT ANY_VALUE(pt.tage_id) AS tage_id
            , ANY_VALUE(t.tag_name) AS tag_name
            , COUNT(pt.tage_id) AS cnt
        FROM post_tags pt 
        JOIN tags t ON t.unique_id = pt.tage_id 
        GROUP BY pt.tage_id  
        ORDER BY cnt DESC
        LIMIT 0, 5;`
    )
}

module.exports = { getTopWriters, getTopTags };

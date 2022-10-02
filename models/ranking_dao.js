const { myDataSource } = require('./typeorm');

const getTopWriters = async ()=>{
    return await myDataSource.query(`
    SELECT ANY_VALUE(p.user_id) AS user_id
            , ANY_VALUE(u.nickname) AS nickname
            , ANY_VALUE(u.profile_image) AS profile_image
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

const getEditorChoice = async ()=>{
    return await myDataSource.query(`
    SELECT 
        p.unique_id
        , u.unique_id as user_id
        , ANY_VALUE(p.title) AS title
        , ANY_VALUE(p.views) AS views
        , ANY_VALUE(u.nickname) AS nickname
        , ANY_VALUE(u.profile_image) AS profile_image
        , ANY_VALUE(us.score) AS score
        , DATE_FORMAT(ANY_VALUE(p.create_at), '%Y-%m-%d') AS create_at 
        , ANY_VALUE(sub.sub_category_name) AS sub_category_name
        , ANY_VALUE(sub.path) AS path
        , (SELECT COUNT(*) FROM scraps WHERE post_id = p.unique_id) AS scraps_cnt
        , (SELECT COUNT(*) FROM comments WHERE post_id = p.unique_id) AS comment_cnt
        ,  (SELECT COUNT(*) 
            FROM post_recommend
        WHERE post_id = p.unique_id 
            AND recommend_type = 1) - 
        (SELECT COUNT(*) 
            FROM post_recommend 
            WHERE post_id = p.unique_id
            AND recommend_type = 2) AS recommend_cnt
        , JSON_ARRAYAGG(
        	JSON_OBJECT(
            'tag_id', pt.unique_id,
            'tag_name', t.tag_name
            )
		) as tags	
    FROM posts p 
    JOIN users u ON u.unique_id = p.user_id
    JOIN user_scores us ON us.user_id = p.user_id 
    JOIN sub_category sub ON p.sub_category_id = sub.unique_id
    JOIN main_category mc ON p.main_category_id = mc.unique_id 
    LEFT JOIN post_tags pt ON p.unique_id = pt.post_id
    LEFT JOIN tags t ON pt.tage_id = t.unique_id 
    WHERE mc.unique_id = 1 OR mc.unique_id = 2
    GROUP BY p.unique_id
    ORDER BY ANY_VALUE(us.score) DESC
    LIMIT 0, 5;`
    )
}

const getWeeklyBest = async ()=>{
    return await myDataSource.query(`
    SELECT 
        p.unique_id
        , u.unique_id as user_id
        , ANY_VALUE(p.title) AS title
        , ANY_VALUE(p.views) AS views
        , ANY_VALUE(u.nickname) AS nickname
        , ANY_VALUE(u.profile_image) AS profile_image
        , ANY_VALUE(us.score) AS score
        , DATE_FORMAT(ANY_VALUE(p.create_at), '%Y-%m-%d') AS create_at 
        , ANY_VALUE(sub.sub_category_name) AS sub_category_name
        , ANY_VALUE(sub.path) AS path
        , (SELECT COUNT(*) FROM scraps WHERE post_id = p.unique_id) AS scraps_cnt
        , (SELECT COUNT(*) FROM comments WHERE post_id = p.unique_id) AS comment_cnt
        ,  (SELECT COUNT(*) 
            FROM post_recommend
        WHERE post_id = p.unique_id 
            AND recommend_type = 1) - 
        (SELECT COUNT(*) 
            FROM post_recommend 
            WHERE post_id = p.unique_id
            AND recommend_type = 2) AS recommend_cnt
        , JSON_ARRAYAGG(
            JSON_OBJECT(
            'tag_id', pt.unique_id,
            'tag_name', t.tag_name
            )
        ) as tags
    FROM posts p 
    JOIN users u ON u.unique_id = p.user_id
    JOIN user_scores us ON us.user_id = p.user_id 
    JOIN sub_category sub ON p.sub_category_id = sub.unique_id
    JOIN main_category mc ON p.main_category_id = mc.unique_id 
    LEFT JOIN post_tags pt ON p.unique_id = pt.post_id
    LEFT JOIN tags t ON pt.tage_id = t.unique_id 
    WHERE ANY_VALUE(p.create_at) BETWEEN DATE_ADD(NOW(),INTERVAL -1 WEEK ) AND NOW()
    AND mc.unique_id = 1 OR mc.unique_id = 2
    GROUP BY p.unique_id
    ORDER BY recommend_cnt DESC
    LIMIT 0, 5;`
    )
}

module.exports = { getTopWriters, getTopTags, getEditorChoice, getWeeklyBest };

const { myDataSource } = require('./typeorm');

const getPostComment = async (post_id)=>{
    const result =  await myDataSource.query(
    ` SELECT p.unique_id  AS post_id
        , u.id AS id
        , u.nickname
        , u.unique_id AS user_id
        , CONCAT('http://localhost:8000/file', u.profile_image) AS profile_image
        , co.unique_id AS comment_id
        , co.content 
        , DATE_FORMAT(co.create_at, '%Y-%m-%d') AS comment_create_at
        , DATE_FORMAT(co.update_at, '%Y-%m-%d') AS comment_update_at
        , us.score 
        , JSON_ARRAYAGG(
            JSON_OBJECT(
            'post_id', p.unique_id, 
            'id' , u2.id,
            'nickname' , u2.nickname,
            'user_id', u2.unique_id,
            'profile_image', CONCAT('http://localhost:8000/file', u2.profile_image),
            'user_score', us2.score ,
            'comment_id' , co2.unique_id,
            'content', co2.content, 
            'comment_create_at'	, DATE_FORMAT(co2.create_at, '%Y-%m-%d'),
            'comment_update_at'	, DATE_FORMAT(co2.update_at, '%Y-%m-%d')
         )) as comment_in_comment
        FROM (SELECT * FROM comments com WHERE com.LEVEL  = 1) AS co
        JOIN user_scores us ON us.user_id = co.user_id
        JOIN posts p ON p.unique_id = co.post_id 
        JOIN users u ON u.unique_id = co.user_id
        LEFT JOIN (SELECT * FROM comments com WHERE com.LEVEL  = 2) AS co2 ON co2.parent_id = co.unique_id AND co2.post_id =?
        LEFT JOIN user_scores us2 ON us2.user_id = co2.user_id
        LEFT JOIN users u2 ON u2.unique_id = co2.user_id
        WHERE p.unique_id = ?
        AND co.post_id =?
        GROUP BY co.unique_id, us.score
        ORDER BY co.create_at;`
    , [post_id, post_id, post_id])
    return result
}

const commentInsert = async (user_id, post_id , parent_id, content, level)=>{
    const result =  await myDataSource.query(
    ` INSERT INTO comments(post_id , user_id, parent_id, level, content) VALUES(?,?,?,?,?);`
    , [post_id, user_id, parent_id, level, content])
    return result
}

const getCommentId = async (comment_id)=>{
    const result =  await myDataSource.query(
    ` SELECT user_id, post_id, level
        FROM comments
    WHERE unique_id = ?;`
    , [comment_id])
    return result
}

const commentUpdate = async (comment_id, content)=>{
    await myDataSource.query(
    ` UPDATE comments
        SET content  = ?
        , update_at = NOW() 
    WHERE unique_id  = ?;`
    , [content, comment_id])
}

const commentLevel2Delete = async (comment_id)=>{
    await myDataSource.query(
    `  DELETE
        FROM comments
        WHERE parent_id  = ?
        AND level = 2;`
    , [comment_id])
}

const commentDelete = async (comment_id)=>{
    await myDataSource.query(
    ` DELETE
        FROM comments
        WHERE unique_id = ?;`
    , [comment_id])
}

const commentAllDelete = async (post_id) => {
    await myDataSource.query(`DELETE FROM comments WHERE post_id = ?`, [[post_id]])
}

module.exports = { 
    getPostComment
    , commentInsert
    , getCommentId
    , commentUpdate
    , commentLevel2Delete
    , commentDelete 
    , commentAllDelete
};

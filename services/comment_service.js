const commentDao = require("../models/comment_dao");


// 게시글에 댓글 불러오기
const postComment = async (post_id) => {
    try{
        const commentList = await commentDao.getPostComment(post_id);
        for(let i =0; i<commentList.length; i++){
            const result  = JSON.parse(commentList[i].comment_in_comment)
            commentList[i].comment_in_comment = result
        }
        for(let i =0; i<commentList.length; i++){
            if(commentList[i].profile_image){
                const url = "http://localhost:8000/file"+ commentList[i].profile_image
                commentList[i].profile_image = url
            }  
            for(let j =0; j<commentList[i].comment_in_comment.length; j++){
                if(commentList[i].comment_in_comment[j].profile_image){
                    const url = "http://localhost:8000/file"+ commentList[i].comment_in_comment[j].profile_image
                    commentList[i].comment_in_comment[j].profile_image = url
                }
            }
        }
        return commentList
    }catch(err){
        console.log(err)
    }
}

// 댓글 추가
const commentAdd = async (user_id, post_id , parent_id, content, level) => {
    await commentDao.commentInsert(user_id, post_id , parent_id, content, level);
    // 포스트 아이디로 댓글 목록 다시 불러오기
    const commentList = await commentDao.getPostComment(post_id);
    for(let i =0; i<commentList.length; i++){
        const result  = JSON.parse(commentList[i].comment_in_comment)
        commentList[i].comment_in_comment = result
    }
    return commentList
} 

const commentUpdate = async (user_id, comment_id, content) => {
    const result = await commentDao.getCommentId(comment_id);
    if(result[0].user_id != user_id){
        const error = new Error({ message: "ACCOUNT_MISSMATCH"}.message);
        error.statusCode = 400;
        throw error;
    }

    try{
        await commentDao.commentUpdate(comment_id, content);
        // 포스트 아이디로 댓글 목록 다시 불러오기
        const commentList = await commentDao.getPostComment(result[0].post_id);
        for(let i =0; i<commentList.length; i++){
            const result  = JSON.parse(commentList[i].comment_in_comment)
            commentList[i].comment_in_comment = result
        }
        return commentList
    }catch(err){
        console.log(err)
    }
    
} 

const commentDelete = async (user_id, comment_id) => {
    const result = await commentDao.getCommentId(comment_id);
    if(result[0].user_id != user_id){
        const error = new Error({ message: "ACCOUNT_MISSMATCH"}.message);
        error.statusCode = 400;
        throw error;
    }

    try{
        if(result[0].level == 1){
            await commentDao.commentLevel2Delete(comment_id);
        }
        await commentDao.commentDelete(comment_id);
        // 포스트 아이디로 댓글 목록 다시 불러오기
        const commentList = await commentDao.getPostComment(result[0].post_id);
        for(let i =0; i<commentList.length; i++){
            const result  = JSON.parse(commentList[i].comment_in_comment)
            commentList[i].comment_in_comment = result
        }
        return commentList
    }catch(err){
        console.log(err)
    }
    
} 

module.exports = { postComment, commentAdd, commentUpdate, commentDelete };

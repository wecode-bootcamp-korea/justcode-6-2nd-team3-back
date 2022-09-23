const commentService = require("../services/comment_service");

// 게시물에 댓글 불러오기
const postComment = async (req, res) => {
    const {post} = req.query

    const haskey = {post:false}; 
    const requireKey = Object.keys(haskey);

    Object.entries(req.query).forEach((keyValue) => {
    const [key, value] = keyValue;
    if (requireKey.includes(key) && value){
        haskey[key] = true;
    }
    })
    const haskeyArray = Object.entries(haskey);
    for(let i =0; i<haskeyArray.length;i++){
    const [key, value] = haskeyArray[i];
    if(!value){
        res.status(400).json({ message: `${key} 이/가 없습니다` })
        return;
    }
    }

    try{
        const result = await commentService.postComment(post);
        res.status(200).json({postComment : result, message: "success_getPostComment" })
    }catch(err){
        console.log(err);
        res.status(err.statusCode || 500).json({message:err.message})
    }

} 

// 댓글 작성
const commentAdd = async (req, res) => {
    const {post_id , parent_id, content} = req.body
    const {unique_id} =  req.foundUser;
    if(!unique_id){
        res.status(400).json({ message: `user id 이/가 없습니다` })
        return;
    }
    
    const haskey = {post_id:false, content:false}; 
    const requireKey = Object.keys(haskey);

    Object.entries(req.body).forEach((keyValue) => {
    const [key, value] = keyValue;
    if (requireKey.includes(key) && value){
        haskey[key] = true;
    }
    })
    const haskeyArray = Object.entries(haskey);
    for(let i =0; i<haskeyArray.length;i++){
    const [key, value] = haskeyArray[i];
    if(!value){
        res.status(400).json({ message: `${key} 이/가 없습니다` })
        return;
    }
    }

    let level = 0;
    if(!parent_id){ // 부모댓글아이디값 안들어오면 level을 1로
        level=1
    }else if(parent_id){
        level=2
    }

    try{
        const result = await commentService.commentAdd(unique_id, post_id , parent_id, content, level);
        res.status(200).json({postComment : result, message: "success_commentAdd" })
    }catch(err){
        console.log(err);
        res.status(err.statusCode || 500).json({message:err.message})
    }

} 

const commentUpdate = async (req, res) => {
    const { comment_id, content } = req.body

    const {unique_id} =  req.foundUser;
    if(!unique_id){
        res.status(400).json({ message: `user id 이/가 없습니다` })
        return;
    }

    const haskey = {comment_id:false, content:false}; 
    const requireKey = Object.keys(haskey);

    Object.entries(req.body).forEach((keyValue) => {
    const [key, value] = keyValue;
    if (requireKey.includes(key) && value){
        haskey[key] = true;
    }
    })
    const haskeyArray = Object.entries(haskey);
    for(let i =0; i<haskeyArray.length;i++){
    const [key, value] = haskeyArray[i];
    if(!value){
        res.status(400).json({ message: `${key} 이/가 없습니다` })
        return;
    }
    }

    try{
        const result = await commentService.commentUpdate(unique_id, comment_id, content);
        res.status(200).json({postComment : result, message: "success_commentUpdate" })
    }catch(err){
        console.log(err);
        res.status(err.statusCode || 500).json({message:err.message})
    }

} 

const commentDelete = async (req, res) => {
    const { comment_id } = req.body

    const {unique_id} =  req.foundUser;
    if(!unique_id){
        res.status(400).json({ message: `user id 이/가 없습니다` })
        return;
    }

    const haskey = {comment_id:false}; 
    const requireKey = Object.keys(haskey);

    Object.entries(req.body).forEach((keyValue) => {
    const [key, value] = keyValue;
    if (requireKey.includes(key) && value){
        haskey[key] = true;
    }
    })
    const haskeyArray = Object.entries(haskey);
    for(let i =0; i<haskeyArray.length;i++){
    const [key, value] = haskeyArray[i];
    if(!value){
        res.status(400).json({ message: `${key} 이/가 없습니다` })
        return;
    }
    }

    try{
        const result = await commentService.commentDelete(unique_id, comment_id);
        res.status(200).json({postComment : result, message: "success_commentDelete" })
    }catch(err){
        console.log(err);
        res.status(err.statusCode || 500).json({message:err.message})
    }

} 

module.exports = {postComment, commentAdd, commentUpdate, commentDelete};
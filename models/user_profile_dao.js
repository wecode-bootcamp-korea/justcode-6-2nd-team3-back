const { myDataSource } = require('./typeorm');

const getUserProfile = async (user_id)=>{
  const [user] =  await myDataSource.query(
  ` SELECT u.user_name 
      , u.nickname 
      , u.profile_image 
      , JSON_ARRAYAGG(
              JSON_OBJECT(
                'tag_id', t.unique_id ,
                'tag_name', t.tag_name  
              )
            ) as tags
      FROM users u 
      LEFT JOIN user_tags ut ON u.unique_id  = ut.user_id
      LEFT JOIN tags t ON t.unique_id = ut.tage_id  
    WHERE u.unique_id = ?
    GROUP BY u.unique_id ;`, [user_id])
  return user
}

const profileImageUpdate = async (image, id)=>{
  await myDataSource.query(
    `UPDATE users
    SET profile_image  = ?
    WHERE unique_id = ?`,
    [image, id]
  );
}

const getUserProfileImage = async (id) => {
  const [user] = await myDataSource.query(
    ` SELECT profile_image FROM users WHERE unique_id = ?`,
    [id]
  );
  return user;
};

const userUpdate = async (id, user_name, nickname)=>{
  await myDataSource.query(
    `UPDATE users
    SET user_name  = ?
      , nickname  = ?
    WHERE unique_id = ?`,
    [user_name, nickname, id]
  );
}

const userTagsDelete = async (id)=>{
  await myDataSource.query(
    `DELETE
      FROM user_tags ut 
    WHERE ut.user_id = ?
    ;`, [id]
  );
}

const getTagId = async (tag)=>{
  const [tagId] = await myDataSource.query(
    `SELECT unique_id  
      FROM tags 
      WHERE tag_name = ?
    ;`, [tag]
  );
  return tagId;
}

const createTag = async (tag)=>{
  await myDataSource.query(
    `INSERT INTO tags (tag_name) VALUES(?)
    ;`, [tag]
  );
}

const userTagInsert = async (id, tag_id)=>{
  await myDataSource.query(
    `INSERT INTO user_tags (user_id, tage_id) VALUES(?, ?)
    ;`, [id, tag_id]
  );
}

module.exports = {
  getUserProfile
  , profileImageUpdate
  , userUpdate
  , getUserProfileImage
  , userTagsDelete
  , getTagId
  , createTag
  , userTagInsert
};

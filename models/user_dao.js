const { myDataSource } = require('./typeorm');

const createUser = async (id, password, email, user_name, nickname, user_type)=>{
  await myDataSource.query(
    `INSERT INTO users(
      id
      , password
      , email
      , user_name
      , nickname
      , user_type) 
    VALUES (?,?,?,?,?,?)`, [id, password, email, user_name, nickname, user_type]
  )
}

const createUserScore = async (id)=>{
  await myDataSource.query(
    `INSERT INTO user_scores (user_id, score) VALUES(?, 0)`, [id]
  )
}

const createCompany = async (id, company_name, introduction, Business_registration_number, contact_information, email, Business_registration_image)=>{
  await myDataSource.query(
    `INSERT INTO companies(
      user_id
      , company_name
      , introduction
      , Business_registration_number
      , contact_information
      , email
      , Business_registration_image) 
    VALUES (?,?,?,?,?,?,?)`, [id, company_name, introduction, Business_registration_number, contact_information, email, Business_registration_image]
  )
}

const getUser = async (id)=>{
  const [user] =  await myDataSource.query( 
    ` SELECT unique_id, id  FROM users WHERE id = ?`, [id])
  return user
}

const getUserIdPassword = async (id) => {
  const [user] = await myDataSource.query(
    ` SELECT unique_id, password 
    FROM users 
    WHERE id = ?
    AND user_type != 4`,
    [id]
  );
  return user;
};

const getUserById = async (id) => {
  const [user] = await myDataSource.query(
    ` SELECT unique_id, password 
    FROM users 
    WHERE id = ?`,
    [id]
  );
  return user;
};

const getUserByEmail = async (email) => {
  const [user] = await myDataSource.query(
    ` SELECT unique_id FROM users WHERE email = ?`,
    [email]
  );
  return user;
};

const getUserByNickname = async (nickname) => {
  const [user] = await myDataSource.query(
    ` SELECT unique_id FROM users WHERE nickname = ?`,
    [nickname]
  );
  return user;
};

const getUserByBusinessRegistrationNumber = async (number) => {
  const [company] = await myDataSource.query(
    ` SELECT unique_id 
      FROM companies 
      WHERE Business_registration_number = ?`,
    [number]
  );
  return company;
};

const getUserByCompanyEmail = async (email) => {
  const [company] = await myDataSource.query(
    ` SELECT unique_id 
    FROM companies 
    WHERE email = ?`,[email]
  );
  return company;
};

const getUserByUniqueId = async (id) => {
  const [user] = await myDataSource.query(
    ` SELECT unique_id, password
    FROM users 
    WHERE unique_id = ?
    AND user_type != 4`, [id]);
  return user;
};

const userHuman = async (id) => {
  await myDataSource.query(
    ` UPDATE users
      SET user_type  = 4
      WHERE unique_id = ?`, [id]
  );
};

const updatePassword = async (id, hsahedPw) => {
  await myDataSource.query(
    ` UPDATE users
      SET password = ?
      WHERE unique_id = ?`, [hsahedPw, id]
  );
};

module.exports = {
  createUser
  , createCompany
  , getUserByEmail
  , getUser
  , getUserIdPassword
  , getUserById
  , getUserByEmail
  , getUserByNickname
  , getUserByBusinessRegistrationNumber
  , getUserByCompanyEmail
  , getUserByUniqueId
  , userHuman
  , updatePassword
  , createUserScore
};
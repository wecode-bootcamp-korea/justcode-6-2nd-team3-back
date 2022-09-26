const userDao = require("../models/user_dao");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (id, password, email, user_name, nickname, user_type) => {
  const result = await isUnique(id, email, nickname);
  if(result){
    const error = new Error(result.message);
    error.statusCode = 400;
    throw error;
  }
  
  const salt = bcrypt.genSaltSync(12);
  const hsahedPw = bcrypt.hashSync(password, salt)
  try{
    await userDao.createUser(id, hsahedPw, email, user_name, nickname, user_type);
    const userId = await userDao.getUser(id);
    await userDao.createUserScore(userId.unique_id);
  }catch(err){
    console.log(err);
  }
}

const createCompanyUser = async (payload) => {
  const result = await isUnique(payload.id, payload.email, payload.nickname);
  if(result){
    const error = new Error(result.message);
    error.statusCode = 400;
    throw error;
  }

  const {company_name, introduction,  Business_registration_number, contact_information, company_email}= payload

  const resultByBusinessRegistrationNumber = await userDao.getUserByBusinessRegistrationNumber(Business_registration_number);
  const resultByCompanyEmail = await userDao.getUserByCompanyEmail(company_email);

  if(resultByBusinessRegistrationNumber){
    const error = new Error({ message: "BUSINESS_REGISTRATION_NUM_DUPLICATE"}.message);
    error.statusCode = 400;
    throw error;
  }
  if(resultByCompanyEmail){
    const error = new Error({ message: "COMPANY_EMAIL_DUPLICATE"}.message);
    error.statusCode = 400;
    throw error;
  }

  const salt = bcrypt.genSaltSync(12);
  const hsahedPw = bcrypt.hashSync(payload.password, salt)
  try{
    await userDao.createUser(payload.id, hsahedPw, payload.email, payload.user_name, payload.nickname, payload.user_type);
    const userId = await userDao.getUser(payload.id);
    await userDao.createUserScore(userId.unique_id);
    await userDao.createCompany( userId.unique_id, company_name, introduction, Business_registration_number, contact_information, company_email);
  }catch(err){
    console.log(err);
  }
}


const loginUser = async (id, password) => {
  const user = await userDao.getUserIdPassword(id);

  if (!user) {
      const error = new Error("LOGIN_FAIL");
      error.statusCode = 400;
      throw error;
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);

  if (isPasswordCorrect === false) {
      const error = new Error("LOGIN_FAIL");
      error.statusCode = 400;
      throw error;
  } else if (isPasswordCorrect === true) {

  var token = jwt.sign({ userId: user.unique_id }, "server_made_secret_key", { expiresIn: "3h" });
      return { message: "LOGIN_SUCCESS", token: token };
  }
};

async function isUnique(id, email, nickname){
  const resultByID = await userDao.getUserById(id);
  const resultByEmail = await userDao.getUserByEmail(email);
  const resultByNickname = await userDao.getUserByNickname(nickname);

  if(resultByID){
    return { message: "USER_ID_DUPLICATE"}
  }
  if(resultByEmail){
    return { message: "USER_EMAIL_DUPLICATE"}
  }
  if(resultByNickname){
    return { message: "USER_NICKNAME_DUPLICATE"}
  }
}

const getUserByUniqueId = async (user_id)=>{
  const user = await userDao.getUserByUniqueId(user_id);

  if (!user) {
    const error = new Error("USER_UNDEFINED");
    error.statusCode = 400;
    throw error;
  }
  return user;
}

const userDoNotUse = async (user_id)=>{
  const user = await userDao.userHuman(user_id);
}

const changePassword = async (id, password, newPassword) => {
  const user = await userDao.getUserByUniqueId(id);
  if (!user) {
      const error = new Error("USER_UNDEFINED");
      error.statusCode = 400;
      throw error;
  }
  const isPasswordCorrect = bcrypt.compareSync(password, user.password);

  if (isPasswordCorrect === false) {
      const error = new Error("PASSWORD_MISSMATCH");
      error.statusCode = 400;
      throw error;
  } else if (isPasswordCorrect === true) {
    const isPasswordSame = bcrypt.compareSync(newPassword, user.password);
    if (isPasswordSame === true) {
      const error = new Error("CANNOT_USE_THE_SAME_PASSWORD");
      error.statusCode = 400;
      throw error;
    }else if (isPasswordSame === false){
      const salt = bcrypt.genSaltSync(12);
      const hsahedPw = bcrypt.hashSync(newPassword, salt)
      await userDao.updatePassword(id, hsahedPw);
    }
  }
};

module.exports = { 
  loginUser
  , createUser
  , createCompanyUser
  , getUserByUniqueId
  , userDoNotUse
  , changePassword
};

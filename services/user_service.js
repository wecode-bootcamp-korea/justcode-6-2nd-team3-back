const userDao = require("../models/user_dao");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginUser = async (account, password) => {
  const user = await userDao.getUserByEmail(account);

  if (!user) {
    const error = new Error("LOGIN_FAIL");
    error.statusCode = 400;
    throw error;
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.user_password);

  if (isPasswordCorrect === false) {
    const error = new Error("LOGIN_FAIL");
    error.statusCode = 400;
    throw error;
  } else if (isPasswordCorrect === true) {
    // token 생성
    var token = jwt.sign({ userId: user.id }, "server_made_secret_key", {
      expiresIn: "3h",
    });
    return { message: "LOGIN_SUCCESS", token: token };
  }
};

module.exports = { loginUser};

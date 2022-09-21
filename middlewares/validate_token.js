const userService = require("../services/user_service");
const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token){
      res.status(400).json({ message: "TOKEN_MUST_BE_PROVIDED" })
      return
    } 
    const { userId } = jwt.verify(token, "server_made_secret_key");
    const foundUser = await userService.getUserByUniqueId(userId);
    if (!foundUser) {
      res.status(404).json({ message: "USER_NOT_FOUND" })
      return
    }
    req.foundUser = foundUser;
    next();
  } catch(err) {
    console.log(err)
    res.status(400).json({ message: "TOKEN_EXPIRED" });
  }
};

module.exports = { validateToken };

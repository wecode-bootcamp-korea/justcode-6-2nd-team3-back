const userService = require("../services/user_service");


const loginUser = async (req, res) => {
    const { account, password } = req.body;

    const haskey = { account: false, password: false };
    const requireKey = Object.keys(haskey);

    Object.entries(req.body).forEach((keyValue) => {
        const [key, value] = keyValue;
        if (requireKey.includes(key) && value) {
        haskey[key] = true;
        }
    });
    const haskeyArray = Object.entries(haskey);
    for (let i = 0; i < haskeyArray.length; i++) {
        const [key, value] = haskeyArray[i];
        if (!value) {
        res.status(400).json({ message: `${key}이/가 없습니다` });
        return;
        }
    }

    try {
        const result = await userService.loginUser(account, password);
        res.status(201).json(result);
    } catch (err) {
        console.log(err);
        res.status(err.statusCode || 500).json({ message: err.message });
    }
};


module.exports = { loginUser };

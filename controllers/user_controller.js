const userService = require("../services/user_service");
const { validatorValues } = require("../middlewares/validator_value");

// 회원가입
const createUser = async (req, res) => {
    const {id, password, email, user_name, nickname, user_type} = req.body

    const haskey = {id:false, email:false, password:false, user_name:false, nickname:false, user_type:false};
    
    if(user_type == 1 ){
        let err = validatorValues(req.body, haskey, res);
        if(err) {
            return res.status(400).json({ message: err });
        }

        try{
            const result = await userService.createUser(id, password, email, user_name, nickname, user_type);
            return res.status(201).json({ message: "userCreated" })
        }catch(err){
            console.log(err)
            return res.status(err.statusCode || 500).json({ message: err.message });
        }

    }else if(user_type == 2){
        // 사업자등록증 이미지 첨부 필수 값으로 받지 않음 필요하면 수정하기
        const {company_name, introduction, Business_registration_number, contact_information, company_email} = req.body

        const haskey = {company_name:false, Business_registration_number:false, contact_information:false, company_email:false};

        let err = validatorValues(req.body, haskey, res);
        if(err) {
            return res.status(400).json({ message: err });
        }

        try{
            let image="";
            if(req.file){            
                image = "/"+req.file.filename;
            }
            const result = await userService.createCompanyUser(req.body, image);
            return res.status(201).json({ message: "user/companyCreated" })
        }catch(err){
            console.log(err)
            return res.status(err.statusCode || 500).json({ message: err.message });
        }
    }
}

// 로그인
const loginUser = async (req, res) => {
    const { id, password } = req.body;

    const haskey = { id: false, password: false };
    const requireKey = Object.keys(haskey);

    let err = validatorValues(req.body, haskey, res);
    if(err) {
        return res.status(400).json({ message: err });
    }

    try {
        const result = await userService.loginUser(id, password);
        return res.status(201).json(result);
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
};

// 회원 탈퇴
const userDoNotUse = async (req, res) => {
    const {unique_id} =  req.foundUser; 
    if(!unique_id){
        res.status(400).json({ message: `user id 이/가 없습니다` })
        return;
    }

    try{
        await userService.userDoNotUse(unique_id);
        return res.status(200).json({ message: "success_userDoNotUse" })
    }catch(err){
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
};

// 사용자 비밀번호 변경
const changePassword = async (req, res) => {
    const { unique_id } =  req.foundUser; 
    const { password, newPassword } = req.body;

    if(!unique_id){
        res.status(400).json({ message: `user id 이/가 없습니다` })
        return;
    }

    const haskey = { password: false, newPassword: false };

    let err = validatorValues(req.body, haskey, res);
    if(err) {
        return res.status(400).json({ message: err });
    }

    try {
        const result = await userService.changePassword(unique_id, password, newPassword);
        return res.status(200).json({ message: "success_changePassword" })
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
};

module.exports = { loginUser, createUser, userDoNotUse, changePassword};

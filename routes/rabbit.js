const express = require('express');
const {success, error} = require("../utils/response")
const router = express.Router();
const cors = require("../utils/cors")

// 在所有路由定义前添加
//router.use(cors)


router.get('/getUserInfo', function (req, res, next) {
    const token = req.headers["authorization"]
    if (token === "dkaj32j32ijr3ioj34i") {
        const userInfo = {
            "username": "管理员张牛",
            "introduction": "I am a super administrator",
            "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
            "roles": [
                "guest"
            ],
        }
        res.json(success(userInfo))
    } else {
        res.json(error(-1))
    }
});
router.post('/login', function (req, res, next) {
    let name = req.body["name"]
    let passwd = req.body["password"]
    const {body} = req;
    console.log(body)
    if (name === "zhangsan" && passwd === "1234") {
        res.json(success({
            "token": "dkaj32j32ijr3ioj34i"
        }))
    } else {
        res.json(error(-1))
    }
});
module.exports = router;

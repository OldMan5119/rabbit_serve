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
            "ret": 0,
            "msg": "success",
            "data": {
                "username": "管理员张牛",
                "avatar": "http://gips0.baidu.com/it/u=3602773692,1512483864&fm=3028&app=3028&f=JPEG&fmt=auto?w=960&h=1280",
            }
        }
        res.json(success(userInfo))
    } else {
        res.json(error())
    }
});
router.post('/login', function (req, res, next) {
    let name = req.body["name"]
    let passwd = req.body["password"]
    if (name === "zhangsan" && passwd === "1234") {
        res.json(success({
            "token": "dkaj32j32ijr3ioj34i"
        }))
    } else {
        res.json(error(-1))
    }
});
module.exports = router;

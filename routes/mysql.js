const express = require('express');
const {success, error} = require("../utils/response")
const sqlRouter = express.Router();
const cors = require("../utils/cors")
const mysql_db = require('mysql2/promise');

// 在所有路由定义前添加
// sqlRouter.use(cors)

// 数据库连接配置
const dbConfig = {
    host: '8.130.114.25',
    port: 3306,
    user: 'weiqin',  // 替换为你的数据库用户名
    password: 'Weiqin123!',  // 替换为你的数据库密码
    database: 'stock',  // 替换为你的数据库名
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// 创建数据库连接池
const pool = mysql_db.createPool(dbConfig);

// 核心接口：执行客户端传入的SQL语句
sqlRouter.post('/execute', async (req, res) => {
    const {sql} = req.body;
    // 验证输入
    if (!sql) {
        return res.status(400).json({
            success: false,
            error: 'SQL语句不能为空'
        });
    }

    console.info('执行SQL:', sql);

    try {
        // 执行SQL查询
        const [results] = await pool.execute(sql);

        // 返回成功结果
        res.json({
            success: true,
            data: results,
            message: 'SQL执行成功'
        });
    } catch (error) {
        // 返回详细的错误信息
        console.error('SQL执行错误:', error);
        res.json({
            success: false,
            error: error.message,
            code: error.code,
            errno: error.errno,
            sqlState: error.sqlState,
            sqlMessage: error.sqlMessage
        });
    }
});

sqlRouter.post('/test123', async (req, res) => {
    const {sql} = req.body;
    // 验证输入
    if (!sql) {
        return res.status(400).json({
            success: false,
            error: 'SQL语句不能为空'
        });
    }

    console.info('执行SQL:', sql);

    try {
        // 执行SQL查询
        const [results] = await pool.execute(sql);

        // 返回成功结果
        res.json({
            success: true,
            data: results,
            message: 'SQL执行成功'
        });
    } catch (error) {
        // 返回详细的错误信息
        console.error('SQL执行错误:', error);
        res.json({
            success: false,
            error: error.message,
            code: error.code,
            errno: error.errno,
            sqlState: error.sqlState,
            sqlMessage: error.sqlMessage
        });
    }
});

module.exports = sqlRouter;

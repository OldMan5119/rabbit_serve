// 在所有路由定义前添加（如 app.js 或路由文件开头）
module.exports = (req, res, next) => {
    // 设置允许的源（与前端一致）
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    // 允许的方法（包含 OPTIONS）
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    // 允许的头（根据前端实际请求头补充）
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-access-token');
    // 允许携带凭证（与前端 withCredentials 对应）
    res.header('Access-Control-Allow-Credentials', 'true');

    // 处理 OPTIONS 请求（直接返回 204 成功）
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
}

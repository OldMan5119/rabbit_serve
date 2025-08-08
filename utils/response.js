exports.success = (data, message = '请求成功') => ({
    ret: 0,
    msg: message,
    data
});

exports.error = (ret, message, data = {}) => ({
    ret,
    msg: message,
    data
});

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let https = require('https');
let fs = require('fs');


let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();

//<editor-fold desc="支持jade模版">
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
//</editor-fold>

app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//<editor-fold desc="支持https请求">

const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'localhost+4-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'localhost+4.pem'))
};
const httpsServer = https.createServer(httpsOptions, app);
const HTTPS_PORT = 3443; // 常用 HTTPS 开发端口（443 需要管理员权限）
httpsServer.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`❌ HTTPS 端口 ${HTTPS_PORT} 已被占用！`);
    } else {
        console.error('HTTPS 服务器错误:', error);
    }
    process.exit(1);
});
httpsServer.listen(HTTPS_PORT, () => {
    console.log(`HTTPS Server running at https://localhost:${HTTPS_PORT}/`);
});

//</editor-fold>

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

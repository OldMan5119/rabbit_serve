const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    let users = [
        {name: 'tobi', email: 'tobi@learnboost.com'},
        {name: 'loki', email: 'loki@learnboost.com'},
        {name: 'jane', email: 'jane@learnboost.com'}
    ];
    res.render('users', {
        users: users,
        title: "EJS example",
        header: "Some users"
    });
});

module.exports = router;

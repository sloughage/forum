var express = require('express'),
    router = express.Router(),
    User = require('../models/User'),
    bcrypt = require('bcryptjs');

router.get('/login', function (req, res) {
    res.redirect(req.header('Referer'));
});

router.post('/login', function (req, res) {
    User.findOne({username: req.body.username}, function (err, user) {
        if (user) {
            bcrypt.compare(
                req.body.password,
                user.password,
                function (err, match) {
                    if (match === true) {
                        req.session.username = user.username;
                        req.session.userId = user.id;
                        req.session.isLoggedIn = true;
                        res.redirect(req.header('Referer'));
                    } else {
                        // req.flash('info', "invalid login");
                        res.redirect(req.header('Referer'));
                    }
                }
            );
        } else {
            // req.flash('info', "invalid login");
            res.redirect(req.header('Referer'));
        }
    });
});

router.get('/register', function (req, res) {
    res.render('register', {
        isLoggedIn: req.session.isLoggedIn,
        title: "forum: register"
        // message: req.flash('info')
    });
});

router.post('/register', function (req, res, next) {
    User.findOne({username: req.body.username}, function (err, user) {
        if (user === null) {
            bcrypt.genSalt(10, function (err2, salt) {
                bcrypt.hash(req.body.password, salt, function (err3, hash) {
                    var newUser = {
                        username: req.body.username,
                        password: hash
                    };
                    User.create(newUser, function (err4, user) {
                        if (user) {
                            req.session.username = user.username;
                            req.session.userId = user.id;
                            req.session.isLoggedIn = true;
                            res.redirect('/');
                        } else {
                            // req.flash('info', "error");
                            res.send(err4);
                        }
                    });
                });
            });
        } else {
            // req.flash('info', "username taken");
            res.redirect(req.header('Referer'));
        }
    });
});

router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        // req.flash('info', "logged out");
        res.redirect(req.header('Referer'));
    });
});

router.get('/users', function (req, res) {
    User.find(function (err, users) {
        res.render('users', {
            isLoggedIn: req.session.isLoggedIn,
            title: "forum: users",
            // message: req.flash('info'),
            users: users
        });
    });
});

router.delete('/', function (req, res) {
    User.findById(req.body.id, function (err, user) {
        // req.flash('info', "deleted " + req.params.id);
        user.remove();
        res.send("user deleted");
    });
});

module.exports = router;
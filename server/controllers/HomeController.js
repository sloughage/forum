var express = require('express'),
    router = express.Router(),
    Thread = require('../models/Thread');
    Post = require('../models/Post');

router.get('/', function (req, res) {
    Thread.find(function(err, threads) {
        if (err) {
            res.send(err);
        } else {
            var sThreads = threads.sort(function (a, b) {
                return b.timestamp - a.timestamp;
            });
            res.render('home', {
                isLoggedIn: req.session.isLoggedIn,
                title: "forum",
                threads: sThreads
            });
        }
    });
});

router.get('/new', function (req, res) {
    res.render('new', {
        isLoggedIn: req.session.isLoggedIn,
        title: "forum: new thread",
    });
});

router.post('/new', function (req, res) {
    var newThread = {
        title: req.body.title,
        size: 1,
        timestamp: Date.now()
    }
    Thread.create(newThread, function (err, thread) {
        if (err) {
            // message: error
            res.send(err);
        } else {
            var newPost = {
                username: req.session.username,
                userId: req.session.userId,
                content: req.body.content,
                timestamp: thread.timestamp,
                threadId: thread.id
            }
            Post.create(newPost, function (err2, post) {
                if (err2) {
                    //message: error
                    res.send(err2);
                } else {
                    res.redirect('/');
                }
            });
        }
    });
});

module.exports = router;
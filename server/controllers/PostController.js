var express = require('express'),
    router = express.Router(),
    Post = require('../models/Post'),
    Thread = require('../models/Thread');

router.post('/:id', function (req, res) {
    var newPost = {
        username: req.session.username,
        userId: req.session.userId,
        timestamp: Date.now(),
        content: req.body.content,
        threadId: req.params.id
    }
    Post.create(newPost, function (err, post) {
        if (err) {
            res.send(err);
        } else {
            Thread.findById(req.params.id, function (err2, thread) {
                if (err2) {
                    res.send(err2);
                } else {
                    thread.size += 1;
                    thread.timestamp = post.timestamp;
                    thread.save(function (err3) {
                        if (err3) {
                            res.send(err3);
                        } else {
                            res.redirect('/');
                        }
                    });
                };
            });
        }
    });
});

router.patch('/', function (req, res) {
    Post.findById(req.body.id, function (err, post) {
        if (err) {
            res.send(err);
        } else {
            post.content = req.body.content;
            post.save();
            res.send("post updated");
        }
    });
});

router.delete('/', function (req, res) {
    Post.findById(req.body.id, function (err, post) {
        if (err) {
            res.send(err);
        } else {
            post.remove();
            res.send("post deleted");
        }
    });
});

module.exports = router;
const express = require('express')
const router = express.Router()
const Thread = require('../models/Thread')
const Post = require('../models/Post')

router.get('/', (req, res) => {
  Thread.find()
  .then(threads => {
    const sthreads = threads.sort((a, b) => b.timestamp - a.timestamp)
    const tmessage = req.session.message
    req.session.message = null
    res.render('home', {
      isLoggedIn: req.session.isLoggedIn,
      username: req.session.username,
      title: 'forum',
      threads: sthreads,
      message: tmessage
    })
  }).catch(err => {
    res.send(err)
  })
})

router.get('/new', (req, res) => {
  res.render('new', {
    isLoggedIn: req.session.isLoggedIn,
    username: req.session.username,
    title: 'forum: new thread'
  })
})

router.post('/new', (req, res) => {
  const ttimestamp = Date.now()
  Thread.create({
    title: req.body.title,
    size: 1,
    timestamp: ttimestamp
  }).then(thread => {
    return Post.create({
      username: req.session.username,
      userId: req.session.userId,
      content: req.body.content,
      timestamp: ttimestamp,
      threadId: thread.id
    })
  }).then(post => {
    res.redirect('/')
  }).catch(err => {
    res.send(err)
  })
})

module.exports = router

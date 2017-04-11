// move :id to .body

const express = require('express')
const router = express.Router()
const Thread = require('../models/Thread')
const Post = require('../models/Post')

router.get('/:id', (req, res) => {
  let tthread
  const ttimestamp = Date.now()
  Thread.findById(req.params.id)
  .then(thread => {
    tthread = thread
    return Post.find({threadId: req.params.id})
  }).then(posts => {
    let sposts = posts.sort((a, b) => a.timestamp - b.timestamp)
    sposts.forEach(post => {
      post.isUser = (post.userId === req.session.userId)
      const date = new Date(post.timestamp)
      if (ttimestamp - post.timestamp > 86400000) {
        post.time = date.toLocaleDateString()
      } else {
        post.time = date.toLocaleTimeString()
      }
    })
    res.render('thread', {
      isLoggedIn: req.session.isLoggedIn,
      username: req.session.username,
      title: 'forum: ' + tthread.title,
      threadtitle: tthread.title,
      threadId: req.params.id,
      posts: sposts
    })
  }).catch(err => {
    res.send(err)
  })
})

module.exports = router

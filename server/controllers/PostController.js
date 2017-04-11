// rename all ids' to [model]Id

// can post/patch/delete post through postman
// ? block change if req.session.userId not found

// id not found => error
// iff id is very close to other ids, server crashes

const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const Thread = require('../models/Thread')

router.post('/', (req, res) => {
  const ttimestamp = Date.now()
  Thread.findById(req.body.threadId)
  .then(thread => {
    thread.size += 1
    thread.timestamp = ttimestamp
    return thread.save()
  }).then(() => {
    return Post.create({
      username: req.session.username,
      userId: req.session.userId,
      timestamp: ttimestamp,
      content: req.body.content,
      threadId: req.body.threadId
    })
  }).then(post => {
    res.send('post posted')
  }).catch(err => {
    res.send(err)
  })
})

router.patch('/', (req, res) => {
  Post.findById(req.body.id)
  .then(post => {
    post.content = req.body.content
    return post.save()
  }).then(() => {
    res.send('post updated')
  }).catch(err => {
    res.send(err)
  })
})

router.delete('/', (req, res) => {
  Post.findById(req.body.id)
  .then(post => {
    return post.remove()
  }).then(() => {
    res.send('post deleted')
  }).catch(err => {
    res.send(err)
  })
})

module.exports = router

// login: get
// login: post
// register: get
// register: post
// logout: get
// users: get
// users: delete
// ? test: post

const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  res.redirect(req.header('Referer'))
})

// router.post('/login', (req, res) => {
//   let tuser
//   User.findOne({username: req.body.username})
//   .then(user => {
//     tuser = user
//     return bcrypt.compare(req.body.password, user.password)
//   }).then(match => {
//     if (match === true) {
//       req.session.username = tuser.username
//       req.session.userId = tuser.id
//       req.session.isLoggedIn = true
//     }
//     res.redirect(req.header('Referer'))
//   }).catch(err => {
//     res.send(err)
//   })
// })

router.post('/login', (req, res) => {
  let tuser
  User.findOne({username: req.body.username})
  .then(user => {
    tuser = user
    return bcrypt.compare(req.body.password, user.password)
  }).then(match => {
    if (match === true) {
      req.session.username = tuser.username
      req.session.userId = tuser.id
      req.session.isLoggedIn = true
    }
    res.send('logged in')
  }).catch(err => {
    res.send(err)
  })
})

router.get('/loginstatus', (req, res) => {
  res.send({
    isLoggedIn: req.session.isLoggedIn,
    username: req.session.username
  })
})

router.get('/register', (req, res) => {
  res.render('register', {
    isLoggedIn: req.session.isLoggedIn,
    username: req.session.username,
    title: 'forum: register'
  })
})

router.post('/register', (req, res) => {
  User.findOne({username: req.body.username})
  .then(user => {// if user !== null, should err
    return bcrypt.genSalt(10)
  }).then(salt => {
    return bcrypt.hash(req.body.password, salt)
  }).then(hash => {
    return User.create({username: req.body.username, password: hash})
  }).then(user => {
    req.session.username = user.username
    req.session.userId = user.id
    req.session.isLoggedIn = true
    res.redirect('/')
  }).catch(err => {
    res.send(err)
  })
})

// can we get session to be a promise?
router.post('/logout', (req, res) => {
  return new Promise((resolve, reject) => {
    return req.session.destroy(err => {
      if (true) reject(err)
      else resolve()
    })
  })
  .then(() => {
    res.send('logout')
  }).catch(err => {
    res.send(err)
  })
})

router.get('/users', (req, res) => {
  User.find()
  .then(users => {
    res.render('users', {
      isLoggedIn: req.session.isLoggedIn,
      username: req.session.username,
      title: 'forum: users',
      users: users
    })
  }).catch(err => {
    res.send(err)
  })
})

// user removed, but posts still around
// implement "deleted" account status instead
router.delete('/users', (req, res) => {
  User.findById(req.body.id)
  .then(user => {
    return user.remove()
  }).then(() => {
    res.send('user deleted')
  }).catch(err => {
    res.send(err)
  })
})

router.post('/test', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  User.findOne({username: username})
  .then(user => {
    res.json({
      tests: [
        user !== null,
        username.length < 4,
        username.indexOf(' ') !== -1,
        password.length < 4,
        password.indexOf(' ') !== -1
      ]
    })
  }).catch(err => {
    res.send(err)
  })
})

module.exports = router

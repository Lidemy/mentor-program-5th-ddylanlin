const bcrypt = require('bcryptjs')
const db = require('../models')

const saltRounds = 10
const { User } = db

const userController = {

  login: (req, res) => {
    // const url = window.location.href
    const page = {
      current: 'Login',
      switch: 'Register',
      formAction: '/login',
      href: '/register'
    }
    res.render('admin/login', {
      page
    })
  },

  handleLogin: (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
      req.flash('errorMessage', '該填的沒填')
      return next()
    }

    User.findOne({
      where: {
        username
      }
    }).then((user) => {
      if (!user) {
        req.flash('errorMessage', '使用者不存在')
        return next()
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
          req.flash('errorMessage', '密碼錯誤')
          return next()
        }
        req.session.username = user.username
        req.session.role = user.role
        res.redirect('/manage-menu')
      })
    }).catch((err) => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  },

  register: (req, res) => {
    const page = {
      current: 'Register',
      switch: 'Login',
      formAction: '/register',
      href: '/login'
    }
    res.render('admin/login', { page })
  },

  handleRegister: (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
      req.flash('errorMessage', '缺少必要欄位')
      return next()
    }

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        req.flash('errorMessage', err.toString())
        return next()
      }

      User.create({
        username,
        password: hash
      }).then((user) => {
        req.session.username = username
        req.session.role = user.role
        res.redirect('/')
      }).catch((err) => {
        req.flash('errorMessage', err.toString())
        return next()
      })
    })
  },

  logout: (req, res) => {
    req.session.destroy()
    res.redirect('/')
  }

}

module.exports = userController

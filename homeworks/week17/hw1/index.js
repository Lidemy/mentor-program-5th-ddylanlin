const express = require('express')
const bodyParser = require('body-parser')// eslint-disable-next-line
const session = require('express-session') 
const flash = require('connect-flash') // eslint-disable-next-line
const moment = require('moment')

const app = express()
const port = process.env.PORT || 5001

const userController = require('./controllers/user')
const articleController = require('./controllers/article')

app.use(express.static('views'))
app.set('view engine', 'ejs')
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(flash())

app.use((req, res, next) => {
  res.locals.moment = moment
  res.locals.username = req.session.username
  res.locals.role = req.session.role
  res.locals.returnTo = req.session.returnTo
  res.locals.errorMessage = req.flash('errorMessage')
  next()
})

function redirectBack(req, res) {
  res.redirect('back')
}

app.get('/login', userController.login)
app.post('/login', userController.handleLogin, redirectBack)
app.get('/logout', userController.logout)
app.get('/register', userController.register)
app.post('/register', userController.handleRegister, redirectBack)

app.get('/', articleController.index)
app.get('/page', articleController.page)
app.get('/article/:id', articleController.view)
app.get('/create', articleController.create)
app.post('/create', articleController.handleCreate, redirectBack)
app.get('/delete/:id', articleController.delete)
app.get('/update/:id', articleController.update)
app.post('/update/:id', articleController.handleUpdate, redirectBack)
app.get('/admin', articleController.admin)
app.post('/admin', articleController.handleSwitchAdmin, redirectBack)
app.get('/recover/:id', articleController.handleRecover, redirectBack)

app.listen(port, () => {
  console.log(`♫.(◕∠◕).♫ http://localhost:${port}  ♫.(◕∠◕).♫`)
})

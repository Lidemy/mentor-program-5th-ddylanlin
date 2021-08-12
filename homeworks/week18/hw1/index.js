const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')

const app = express()
const port = process.env.PORT || 5001

const userController = require('./controllers/user')
const lotteryController = require('./controllers/lottery')
const faqController = require('./controllers/faq')
const menuController = require('./controllers/menu')

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(flash())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use((req, res, next) => {
  res.locals.username = req.session.username
  res.locals.role = req.session.role
  res.locals.errorMessage = req.flash('errorMessage')
  next()
})

function redirectBack(req, res) {
  res.redirect('back')
}

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/login', userController.login)
app.post('/login', userController.handleLogin, redirectBack)
app.get('/register', userController.register)
app.post('/register', userController.handleRegister, redirectBack)
app.get('/logout', userController.logout)

app.get('/lottery', lotteryController.index)
app.get('/manage-lottery', lotteryController.manage)
app.get('/lottery-add', lotteryController.add)

app.get('/faq', faqController.index)
app.get('/manage-faq', faqController.manage)
app.get('/faq-add', faqController.add)

app.get('/menu', menuController.index)
app.get('/manage-menu', menuController.manage)
app.get('/menu-add', menuController.add)

// app.get('/page', articleController.page)
// app.get('/article/:id', articleController.view)
// app.get('/create', articleController.create)
// app.post('/create', articleController.handleCreate, redirectBack)
// app.get('/delete/:id', articleController.delete)
// app.get('/update/:id', articleController.update)
// app.post('/update/:id', articleController.handleUpdate, redirectBack)
// app.get('/admin', articleController.admin)
// app.post('/admin', articleController.handleSwitchAdmin, redirectBack)
// app.get('/recover/:id', articleController.handleRecover, redirectBack)

app.listen(port, () => {
  console.log(`♫.(◕∠◕).♫ http://localhost:${port}  ♫.(◕∠◕).♫`)
})

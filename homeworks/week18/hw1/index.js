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
app.post('/lottery-add', lotteryController.handleAdd)
app.get('/update/lottery/:id', lotteryController.update)
app.post('/update/lottery/:id', lotteryController.handleUpdate)
app.get('/delete/lottery/:id', lotteryController.delete)
app.get('/lottery/api', lotteryController.lottery)

app.get('/faq', faqController.index)
app.get('/manage-faq', faqController.manage)
app.get('/faq-add', faqController.add)
app.post('/faq-add', faqController.handleAdd)
app.get('/update/faq/:id', faqController.update)
app.post('/update/faq/:id', faqController.handleUpdate)
app.get('/delete/faq/:id', faqController.delete)

app.get('/menu', menuController.index)
app.get('/manage-menu', menuController.manage)
app.get('/menu-add', menuController.add)
app.post('/menu-add', menuController.handleAdd)
app.get('/update/menu/:id', menuController.update)
app.post('/update/menu/:id', menuController.handleUpdate)
app.get('/delete/menu/:id', menuController.delete)

app.listen(port, () => {
  console.log(`♫.(◕∠◕).♫ http://localhost:${port}  ♫.(◕∠◕).♫`)
})
